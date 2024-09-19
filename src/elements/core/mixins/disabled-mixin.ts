import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbDisabledMixinType {
  public set disabled(value: boolean);
  public get disabled(): boolean;
  protected isDisabledExternally(): boolean;
}

export declare class SbbDisabledInteractiveMixinType {
  public disabledInteractive: boolean;
}

/**
 * Enhance your component with a disabled property.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType> & T => {
  abstract class SbbDisabledElement extends superClass implements Partial<SbbDisabledMixinType> {
    /** Whether the component is disabled. */
    @property({ reflect: true, type: Boolean })
    public set disabled(value: boolean) {
      // To provide the same behavior as the native disabled state,
      // any value is converted to a boolean.
      this._disabled = Boolean(value);
    }
    public get disabled(): boolean {
      return this._disabled || this.isDisabledExternally();
    }
    private _disabled: boolean = false;

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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledTabIndexActionMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType & SbbDisabledInteractiveMixinType> & T => {
  abstract class SbbDisabledTabIndexAction
    extends SbbDisabledMixin(superClass)
    implements SbbDisabledMixinType, SbbDisabledInteractiveMixinType
  {
    /** Whether disabled buttons should be interactive. */
    @property({ attribute: 'disabled-interactive', type: Boolean }) public disabledInteractive =
      false;

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (!changedProperties.has('disabled') && !changedProperties.has('disabledInteractive')) {
        return;
      }

      if (!this.disabled || this.disabledInteractive) {
        this.setAttribute('tabindex', '0');
      } else {
        this.removeAttribute('tabindex');
      }

      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }
  return SbbDisabledTabIndexAction as AbstractConstructor<
    SbbDisabledMixinType & SbbDisabledInteractiveMixinType
  > &
    T;
};

/**
 * Extends `SbbDisabledMixin` with the `aria-disabled` attribute.
 * For a11y purposes, keeps the element focusable even when disabled.
 * @deprecated Will be removed with next major version
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFocusableDisabledActionMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType> & T => {
  abstract class SbbFocusableDisabledAction
    extends SbbDisabledMixin(superClass)
    implements SbbDisabledMixinType
  {
    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (!changedProperties.has('disabled')) {
        return;
      }

      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }
  return SbbFocusableDisabledAction as AbstractConstructor<SbbDisabledMixinType> & T;
};
