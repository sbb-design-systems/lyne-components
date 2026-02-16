import { defaultConverter, type LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbLanguageController } from '../controllers.ts';
import { hostAttributes } from '../decorators.ts';
import { preventScrollOnSpacebarPress } from '../eventing.ts';
import { i18nCheckboxRequired } from '../i18n.ts';

import type { AbstractConstructor } from './constructor.ts';
import { SbbDisabledMixin } from './disabled-mixin.ts';
import { SbbElementInternalsMixin } from './element-internals-mixin.ts';
import {
  SbbFormAssociatedMixin,
  type FormRestoreReason,
  type FormRestoreState,
} from './form-associated-mixin.ts';
import { SbbRequiredMixin } from './required-mixin.ts';

type CheckedSetterValue = { value: boolean; attribute: boolean };

export declare abstract class SbbFormAssociatedCheckboxMixinType extends SbbDisabledMixin(
  SbbRequiredMixin(SbbFormAssociatedMixin(SbbElementInternalsMixin(LitElement))),
) {
  public accessor checked: boolean;

  public formResetCallback(): void;
  public formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

  protected isRequiredExternally(): boolean;
  protected withUserInteraction?(): void;
  protected updateFormValue(): void;
}

/**
 * The FormAssociatedCheckboxMixin enables native form support for checkbox controls.
 *
 * Inherited classes MUST implement the ariaChecked state (ElementInternals) themselves.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedCheckboxMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbFormAssociatedCheckboxMixinType> & T => {
  @hostAttributes({
    tabindex: '0',
  })
  abstract class SbbFormAssociatedCheckboxElement
    extends SbbDisabledMixin(
      SbbRequiredMixin(SbbFormAssociatedMixin(SbbElementInternalsMixin(superClass))),
    )
    implements Partial<SbbFormAssociatedCheckboxMixinType>
  {
    public static override readonly role = 'checkbox';

    private _attributeMutationBlocked = false;
    private _languageController = new SbbLanguageController(this);

    /** Whether the checkbox is checked. */
    @property({
      type: Boolean,
      converter: {
        ...defaultConverter,
        // We need to pass information to the setter so that we know it was called by attribute change.
        fromAttribute: (value: string | null, type?: unknown): CheckedSetterValue => {
          const result = defaultConverter.fromAttribute?.(value, type);
          return { value: result, attribute: true } as CheckedSetterValue;
        },
      },
    })
    public set checked(value: boolean) {
      const attributeSetter =
        typeof value === 'object' ? (value as unknown as CheckedSetterValue).attribute : false;
      if (attributeSetter) {
        value = (value as unknown as CheckedSetterValue).value;
      }

      // As soon as mutation was done not by setting attribute,
      // we need to block syncing attribute.
      if (this.hasUpdated && !attributeSetter) {
        this._attributeMutationBlocked = true;
      }
      this._checked = Boolean(value);
      this.updateFormValue();
    }
    public get checked(): boolean {
      return this._checked;
    }
    private _checked: boolean = false;

    /**
     * Form type of element.
     * @default 'checkbox'
     */
    public override get type(): string {
      return 'checkbox';
    }

    protected constructor() {
      super();
      this.addEventListener?.('click', this._handleUserInteraction);
      this.addEventListener?.('keydown', preventScrollOnSpacebarPress);
      this.addEventListener?.('keyup', this._handleKeyboardInteraction);
    }

    public override attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null,
    ): void {
      // Attribute should not be interpreted after programmatic or manual state change.
      if (name !== 'checked' || !this._attributeMutationBlocked) {
        super.attributeChangedCallback(name, old, value);
      }
    }

    /**
     * Is called whenever the form is being reset.
     *
     * @internal
     */
    public override formResetCallback(): void {
      this.checked = this.hasAttribute('checked');
      this._attributeMutationBlocked = false;
    }

    /**
     *  Called when the browser is trying to restore element’s state to state in which case
     *  reason is "restore", or when the browser is trying to fulfill autofill on behalf of
     *  user in which case reason is "autocomplete".
     *  In the case of "restore", state is a string, File, or FormData object
     *  previously set as the second argument to setFormValue.
     *
     * @internal
     */
    public override formStateRestoreCallback(
      state: FormRestoreState | null,
      _reason: FormRestoreReason,
    ): void {
      if (state) {
        this.checked = state === 'true';
      }
    }

    /**
     * Additional logic which is being executed when user
     * interaction happens and state is not disabled.
     */
    protected withUserInteraction?(): void;

    protected override updateFormValue(): void {
      if (this.checked) {
        super.updateFormValue();
      } else {
        this.internals.setFormValue(null);
      }
    }

    protected override formState(): FormRestoreState {
      return `${this.checked}`;
    }

    protected override shouldValidate(name: PropertyKey | undefined): boolean {
      return super.shouldValidate(name) || name === 'checked' || name === 'required';
    }

    protected override validate(): void {
      super.validate();
      if (this.required && !this.checked) {
        this.setValidityFlag(
          'valueMissing',
          i18nCheckboxRequired[this._languageController.current],
        );
      } else {
        this.removeValidityFlag('valueMissing');
      }
    }

    /** Method triggered on keyboard user interaction with checkbox. */
    private _handleKeyboardInteraction = (event: KeyboardEvent): void => {
      if (event.key === ' ') {
        this._handleUserInteraction();
      }
    };

    /** Method triggered on user interaction with checkbox. */
    private _handleUserInteraction = (): void => {
      if (this.disabled) {
        return;
      }
      this.withUserInteraction?.();
      this.checked = !this.checked;
      this._attributeMutationBlocked = true;

      this.dispatchEvent(new InputEvent('input', { composed: true, bubbles: true }));
      this.dispatchEvent(new Event('change', { bubbles: true }));
    };
  }

  return SbbFormAssociatedCheckboxElement as unknown as AbstractConstructor<SbbFormAssociatedCheckboxMixinType> &
    T;
};
