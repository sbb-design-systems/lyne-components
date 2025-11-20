import type { LitElement, PropertyValues } from 'lit';

import type { AbstractConstructor } from './constructor.ts';

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
      // is available during construction/upgrade phase.
      this._hydrationRequired = !!this.shadowRoot;
      if (!this._hydrationRequired) {
        this._resolveHydration(false);
      } else {
        // During hydration phase, we want to suppress slotchange events as they
        // can cause render differences, which would break hydration. After
        // hydration is complete, we dispatch a manual slotchange event, if there
        // are elements assigned to a slot.
        const suppressSlotchangeEvent = (event: Event): void => {
          if (this._hydrationRequired) {
            event.stopImmediatePropagation();
          }
        };
        const eventOptions: EventListenerOptions = { capture: true };
        const slots = this.shadowRoot?.querySelectorAll('slot');
        if (slots?.length) {
          slots.forEach((slot) =>
            slot.addEventListener('slotchange', suppressSlotchangeEvent, eventOptions),
          );
          this.hydrationComplete.then(() =>
            slots.forEach((slot) => {
              slot.removeEventListener('slotchange', suppressSlotchangeEvent, eventOptions);
              if (slot.assignedNodes().length) {
                slot.dispatchEvent(new Event('slotchange', { bubbles: true }));
              }
            }),
          );
        }
      }
    }

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
