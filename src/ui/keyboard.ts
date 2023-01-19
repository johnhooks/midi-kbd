import { KeyCodes, LowerKeyboardNoteOrder, UpperKeyboardNoteOrder } from "../keyboard/index.js";
import { SemitoneOrder } from "../music/index.js";

import { calcKeyPos } from "./calc-key-pos.js";

/**
 * Visual keyboard layout web component.
 *
 * Responds to touch and mouse events. Touch/clicking on a key fires a synthetic key event.
 *
 * There is a bug of releasing outside the element keeps it pressed. It actually
 * creates a hold effect, which isn't a dumb idea, but you should consider the
 * consequences.
 * @public
 */
export class Keyboard extends HTMLElement {
	private _gap = 8;
	private _size = 32;

	// UI Elements
	private _keys: Map<typeof KeyCodes[number], SVGRectElement> = new Map();
	private _renderRoot: ShadowRoot;

	constructor() {
		super();

		this._renderRoot = this.attachShadow({ mode: "open" });
		this._render();

		window.addEventListener("keydown", this._handleKeyDown);
		window.addEventListener("keyup", this._handleKeyUp);
	}

	private _handleSyntheticDown = (e: MouseEvent | TouchEvent) => {
		const keyEl = e.target as SVGRectElement;
		const keyCode = keyEl.dataset.key;
		if (!keyCode) return;
		window.dispatchEvent(new KeyboardEvent("keydown", { code: keyCode }));
		keyEl.classList.add("down");
	};

	private _handleSyntheticUp = (e: MouseEvent | TouchEvent) => {
		const keyEl = e.target as SVGRectElement;
		const keyCode = keyEl.dataset.key;
		if (!keyCode) return;
		window.dispatchEvent(new KeyboardEvent("keyup", { code: keyCode }));
		keyEl.classList.remove("down");
	};

	private _handleKeyDown = (e: KeyboardEvent) => {
		const keyEl = this._keys.get(e.code as typeof KeyCodes[number]);
		if (keyEl) keyEl.classList.add("down");
	};

	private _handleKeyUp = (e: KeyboardEvent) => {
		const keyEl = this._keys.get(e.code as typeof KeyCodes[number]);
		if (keyEl) keyEl.classList.remove("down");
	};

	private _render() {
		const isTouchDevice = "ontouchstart" in document.documentElement;

		const style = document.createElement("style");

		style.textContent = /* css */ `
      rect.key {
        stroke: var(--medium-gray);
        fill: var(--secondary-fg-color);
        stroke-width: 1px;

        transition-property: transform, fill;
        transition-duration: .2s;
      }

      rect.key.natural {
        fill: var(--white);
      }

      rect.key.accidental {
        fill: var(--black);
      }

      rect.key.down {
        fill: var(--primary);
        transform: translateY(3px);
      }
    `;

		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttributeNS(null, "version", "1.1");
		svg.setAttributeNS(null, "viewBox", "0 0 580 200");

		const keyPositions = calcKeyPos(this._size, this._gap, { x: 5, y: 5 });

		for (let i = 0; i < keyPositions.length; i++) {
			const keyPos = keyPositions[i];
			const keyCode = KeyCodes[i];
			const keyEl = document.createElementNS("http://www.w3.org/2000/svg", "rect");

			keyEl.setAttributeNS(null, "x", String(keyPos.x));
			keyEl.setAttributeNS(null, "y", String(keyPos.y));
			keyEl.setAttributeNS(null, "width", String(keyPos.width));
			keyEl.setAttributeNS(null, "height", String(this._size));

			keyEl.setAttributeNS(null, "rx", "5");
			keyEl.setAttributeNS(null, "ry", "5");

			/**
			 * Adding a data attribute with the key code simplifies firing synthetic key
			 * events from the mouse/touch events.
			 */
			keyEl.setAttributeNS(null, "data-key", keyCode);
			keyEl.classList.add("key");

			if (isTouchDevice) {
				keyEl.addEventListener("touchstart", (e) => this._handleSyntheticDown(e));
				keyEl.addEventListener("touchend", (e) => this._handleSyntheticUp(e));
			} else {
				keyEl.addEventListener("mousedown", (e) => this._handleSyntheticDown(e));
				keyEl.addEventListener("mouseup", (e) => this._handleSyntheticUp(e));
				keyEl.addEventListener("mouseout", (e) => this._handleSyntheticUp(e));
			}

			this._keys.set(keyCode, keyEl);
			svg.appendChild(keyEl);
		}

		[UpperKeyboardNoteOrder, LowerKeyboardNoteOrder].forEach((order) => {
			for (let i = 0; i < order.length; i++) {
				const keyCode = order[i];
				const natural = SemitoneOrder[i % 12] === 1;
				const el = this._keys.get(keyCode);
				if (!el) continue;
				if (natural) {
					el.classList.add("natural");
				} else {
					el.classList.add("accidental");
				}
			}
		});

		this._renderRoot.appendChild(style);
		this._renderRoot.appendChild(svg);
	}

	disconnectedCallback() {
		window.removeEventListener("keydown", this._handleKeyDown);
		window.removeEventListener("keyup", this._handleKeyUp);
	}
}
