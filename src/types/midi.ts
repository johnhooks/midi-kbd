import type { ValueOf } from "./utils.js";

/**
 * Status byte values that indicate the different MIDI notes.
 *
 * @internal
 */
export const StatusByte = {
	NoteOff: 0x8,
	NoteOn: 0x9,
	AfterTouch: 0xa,
	CC: 0xb,
	ProgramChange: 0xc,
	ChannelPressure: 0xd,
	PitchBend: 0xe,
} as const;

/**
 * CC values that indicate special CC Modes.
 *
 * @internal
 */
export const CCModeValues = {
	AllSoundOff: 120,
	ResetAll: 121,
	LocalController: 122,
	AllNotesOff: 123,
	OmniOff: 124,
	OmniOn: 125,
	MonoOn: 126,
	PloyOn: 127,
} as const;

/**
 * MIDI status code type.
 *
 * @internal
 */
export type MidiStatus = ValueOf<typeof StatusByte>;

/**
 * Octave range type.
 *
 * Zero based index
 * @public
 */
export type Octave = 0 | 1 | 2 | 4 | 5 | 6 | 7 | 8;

/**
 * MIDI channel type.
 *
 * Zero based index
 * @public
 */
export type Channel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

/**
 * @internal
 */
export type MidiNoteStatus = typeof StatusByte.NoteOn | typeof StatusByte.NoteOff;

/**
 * An object type to associate a midi note value with a musical note.
 *
 * @public
 */
export type MidiNote = { midi: number; note: string };

/**
 * MIDI port interface.
 *
 * Intended to a direct interface to instrument or controller, as opposed to casting
 * the values to JSON like message.
 * @public
 */
export type MidiPortInterface<TValue> = {
	/**
	 * MIDI note on event handler.
	 */
	noteOn(channel: Channel, note: number, velocity: number): TValue;

	/**
	 * MIDI note off event handler.
	 */
	noteOff(channel: Channel, note: number, velocity?: number): TValue;

	/**
	 * Polyphonic after touch event handler.
	 */
	polyphonicAfterTouch(channel: Channel, note: number, value: number): TValue;

	/**
	 * Control change event handler.
	 */
	controlChange(channel: Channel, controller: number, value: number): TValue;

	/**
	 * Program change event handler.
	 */
	programChange(channel: Channel, patchIndex: number): TValue;

	/**
	 * Channel pressure event handler.
	 *
	 * The single greatest pressure value (of all the current depressed keys).
	 */
	channelPressure(channel: Channel, value: number): TValue;

	/**
	 * Pitch bend event handler.
	 *
	 * The pitch bender is measured by a fourteen bit value. Center (no pitch change) is 2000H. Sensitivity is a function of the receiver, but may be set using RPN 0. (lllllll) are the least significant 7 bits. (mmmmmmm) are the most significant 7 bits.
	 */
	pitchBend(channel: Channel, value: number): TValue;

	// Channel Modes. TODO add the rest.

	/**
	 * All sounds off event handler.
	 */
	allSoundOff(channel: Channel): TValue;

	/**
	 * All notes off event handler.
	 */
	allNotesOff(channel: Channel): TValue;
};

/**
 * MIDI input port interface.
 *
 * @public
 */
export type MidiReceiver = MidiPortInterface<void>;
