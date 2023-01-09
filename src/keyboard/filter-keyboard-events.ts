import { Observable } from "rxjs";

import type { KeyEvent, KeyboardEvent, KeyboardCode } from "../types/index.js";

import { KeyboardNoteCodes } from "./constants.js";

/**
 * @internal
 */
export function filterKeyboardEvents() {
	return function (source: Observable<KeyEvent>): Observable<KeyboardEvent> {
		return new Observable((subscriber) => {
			source.subscribe({
				next(value) {
					if (isKeyboardEvent(value)) {
						subscriber.next(value);
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
