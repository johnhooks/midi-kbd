import { Observable } from "rxjs";

import type { KeyCode, KeyEvent } from "../types/index.js";

import { KeyCodes } from "./constants.js";

/**
 * @internal
 */
export const keyEvents = new Observable<KeyEvent>((subscriber) => {
	function handleKeyEvent(event: KeyboardEvent) {
		if (event.defaultPrevented) {
			return; // Do nothing if event already handled
		}

		const code = event.code;

		if (!isKeyCode(code)) {
			return; // Only emit events handled by `midi-kbd`.
		}

		if (event.type === "keydown") {
			subscriber.next({ code, type: "down" });
		} else if (event.type === "keyup") {
			subscriber.next({ code, type: "up" });
		}
	}

	try {
		window.addEventListener("keydown", handleKeyEvent);
		window.addEventListener("keyup", handleKeyEvent);
	} catch (error) {
		subscriber.error(error);
	}

	return function unsubscribe() {
		window.removeEventListener("keydown", handleKeyEvent);
		window.removeEventListener("keyup", handleKeyEvent);
	};
});

function isKeyCode(code: unknown): code is KeyCode {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return KeyCodes.includes(code as KeyCode);
}
