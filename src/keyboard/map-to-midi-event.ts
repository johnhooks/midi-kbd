import { Observable } from "rxjs";

import type { KeyboardEvent, MidiEvent, Octave } from "../types/index.js";

import { genKeyboardMidiIndex } from "./helpers.js";

/**
 * @public
 */
export function mapToMidiEvent(octave: Octave = 4) {
	const keyboardIndex = genKeyboardMidiIndex(octave);

	return function (source: Observable<KeyboardEvent>): Observable<MidiEvent> {
		return new Observable((subscriber) => {
			source.subscribe({
				next({ type, code }) {
					const keyMap = keyboardIndex.get(code);
					if (keyMap) {
						subscriber.next({ ...keyMap, type });
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
