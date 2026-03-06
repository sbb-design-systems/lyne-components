import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType } from '../decorators.ts';

import type { AbstractConstructor } from './constructor.ts';
import type { SbbElementInternalsMixinType } from './element-internals-mixin.ts';

export declare class SbbDisabledMixinType {
  public accessor disabled: boolean;
  protected isDisabledExternally(): boolean;
}

export declare class SbbDisabledInteractiveMixinType {
  public accessor disabledInteractive: boolean;
}

/**
 * Enhance your component with a disabled property.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType> & T => {
  abstract class SbbDisabledElement extends superClass implements Partial<SbbDisabledMixinType> {
    /**
     * Whether the component is disabled.
     * @default false
     */
    // TODO: remove reflect: true and manage only in setter.
    @property({ type: Boolean, reflect: true })
    public set disabled(value: boolean) {
      this.#disabled = !!value;

      // The attribute needs to be reflected synchronously (like native)
      // TODO: only disabled of the actual component should be reflected, without considering this.isDisabledExternally()
      this.toggleAttribute('disabled', this.disabled);
    }
    public get disabled(): boolean {
      return this.#disabled || this.isDisabledExternally();
    }
    #disabled = false;

    /**
     * Will be used as 'or' check to the current disabled state.
     * Can e.g. be used to read disabled state of a group.
     */
    protected isDisabledExternally(): boolean {
      return false;
    }
  }

  return SbbDisabledElement as unknown as AbstractConstructor<SbbDisabledMixinType> & T;
};

/**
 * Enhance your component with a disabled interactive property.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledInteractiveMixin = <
  T extends AbstractConstructor<LitElement & SbbDisabledMixinType>,
>(
  superClass: T,
): AbstractConstructor<SbbDisabledInteractiveMixinType> & T => {
  abstract class SbbDisabledInteractiveElement
    extends superClass
    implements Partial<SbbDisabledInteractiveMixinType>
  {
    /** Whether the button should be aria-disabled but stay interactive. */
    @forceType()
    @property({ attribute: 'disabled-interactive', type: Boolean, reflect: true })
    public accessor disabledInteractive: boolean = false;
  }

  return SbbDisabledInteractiveElement as unknown as AbstractConstructor<SbbDisabledInteractiveMixinType> &
    T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledTabIndexActionMixin = <
  T extends AbstractConstructor<LitElement & SbbElementInternalsMixinType>,
>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType & SbbDisabledInteractiveMixinType> & T => {
  abstract class SbbDisabledTabIndexAction
    extends SbbDisabledInteractiveMixin(SbbDisabledMixin(superClass))
    implements SbbDisabledMixinType, SbbDisabledInteractiveMixinType
  {
    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('disabledInteractive')) {
        this.internals.ariaDisabled = this.disabledInteractive ? 'true' : null;
      }

      if (!changedProperties.has('disabled')) {
        return;
      }

      if (!this.disabled) {
        this.setAttribute('tabindex', '0');
      } else {
        this.removeAttribute('tabindex');
      }
    }
  }
  return SbbDisabledTabIndexAction as AbstractConstructor<
    SbbDisabledMixinType & SbbDisabledInteractiveMixinType
  > &
    T;
};
