import { Observable } from "rxjs";

import type { KeyEvent, KeyboardEvent, KeyboardCode } from "../types/index.js";

import { KeyboardNoteCodes } from "./constants.js";

/**
 * @public
 */
export function filterKeyboardEvents() {
	const down = new Map<string, boolean>();

	return function (source: Observable<KeyEvent>): Observable<KeyboardEvent> {
		return new Observable((subscriber) => {
			source.subscribe({
				next(event) {
					if (isKeyboardEvent(event)) {
						if (event.type === "on") {
							if (down.get(event.code)) {
								// key already depressed
								return;
							} else {
								down.set(event.code, true);
								subscriber.next(event);
							}
						} else if (event.type === "off") {
							down.set(event.code, false);
							subscriber.next(event);
						}
					}
				},
				error(error) {
					subscriber.error(error);
				},
				complete() {
					subscriber.complete();
				},
			});
		});
	};
}

function isKeyboardEvent(event: KeyEvent): event is KeyboardEvent {
	return KeyboardNoteCodes.has(event.code as KeyboardCode);
}
