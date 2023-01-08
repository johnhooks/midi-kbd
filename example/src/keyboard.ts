import { calcKeyPos, MidiKeyboard } from "midi-kbd";

type KeyboardCtorParams = {
	size?: number;
	spacing?: number;
};

export class Keyboard {
	#size = 32;
	#spacing = 8;

	readonly el: SVGElement;

	constructor(params?: KeyboardCtorParams) {
		if (params?.size) this.#size = params.size;
		if (params?.spacing) this.#spacing = params.spacing;

		this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.el.setAttributeNS(null, "version", "1.1");
		this.el.setAttributeNS(null, "viewBox", "0 0 580 200");

		const keyPositions = calcKeyPos(this.#size, this.#spacing, { x: 5, y: 5 });

		for (const { x, y, width } of keyPositions) {
			const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			el.setAttributeNS(null, "x", String(x));
			el.setAttributeNS(null, "y", String(y));
			el.setAttributeNS(null, "width", String(width));
			el.setAttributeNS(null, "height", String(this.#size));

			el.setAttributeNS(null, "rx", "5");
			el.setAttributeNS(null, "ry", "5");

			el.classList.add("key");

			this.el.appendChild(el);
		}
	}
}
