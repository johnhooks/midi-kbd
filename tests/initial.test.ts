import hello from "../src/index.js";

describe("initial test", () => {
	it("shouldn't throw an error'", () => {
		expect(() => hello()).not.toThrowError();
	});
});
