import {
	calcKeyPos,
	filterKeyboardEvents,
	KeyCodes,
	keyEvents,
	mapToMidiEvent,
	LowerKeyboardNoteOrder,
	UpperKeyboardNoteOrder,
} from "midi-kbd";
import * as Tone from "tone";

type KeyboardCtorParams = {
	size?: number;
	spacing?: number;
};

const SemitoneOrder = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];

export class Keyboard {
	#size = 32;
	#spacing = 8;
	#initialized = false;

	#refs: Map<typeof KeyCodes[number], SVGRectElement> = new Map();

	readonly el: SVGElement;

	constructor(params?: KeyboardCtorParams) {
		if (params?.size) this.#size = params.size;
		if (params?.spacing) this.#spacing = params.spacing;

		this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el.setAttributeNS(null, "version", "1.1");
		this.el.setAttributeNS(null, "viewBox", "0 0 580 200");

		const keyPositions = calcKeyPos(this.#size, this.#spacing, { x: 5, y: 5 });

		for (let i = 0; i < keyPositions.length; i++) {
			const keyPos = keyPositions[i];
			const keyCode = KeyCodes[i];
			const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");

			el.setAttributeNS(null, "x", String(keyPos.x));
			el.setAttributeNS(null, "y", String(keyPos.y));
			el.setAttributeNS(null, "width", String(keyPos.width));
			el.setAttributeNS(null, "height", String(this.#size));

			el.setAttributeNS(null, "rx", "5");
			el.setAttributeNS(null, "ry", "5");

			el.classList.add("key");

			this.#refs.set(keyCode, el);
			this.el.appendChild(el);
		}

		for (let i = 0; i < UpperKeyboardNoteOrder.length; i++) {
			const keyCode = UpperKeyboardNoteOrder[i];
			const natural = SemitoneOrder[i % 12] === 1;
			const el = this.#refs.get(keyCode);
			if (!el) continue;
			if (natural) {
				el.classList.add("natural");
			} else {
				el.classList.add("accidental");
			}
		}

		for (let i = 0; i < LowerKeyboardNoteOrder.length; i++) {
			const keyCode = LowerKeyboardNoteOrder[i];
			const natural = SemitoneOrder[i % 12] === 1;
			const el = this.#refs.get(keyCode);
			if (!el) continue;
			if (natural) {
				el.classList.add("natural");
			} else {
				el.classList.add("accidental");
			}
		}

		const osc = new Tone.FatOscillator("Ab3", "sawtooth", 40).start();

		const envelope = new Tone.AmplitudeEnvelope({
			attack: 0.1,
			decay: 0.1,
			sustain: 0.1,
			release: 0.5,
		});

		const lfo = new Tone.LFO({ frequency: "4m", min: 400, max: 4000, amplitude: 0.7 }).start();

		const filter = new Tone.Filter(2000, "lowpass");

		lfo.connect(filter.frequency);
		osc.connect(envelope);
		envelope.connect(filter);

		const playButton = document.querySelector("#play-icon");
		const stopButton = document.querySelector("#stop-icon");

		if (playButton) {
			const handleClick: EventListenerOrEventListenerObject = async (e) => {
				if (!this.#initialized) {
					await Tone.start();
					filter.toDestination();
					this.#initialized = true;
				}

				e.preventDefault();

				playButton.classList.add("hidden");
				stopButton?.classList.remove("hidden");

				Tone.getDestination().mute = false;

				keyEvents.subscribe((event) => {
					const el = this.#refs.get(event.code as typeof KeyCodes[number]);
					if (!el) return;
					if (event.type === "on") {
						el.classList.add("pressed");
					} else if (event.type === "off") {
						el.classList.remove("pressed");
					}
				});

				let notes: number[] = [];

				// initially empty. don't know if that will work.
				const pattern = new Tone.Pattern<number>({
					interval: "120i",
					values: notes,
					pattern: "upDown",
					callback: (time, note) => {
						if (!note) return;
						osc.frequency.value = note;
						envelope.triggerAttackRelease("8n.", time);
					},
				});

				Tone.Transport.start();

				keyEvents
					.pipe(filterKeyboardEvents())
					.pipe(mapToMidiEvent(6))
					.subscribe((event) => {
						if (event.type === "off") {
							// This doesn't account for multiple keys presses of the same note.
							// Need to actually differentiate keys.
							notes = notes.filter((note) => note !== event.midi);
							if (notes.length === 0) pattern.stop(0);
							pattern.values = notes;
						} else if (event.type === "on") {
							notes.push(event.midi);
							pattern.values = notes;
							pattern.start("1i");
						}
					});

				console.log("audio is ready");
			};

			playButton.addEventListener("click", handleClick);
		}

		if (stopButton) {
			const handleClick: EventListenerOrEventListenerObject = async (e) => {
				e.preventDefault();
				Tone.getDestination().mute = true;
				playButton?.classList.remove("hidden");
				stopButton?.classList.add("hidden");
			};

			stopButton.addEventListener("click", handleClick);
		}
	}
}
