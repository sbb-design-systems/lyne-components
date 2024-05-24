import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbNowMixinType {
  public set now(value: number | string);
  public get now(): number;
  protected get dateNow(): number;
}

/**
 * Enhance your component with a `now` property.
 *
 * Aside from the standard get method, the mixin also has a `dateNow` getter which returns the current datetime as a fallback.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNowMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbNowMixinType> & T => {
  abstract class SbbNowElement extends superClass implements Partial<SbbNowMixinType> {
    /** A specific date for the current datetime (timestamp in milliseconds). */
    @property({ type: Number })
    public get now(): number | undefined {
      return this._now;
    }
    public set now(value: number | string) {
      this._now = +value;
    }
    private _now?: number;

    /** Returns the `_now` value if available, otherwise the current datetime (as timestamp in millisecond). */
    protected get dateNow(): number {
      return this._now ?? Date.now();
    }
  }

  return SbbNowElement as unknown as AbstractConstructor<SbbNowMixinType> & T;
};
