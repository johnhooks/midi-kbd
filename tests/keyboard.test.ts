import { genKeyboardMidiIndex } from "../src/keyboard/helpers.js";

describe("KeyboardMidiIndex", () => {
	it("shouldn't throw an error'", () => {
		expect(() => genKeyboardMidiIndex(4)).not.toThrowError();
	});
});
