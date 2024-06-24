import { type LitElement, type PropertyValues } from 'lit';

import { forwardEventToHost } from '../eventing.js';

import type { AbstractConstructor } from './constructor.js';

// Define the interface for the mixin
export declare abstract class SbbHydrationMixinType {
  /**
   * Returns a Promise that resolves when the element has completed hydration.
   * The Promise value is a boolean that is `true` if the element required hydration
   * and `false` if not.
   *
   * @return A promise of a boolean that resolves to true once the hydration completed.
   */
  public get hydrationComplete(): Promise<boolean>;

  /** Returns whether hydration is required and not completed. */
  protected get hydrationRequired(): boolean;
}

/**
 * This mixin extends a base class with functionality to check if hydration is completed.
 * It also delays slotchange events until hydration is complete.
 *
 * @param base The class to extend.
 * @returns A class extended with the hydration check functionality.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbHydrationMixin = <T extends AbstractConstructor<LitElement>>(
  base: T,
): AbstractConstructor<SbbHydrationMixinType> & T => {
  abstract class SbbHydrationMixinClass extends base implements Partial<SbbHydrationMixinType> {
    private _hydrationRequired: boolean;
    private _hydrationComplete = new Promise<boolean>(
      (resolve) => (this._resolveHydration = resolve),
    );
    private _resolveHydration!: (hydrationRequired: boolean) => void;

    /**
     * Returns a Promise that resolves when the element has completed hydration.
     * The Promise value is a boolean that is `true` if the element required hydration
     * and `false` if not.
     *
     * @return A promise of a boolean that resolves to true once the hydration completed.
     * @internal
     */
    public get hydrationComplete(): Promise<boolean> {
      return this._hydrationComplete;
    }

    /** Returns whether hydration is required and not completed. */
    protected get hydrationRequired(): boolean {
      return this._hydrationRequired;
    }

    public constructor(...args: any[]) {
      super(...args);
      // Check whether hydration is needed by checking whether the shadow root
      // is available during construction phase.
      this._hydrationRequired = !!this.shadowRoot;
      if (!this._hydrationRequired) {
        this._resolveHydration(false);
      } else {
        const slots = this.shadowRoot?.querySelectorAll('slot');
        if (slots?.length) {
          slots.forEach((slot) =>
            slot.addEventListener('slotchange', this._handleBeforeHydrationSlotchange, {
              capture: true,
            }),
          );
          this.hydrationComplete.then(() =>
            slots.forEach((slot) =>
              slot.removeEventListener('slotchange', this._handleBeforeHydrationSlotchange),
            ),
          );
        }
      }
    }

    private _handleBeforeHydrationSlotchange = (event: Event): void => {
      if (!this._hydrationRequired) {
        return;
      }
      event.stopImmediatePropagation();
      const target = event.target as HTMLSlotElement;
      this.hydrationComplete.then(() => forwardEventToHost(event, target));
    };

    protected override update(changedProperties: PropertyValues<this>): void {
      // When hydration is needed, we wait the hydration process to finish, which is patched
      // into the update method of the LitElement base class.
      super.update(changedProperties);

      if (this._hydrationRequired) {
        this._hydrationRequired = false;
        this._resolveHydration(true);
      }
    }
  }
  return SbbHydrationMixinClass as unknown as AbstractConstructor<SbbHydrationMixinType> & T;
};
