import { KeyPos, Point } from "../types/index.js";

/**
 * The structure of a simple keyboard, sans the bottom row.
 *
 * The space bar position is unique and calculated outsize the loop.
 */
const structure = [
	[...fill(13), 1.5],
	[1.5, ...fill(13)],
	[1.8, ...fill(11), 1.8],
	[2.25, ...fill(10), 2.25],
] as const;

/**
 * Calculate positions and width of keyboard keys.
 *
 * Intended to be used to draw the 4 primary rows of a computer keyboard, plus the
 * space bar.
 * @internal
 */
export function calcKeyPos(size: number, spacing: number, offset: Point = { x: 0, y: 0 }) {
	const result: KeyPos[] = [];

	for (let i = 0; i < structure.length; i++) {
		const row = structure[i];

		/**
		 * The y coordinate is pretty simple, it consistently increments.
		 */
		const y = (size + spacing) * i;

		/**
		 * The x coordinate is tricker, the spacing needs to be adjusted when a key
		 * ratio is larger than one.
		 */
		let x = 0;

		for (let j = 0; j < row.length; j++) {
			const ratio = row[j];
			/**
			 * If a key ratio is larger than a 1, it needs to fill the gap created in the
			 * spacing.
			 *
			 * - When larger than 1 but less than 2, the adjustment is 0.5, the following
			 *   key in the sequence still accounts for the other half.
			 * - when larger than 2 (2.25 is the largest in the sequence) it consumes a
			 *   full spacing and the adjustment is 1.25... and lol I haven't taken the
			 *   time to figure out why.
			 *
			 * Pretty hacky, maybe I can find a better solution.
			 */
			const spacingRatio = ratio === 1 ? 0 : ratio > 2 ? 1.25 : 0.5;
			const width = size * ratio + spacing * spacingRatio;

			result.push({ x: x + offset.x, y: y + offset.y, width });

			/**
			 * Update the x coordinate for the next iteration.
			 */
			x = x + width + spacing;
		}
	}

	/**
	 * The space bar spans the fourth row columns 3-7 (zero indexed).
	 */
	result.push({
		x: 4.25 * size + 4.25 * spacing + offset.x,
		y: (size + spacing) * 4 + offset.y,
		width: (size + spacing) * 5 + size,
	});

	return result;
}

/**
 * Create an array of a specific `size`, initialized with a `value`.
 *
 * @internal
 */
function fill(length: number, value = 1): number[] {
	return Array.from({ length }, () => value);
}
