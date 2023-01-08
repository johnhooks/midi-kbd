import { UpperKeyboardOrder, LowerKeyboardOrder } from "../keyboard/constants";

import { MidiNote } from "./midi.js";

/**
 * Union of all keyboard event codes handled by the keyboard controller.
 *
 * @public
 */
export type KeyCode = typeof UpperKeyboardOrder[number] | typeof LowerKeyboardOrder[number];

/**
 * An object type to associate a {@link KeyCode } with a {@link MidiNote}.
 *
 * @public.
 */
export type KeyboardMidiMap = { key: KeyCode } & MidiNote;

/**
 * A map type to index a {@link KeyboardMidiMap} by its {@link KeyCode}.
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
