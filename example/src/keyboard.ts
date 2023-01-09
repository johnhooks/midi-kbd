import {
	calcKeyPos,
	filterKeyboardEvents,
	KeyCode,
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

		const playButton = document.querySelector("#play-icon");

		if (playButton) {
			const handleClick: EventListenerOrEventListenerObject = async (e) => {
				if (this.#initialized) return;
				this.#initialized = true;

				e.preventDefault();
				await Tone.start();
				const synth = new Tone.Synth().toDestination();

				synth.triggerAttackRelease("C4", "4n");

				keyEvents.subscribe((event) => {
					const el = this.#refs.get(event.code as typeof KeyCodes[number]);
					if (!el) return;
					if (event.type === "on") {
						el.classList.add("pressed");
					} else if (event.type === "off") {
						el.classList.remove("pressed");
					}
				});

				keyEvents
					.pipe(filterKeyboardEvents())
					.pipe(mapToMidiEvent())
					.subscribe((event) => {
						// const now = Tone.now();
						// if (event.type === "off") {
						// 	synth.triggerRelease(now);
						// } else if (event.type === "on") {
						// 	synth.triggerAttack(event.note, now);
						// }
					});
				console.log("audio is ready");
			};

			playButton.addEventListener("click", handleClick);
		}
	}
}
