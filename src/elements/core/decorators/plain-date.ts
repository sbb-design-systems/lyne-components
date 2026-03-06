import type { ComplexAttributeConverter, ReactiveElement } from 'lit';

import { readConfig } from '../config.ts';
import { type DateAdapter, defaultDateAdapter } from '../datetime.ts';

import type { Interface } from './base.ts';

/**
 * Will convert date object values to ISO8601 formatted strings as attributes.
 * Should be used together with the `plainDate` decorator.
 */
export const plainDateConverter: ComplexAttributeConverter = {
  toAttribute(value, _type) {
    const dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
    return dateAdapter.isValid(value) ? dateAdapter.toIso8601(value) : null;
  },
};

export interface SbbPlainDateConfiguration {
  /**
   * Provide a function that will be called if the internal value is null.
   * @param dataAdapter The current date adapter.
   * @returns A date object.
   */
  fallback?: <T>(dataAdapter: DateAdapter<T>) => T;
}

/**
 * Decorator that tries to deserialize the given value to a date object
 * and adapts the getter to only return a copy of the internal value,
 * in order to avoid outside manipulation of date objects.
 */
export const plainDate = <C extends Interface<ReactiveElement>, V>(
  config?: SbbPlainDateConfiguration,
) => {
  return (
    target: ClassAccessorDecoratorTarget<C, V>,
    context: ClassAccessorDecoratorContext<C, V>,
  ): any => {
    const { kind } = context;
    if (kind === 'accessor') {
      return {
        set(this: C, value) {
          const dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
          value = dateAdapter.getValidDateOrNull(dateAdapter.deserialize(value));
          // We want to copy the value of the date without the time part.
          // As DateAdapter.clone does not guarantee that, we use createDate.
          value = value
            ? dateAdapter.createDate(
                dateAdapter.getYear(value),
                dateAdapter.getMonth(value),
                dateAdapter.getDate(value),
              )
            : null;
          target.set.call(this, value);
        },
        get(this: C) {
          const dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
          const value = target.get.call(this);
          return dateAdapter.isValid(value)
            ? dateAdapter.clone(value)
            : (config?.fallback?.<V>(dateAdapter) as V);
        },
      } satisfies ClassAccessorDecoratorResult<C, V>;
    }

    throw new Error(`Unsupported decorator location: ${kind}`);
  };
};
