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
