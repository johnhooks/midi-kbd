/**
 * Utility type to create a union of all possible values of an indexable type.
 *
 * @public
 */
export type ValueOf<T> = T[keyof T];
