/**
 * Utility type to create a union of all possible values of an indexable type.
 *
 * @internal
 */
export type ValueOf<T> = T[keyof T];
