/**
 * Set of musical notes arranged in order, starting with C.
 *
 * Using flat to represent occidentals because `b` is a valid JavaScript identifier
 * character and `#` is not.
 * @internal
 */
export const Notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] as const;

/**
 * The range of keys used for the upper keyboard.
 *
 * @public
 */
export const UpperKeyboardNoteOrder = [
	// C0
	"KeyQ",
	// Db0
	"Digit2",
	// D0
	"KeyW",
	// Eb0
	"Digit3",
	// E0
	"KeyE",
	// F0
	"KeyR",
	// Gb0
	"Digit5",
	// G0
	"KeyT",
	// Ab0
	"Digit6",
	// A0
	"KeyY",
	// Bb0
	"Digit7",
	// B0
	"KeyU",
	// C1
	"KeyI",
	// Db
	"Digit9",
	// D
	"KeyO",
	//Eb
	"Digit0",
	// E
	"KeyP",
	// F
	"BracketLeft",
	// Gb
	"Equal",
	// G
	"BracketRight",
] as const;

/**
 * The range of keys used for the lower keyboard.
 *
 * @public
 */
export const LowerKeyboardNoteOrder = [
	// C0
	"KeyZ",
	// Db0
	"KeyS",
	// D0
	"KeyX",
	// Eb0
	"KeyD",
	// E0
	"KeyC",
	// F0
	"KeyV",
	// Gb0
	"KeyG",
	// G0
	"KeyB",
	// Ab0
	"KeyH",
	// A0
	"KeyN",
	// Bb0
	"KeyJ",
	// B0
	"KeyM",
	// C1
	"Comma",
	// Db
	"KeyL",
	// D
	"Period",
	//Eb
	"Semicolon",
	// E
	"Slash",
] as const;

export const KeyboardNoteCodes = new Set([...UpperKeyboardNoteOrder, ...LowerKeyboardNoteOrder]);

const KeyboardRowOne = [
	"Backquote",
	"Digit1",
	"Digit2",
	"Digit3",
	"Digit4",
	"Digit5",
	"Digit6",
	"Digit7",
	"Digit8",
	"Digit9",
	"Digit0",
	// TODO make sure Minus and Equal are right.
	"Minus",
	"Equal",
	"Backspace",
] as const;

const KeyboardRowTwo = [
	"Tab",
	"KeyQ",
	"KeyW",
	"KeyE",
	"KeyR",
	"KeyT",
	"KeyY",
	"KeyU",
	"KeyI",
	"KeyO",
	"KeyP",
	"BracketLeft",
	"BracketRight",
	"Backslash",
] as const;

const KeyboardRowThree = [
	"CapLock",
	"KeyA",
	"KeyS",
	"KeyD",
	"KeyF",
	"KeyG",
	"KeyH",
	"KeyJ",
	"KeyK",
	"KeyL",
	"Semicolon",
	// TODO make sure Quote is right
	"Quote",
	"Enter",
] as const;

const KeyboardRowFour = [
	"ShiftLeft",
	"KeyZ",
	"KeyX",
	"KeyC",
	"KeyV",
	"KeyB",
	"KeyN",
	"KeyM",
	"Comma",
	"Period",
	"Slash",
	"ShiftRight",
] as const;

const KeyboardRowFive = ["Space"] as const;

/**
 * A matrix of keyboard event codes in the order of a physical computer keyboard.
 *
 * @internal
 */
export const KeyboardKeyOrder = [
	KeyboardRowOne,
	KeyboardRowTwo,
	KeyboardRowThree,
	KeyboardRowFour,
	KeyboardRowFive,
] as const;

/**
 * A set of all keyboard event codes used by `midi-kbd`.
 *
 * @public
 */
export const KeyCodes = [
	...KeyboardRowOne,
	...KeyboardRowTwo,
	...KeyboardRowThree,
	...KeyboardRowFour,
	...KeyboardRowFive,
] as const;
