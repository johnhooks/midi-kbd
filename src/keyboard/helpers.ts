import type {
	KeyboardCode,
	KeyboardMidiIndex,
	KeyboardMidiMap,
	MidiNote,
	Octave,
} from "../types/index.js";

import { Notes, UpperKeyboardNoteOrder, LowerKeyboardNoteOrder } from "./constants";

const MidiNotes = genMidiNotes();

// type Note = typeof Notes[number]

/**
 * Generate an array of MIDI note values for 8 octaves.
 *
 * @internal
 */
export function genMidiNotes(): MidiNote[] {
	// Reference: https://newt.phys.unsw.edu.au/jw/notes.html
	const list: MidiNote[] = [];
	for (let octave = 0; octave < 9; octave++) {
		for (const [index, note] of Notes.entries()) {
			list.push({ note: `${note}${octave}`, midi: octave * 12 + 12 + index });
		}
	}
	return list;
}

/**
 * Generate a range of MIDI note values.
 *
 * @internal
 */
export function getMidiRange(startNote: string, length: number): MidiNote[] {
	const startIndex = MidiNotes.findIndex((value) => value.note === startNote);
	if (startIndex === -1) {
		throw new RangeError(`out of range MIDI note: ${startNote}`);
	}
	if (startIndex + length > MidiNotes.length) {
		const maxValue = MidiNotes.length - startIndex;
		throw new RangeError(`out of range slice length: ${length}, max possible value: ${maxValue} `);
	}
	return MidiNotes.slice(startIndex, startIndex + length);
}

/**
 * Generate a map of keyboard event codes mapped to note and MIDI values.
 *
 * Includes an upper and lower range spanning four rows of a computer keyboard.
 * @internal
 */
export function genKeyboardMidiIndex(
	upperOctave: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
): KeyboardMidiIndex {
	const lowerOctave = upperOctave - 1;
	const upper = genKeyboardMidiMap(upperOctave as Octave, UpperKeyboardNoteOrder);
	const lower = genKeyboardMidiMap(lowerOctave as Octave, LowerKeyboardNoteOrder);
	const map: KeyboardMidiIndex = new Map();
	for (const { key, ...rest } of [...upper, ...lower]) {
		map.set(key, { key, ...rest });
	}
	return map;
}

/**
 * Generate a set of objects connecting MIDI note values to keyboard event codes.
 *
 * @internal
 */
function genKeyboardMidiMap(octave: Octave, keys: readonly KeyboardCode[]): KeyboardMidiMap[] {
	const range = getMidiRange(`C${octave}`, keys.length);
	const result: KeyboardMidiMap[] = [];
	for (const [index, midi] of range.entries()) {
		const key = keys[index];
		result.push({ key, ...midi });
	}
	return result;
}
