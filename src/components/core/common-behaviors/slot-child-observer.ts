import { LitElement, PropertyValues } from 'lit';

import { ConnectedAbortController } from '../eventing';

import { Constructor } from './constructor';

// Define the interface for the mixin
export declare abstract class SlotChildObserverType {
  /**
   * Checks if the given slot has text content or elements assigned to it.
   * @param name The name of the slot or unnamed slot, if omitted.
   * @returns True, if the given slot has content.
   */
  protected slotHasContent(name?: string): boolean;
  protected abstract checkChildren(): void;
}

/**
 * This mixin extends a base class with the slot child observer functionality.
 * It ensures that the method to check for slotted children/elements is only called
 * when necessary.
 * @param base The class to extend.
 * @returns A class extended with the slot child observer functionality.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SlotChildObserver = <T extends Constructor<LitElement>>(
  base: T,
): Constructor<SlotChildObserverType> & T => {
  class SlotChildObserverClass extends base implements Partial<SlotChildObserverType> {
    /**
     * We have a problem with SSR, in that we don't have a reference to children.
     * Due to this, the SSR/hydration can fail, when internal elements depend on children
     * and will therefore not be rendered server side, but will be immediately rendered client side.
     * Due to this, we add this initialized property, which will prevent child detection
     * until it has been initialized/hydrated.
     *
     * https://github.com/lit/lit/discussions/4407
     */
    private _hydrated = new Promise<void>((r) => (this._hydratedResolve = r));
    private _hydratedResolve: () => void;
    private _hydratedResolved = false;
    private _slotchangeAbortController = new ConnectedAbortController(this);

    public override connectedCallback(): void {
      super.connectedCallback();
      if (this._hydratedResolved) {
        this.checkChildren();
      }
      this.shadowRoot.addEventListener(
        'slotchange',
        () => {
          if (!this._hydratedResolved) {
            return;
          }
          this.checkChildren();
        },
        { signal: this._slotchangeAbortController.signal },
      );
    }

    protected checkChildren(): void {
      // Needs to be implemented by inherited classes
    }

    protected slotHasContent(name?: string): boolean {
      if (!name) {
        return Array.from(this.childNodes ?? []).some(
          (n) => !(n as Element).slot && n.textContent?.trim(),
        );
      } else {
        return Array.from(this.children ?? []).some((e) => e.slot === name);
      }
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      super.firstUpdated(changedProperties);
      setTimeout(() => {
        this._hydratedResolved = true;
        this._hydratedResolve();
        this.checkChildren();
      }, 0);
    }

    protected override async getUpdateComplete(): Promise<boolean> {
      const result = await super.getUpdateComplete();
      await this._hydrated;
      return result;
    }
  }
  return SlotChildObserverClass as unknown as Constructor<SlotChildObserverType> & T;
};
