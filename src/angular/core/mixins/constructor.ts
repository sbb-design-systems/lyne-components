// TODO check if makes sense or they are just duplicated and possibily remove.

/** @docs-private */
export type Constructor<T = object> = new (...args: any[]) => T;

/**
 * This is a permissive type for abstract class constructors.
 * @docs-private
 */
export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;
