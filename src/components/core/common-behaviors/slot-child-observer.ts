import type { LitElement, PropertyValues } from 'lit';

import type { Constructor } from './constructor';

// Define the interface for the mixin
export declare abstract class SlotChildObserverType {
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
     * Whether the component needs hydration.
     * @see https://github.com/lit/lit/blob/main/packages/labs/ssr-client/src/lit-element-hydrate-support.ts
     *
     * We have a problem with SSR, in that we don't have a reference to children.
     * Due to this, the SSR/hydration can fail, when internal elements depend on children
     * and will therefore not be rendered server side, but will be immediately rendered client side.
     * Due to this, we add this initialized property, which will prevent child detection
     * until it has been initialized/hydrated.
     * @see https://github.com/lit/lit/discussions/4407
     */
    private _needsHydration = false;
    private _slotchangeHandler = (): void => {
      if (this._needsHydration) {
        return;
      }
      this.checkChildren();
    };

    protected override createRenderRoot(): HTMLElement | DocumentFragment {
      this._needsHydration = !!this.shadowRoot;
      return super.createRenderRoot();
    }

    protected override update(changedProperties: PropertyValues): void {
      super.update(changedProperties);
      if (this._needsHydration) {
        this._needsHydration = false;
        Promise.resolve().then(() => this.checkChildren());
      }
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      if (!this._needsHydration) {
        this.checkChildren();
      }
      this.shadowRoot!.addEventListener('slotchange', this._slotchangeHandler);
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this.shadowRoot!.removeEventListener('slotchange', this._slotchangeHandler);
    }

    protected checkChildren(): void {
      // Needs to be implemented by inherited classes
    }
  }
  return SlotChildObserverClass as unknown as Constructor<SlotChildObserverType> & T;
};
