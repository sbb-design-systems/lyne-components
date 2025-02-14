import type { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor.js';

export declare abstract class SbbFormAssociatedMixinType<V = string> {
  public get form(): HTMLFormElement | null;
  public accessor name: string;
  public get type(): string;
  public accessor value: V | null;

  protected formDisabled: boolean;
  protected readonly internals: ElementInternals;

  public formAssociatedCallback?(form: HTMLFormElement | null): void;
  public formDisabledCallback(disabled: boolean): void;
  public abstract formResetCallback(): void;
  public abstract formStateRestoreCallback(
    state: FormRestoreState | null,
    reason: FormRestoreReason,
  ): void;

  protected abstract updateFormValue(): void;
}

/**
 * The FormAssociatedMixin enables native form support for custom controls.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedMixin = <T extends AbstractConstructor<LitElement>, V = string>(
  superClass: T,
): AbstractConstructor<SbbFormAssociatedMixinType<V>> & T => {
  abstract class SbbFormAssociatedElement
    extends superClass
    implements Partial<SbbFormAssociatedMixinType<V>>
  {
    public static formAssociated = true;

    /**
     * Returns the form owner of the internals of the target element.
     */
    public get form(): HTMLFormElement | null {
      return this.internals.form;
    }

    /**
     * Name of the form element. Will be read from name attribute.
     *
     * @description Developer note: In this case updating the attribute must be synchronous.
     * Due to this it is implemented as a getter/setter and the attributeChangedCallback() handles the diff check.
     */
    @property()
    public set name(name: string) {
      this.setAttribute('name', `${name}`);

      // For `FormData` values, we have to manually update the fieldName key
      this.updateFormValue();
    }
    public get name(): string {
      return this.getAttribute('name') ?? '';
    }

    /** @internal */
    public get type(): string {
      return this.localName;
    }

    /** Value of the form element. */
    @property()
    public set value(value: V | null) {
      this._value = value;
      this.updateFormValue();
    }
    public get value(): V | null {
      return this._value;
    }
    private _value: V | null = null;

    /** @internal */
    protected readonly internals: ElementInternals = this.attachInternals();

    /** Whenever a surrounding form or fieldset is changing its disabled state. */
    @state() protected accessor formDisabled: boolean = false;

    public constructor(...args: any[]) {
      super(...args);
      // We want to prevent the native browser validation message popover
      // to be shown. This also prevents a bug in WebKit, which would not
      // allow host as the validity anchor: https://bugs.webkit.org/show_bug.cgi?id=269832
      this.addEventListener?.('invalid', (e) => e.preventDefault());
    }

    public override attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null,
    ): void {
      if (name !== 'name' || old !== value) {
        super.attributeChangedCallback(name, old, value);
      }
    }

    /**
     * Called when the associated form element changes.
     * ElementInternals.form returns the associated from element.
     *
     * @internal
     */
    public formAssociatedCallback?(form: HTMLFormElement | null): void;

    /**
     * Is called whenever a surrounding form / fieldset changes disabled state.
     * @param disabled
     *
     * @internal
     */
    public formDisabledCallback(disabled: boolean): void {
      // This callback is triggered if the disabled property changes or the disabled attribute of a fieldset or form changes.
      // We need to postpone the assignment, otherwise it interferes with disabled status setting
      // and leads to a wrong state (e.g. embedded sbb-visual-checkbox).
      Promise.resolve().then(() => {
        this.formDisabled = disabled;
      });
    }

    /**
     * Is called whenever the form is being reset.
     *
     * @internal
     */
    public abstract formResetCallback(): void;

    /**
     *  Called when the browser is trying to restore element’s state to state in which case
     *  reason is “restore”, or when the browser is trying to fulfill autofill on behalf of
     *  user in which case reason is “autocomplete”.
     *  In the case of “restore”, state is a string, File, or FormData object
     *  previously set as the second argument to setFormValue.
     *
     * @internal
     */
    public abstract formStateRestoreCallback(
      state: FormRestoreState | null,
      reason: FormRestoreReason,
    ): void;

    /**
     * Should be called when form value is changed.
     * Adapts and sets the formValue in the supported format (string | FormData | File | null)
     * https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue
     */
    protected abstract updateFormValue(): void;
  }
  return SbbFormAssociatedElement as unknown as AbstractConstructor<SbbFormAssociatedMixinType<V>> &
    T;
};

/**
 * A value to be restored for a component's form value. If a component's form
 * state is a `FormData` object, its entry list of name and values will be
 * provided.
 */
export type FormRestoreState = File | string | [string, FormDataEntryValue][];

/**
 * The reason a form component is being restored for, either `'restore'` for
 * browser restoration or `'autocomplete'` for restoring user values.
 */
export type FormRestoreReason = 'restore' | 'autocomplete';
