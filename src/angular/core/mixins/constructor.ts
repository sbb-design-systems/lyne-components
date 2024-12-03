// TODO: check if the duplication makes sense, otherwise remove this file adapting its import from elements/core.

/** @docs-private */
export type Constructor<T = object> = new (...args: any[]) => T;

/**
 * This is a permissive type for abstract class constructors.
 * @docs-private
 */
export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;
