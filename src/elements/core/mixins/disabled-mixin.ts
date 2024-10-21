import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType, getOverride } from '../decorators.js';

import type { AbstractConstructor } from './constructor.js';

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
    /** Whether the component is disabled. */
    @forceType()
    @property({ reflect: true, type: Boolean })
    @getOverride((e, v) => v || e.isDisabledExternally())
    public accessor disabled: boolean = false;

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
    /** Whether disabled buttons should be interactive. */
    @forceType()
    @property({ attribute: 'disabled-interactive', type: Boolean })
    public accessor disabledInteractive: boolean = false;
  }

  return SbbDisabledInteractiveElement as unknown as AbstractConstructor<SbbDisabledInteractiveMixinType> &
    T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledTabIndexActionMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType & SbbDisabledInteractiveMixinType> & T => {
  abstract class SbbDisabledTabIndexAction
    extends SbbDisabledInteractiveMixin(SbbDisabledMixin(superClass))
    implements SbbDisabledMixinType, SbbDisabledInteractiveMixinType
  {
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
