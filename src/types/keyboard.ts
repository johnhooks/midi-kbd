import { UpperKeyboardNoteOrder, LowerKeyboardNoteOrder, KeyCodes } from "../keyboard/constants";

import { MidiNote } from "./midi.js";
import { ValueOf } from "./utils.js";

/**
 * Union of all keyboard event codes handled by the keyboard controller.
 *
 * `All` to be used for initial keyboard observable value, {code: 'All', type: 'down'}
 * @public
 */
export type KeyCode = ValueOf<typeof KeyCodes> | "All";

/**
 * Union of all keyboard event codes that trigger a note on/off event.
 *
 * TODO - figure out if this is necessary with the above type. The keyboard needs to recognize all the keys for animations, but the MIDI controller, only recognizes these types
 *
 * @public
 */
export type KeyboardCode =
	| typeof UpperKeyboardNoteOrder[number]
	| typeof LowerKeyboardNoteOrder[number];

/**
 * An interpreted keyboard event object.
 *
 * @public
 */
export type KeyEvent = {
	code: KeyCode;
	type: "up" | "down";
};

/**
 * An interpreted keyboard event object.
 *
 * @public
 */
export type KeyboardEvent = {
	code: KeyboardCode;
	type: "up" | "down";
};

/**
 * An object type to associate a {@link KeyboardCode } with a {@link MidiNote}.
 *
 * @public
 */
export type KeyboardMidiMap = { key: KeyboardCode } & MidiNote;

/**
 * A map type to index a {@link KeyboardMidiMap} by its {@link KeyboardCode}.
 *
 * @public
 */
export type KeyboardMidiIndex = Map<string, KeyboardMidiMap>;

/**
 * SVG position.
 *
 * @public
 */
export type Point = {
	x: number;
	y: number;
};

/**
 * Keyboard key SVG position.
 *
 * @public
 */
export type KeyPos = Point & {
	width: number;
};
