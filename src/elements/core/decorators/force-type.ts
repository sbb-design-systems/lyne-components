import type { ReactiveElement } from 'lit';

import type { Interface, PropertyDecorator } from './base.js';

/**
 * This is a decorator that forces the value of a property or getter/setter
 * to the defined type.
 */
export const forceType = <C extends Interface<ReactiveElement>, V>(): PropertyDecorator => {
  return (
    target: ClassAccessorDecoratorTarget<C, V> | ((value: V) => void),
    context: ClassAccessorDecoratorContext<C, V> | ClassSetterDecoratorContext<C, V>,
  ): any => {
    const { kind, metadata, name } = context;

    const type = (globalThis.litPropertyMetadata.get(metadata)?.get(name)?.type ?? String) as (
      v: unknown,
    ) => V;
    if (kind === 'accessor') {
      return {
        set(this: C, value) {
          (target as ClassAccessorDecoratorTarget<C, V>).set.call(
            this as unknown as C,
            type!(value) as V,
          );
        },
      } satisfies ClassAccessorDecoratorResult<C, V>;
    } else if (kind === 'setter') {
      return function (value: unknown) {
        (target as (value: unknown) => void)(type!(value));
      } satisfies (this: C, value: V) => void;
    }

    throw new Error(`Unsupported decorator location: ${kind}`);
  };
};
