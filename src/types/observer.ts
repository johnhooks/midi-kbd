/**
 * Observer function type.
 *
 * @public
 */
type ObserverFn<TValue> = (value: TValue) => void;

/**
 * Observer object type.
 *
 * @public
 */
type ObserverObj<TValue> = {
	next: (value: TValue) => void;
	error?: (error: Error) => void;
	done?: () => void;
};

/**
 * Observer of observable type.
 *
 * @public
 */
export type Observer<TValue> = ObserverFn<TValue> | ObserverObj<TValue>;
