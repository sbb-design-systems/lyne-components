import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../a11y.js';
import { SbbConnectedAbortController } from '../controllers.js';
import { forceType } from '../decorators.js';

import type { Constructor } from './constructor.js';
import { SbbDisabledMixin, type SbbDisabledMixinType } from './disabled-mixin.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbFormAssociatedMixin,
  type SbbFormAssociatedMixinType,
} from './form-associated-mixin.js';
import { SbbRequiredMixin, type SbbRequiredMixinType } from './required-mixin.js';

export declare class SbbFormAssociatedRadioButtonMixinType
  extends SbbFormAssociatedMixinType
  implements Partial<SbbDisabledMixinType>, Partial<SbbRequiredMixinType>
{
  public checked: boolean;
  public disabled: boolean;
  public required: boolean;

  protected abort: SbbConnectedAbortController;

  public formResetCallback(): void;
  public formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

  protected isDisabledExternally(): boolean;
  protected isRequiredExternally(): boolean;
  protected withUserInteraction?(): void;
  protected updateFormValue(): void;
  protected updateFocusableRadios(): void;
  protected emitChangeEvents(): void;
  protected navigateByKeyboard(radio: SbbFormAssociatedRadioButtonMixinType): Promise<void>;
}

type RadioButtonGroup = {
  name: string;
  form: HTMLFormElement | null;
  radios: SbbFormAssociatedRadioButtonMixinType[];
};

/**
 * A static registry that holds a collection of `radio-buttons`, grouped by `name + form`.
 * It is mainly used to support the standalone groups of radios.
 * The identifier of a group is composed of the couple 'name + form' because multiple radios with the same name can coexist (as long as they belong to different forms)
 * @internal
 */
export class RadioButtonRegistry {
  private static _registry: RadioButtonGroup[] = [];

  private constructor() {}

  /**
   * Adds @radio to the '@groupName + @form' group. Checks for duplicates
   */
  public static addRadioToGroup(
    radio: SbbFormAssociatedRadioButtonMixinType,
    groupName: string,
    form = radio.form,
  ): void {
    let group = this._registry.find((g) => g.name === groupName && g.form === form);

    // If it does not exist, initializes it
    if (!group) {
      group = { name: groupName, form: form, radios: [] };
      this._registry.push(group);
    }

    // Check for duplicates
    if (group.radios.indexOf(radio) !== -1) {
      return;
    }
    group.radios.push(radio);
  }

  /**
   * Removes @radio from the group it belongs.
   */
  public static removeRadioFromGroup(radio: SbbFormAssociatedRadioButtonMixinType): void {
    // Find the group where @radio belongs
    const groupIndex = this._registry.findIndex((g) => g.radios.find((r) => r === radio));
    const group = this._registry[groupIndex];
    if (!group) {
      return;
    }

    // Remove @radio from the group
    group.radios.splice(group.radios.indexOf(radio), 1);

    // If the group is empty, clear it
    if (group.radios.length === 0) {
      this._registry.splice(groupIndex, 1);
    }
  }

  /**
   * Return an array of radios that belong to the group '@groupName + @form'
   */
  public static getRadios(
    groupName: string,
    form: HTMLFormElement | null,
  ): SbbFormAssociatedRadioButtonMixinType[] {
    return this._registry.find((g) => g.name === groupName && g.form === form)?.radios ?? [];
  }
}

/**
 * The SbbFormAssociatedRadioButtonMixin enables native form support for radio controls.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedRadioButtonMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbFormAssociatedRadioButtonMixinType> & T => {
  class SbbFormAssociatedRadioButtonElement
    extends SbbDisabledMixin(SbbRequiredMixin(SbbFormAssociatedMixin(superClass)))
    implements Partial<SbbFormAssociatedRadioButtonMixinType>
  {
    /**
     * Whether the radio button is checked.
     */
    @forceType()
    @property({ type: Boolean })
    public accessor checked: boolean = false;

    protected abort = new SbbConnectedAbortController(this);
    private _didLoad: boolean = false;

    protected constructor() {
      super();
      /** @internal */
      this.internals.role = 'radio';
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._connectToRegistry();
      this.addEventListener('keydown', (e) => this._handleArrowKeyDown(e), {
        signal: this.abort.signal,
      });
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._disconnectFromRegistry();
    }

    /**
     * Is called whenever the form is being reset.
     * @internal
     */
    public override formResetCallback(): void {
      this.checked = this.hasAttribute('checked');
    }

    /**
     *  Called when the browser is trying to restore element’s state to state in which case
     *  reason is “restore”, or when the browser is trying to fulfill autofill on behalf of
     *  user in which case reason is “autocomplete”.
     * @internal
     */
    public override formStateRestoreCallback(
      state: FormRestoreState | null,
      _reason: FormRestoreReason,
    ): void {
      if (state) {
        this.checked = state === this.value;
      }
    }

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      // On 'name' change, move 'this' to the new registry
      if (changedProperties.has('name')) {
        this._disconnectFromRegistry();
        this._connectToRegistry();
        if (this.checked) {
          this._deselectGroupedRadios();
        }
        this.updateFocusableRadios();
      }

      if (changedProperties.has('checked')) {
        this.toggleAttribute('data-checked', this.checked);
        this.internals.ariaChecked = this.checked.toString();
        this.updateFormValueOnCheckedChange();
        if (this.checked) {
          this._deselectGroupedRadios();
        }
        this.updateFocusableRadios();
      }

      if (changedProperties.has('disabled')) {
        this.updateFocusableRadios();
      }
    }

    protected override firstUpdated(changedProperties: PropertyValues<this>): void {
      super.firstUpdated(changedProperties);
      this._didLoad = true;
      this.updateFocusableRadios();
    }

    /**
     * Called on `value` change
     * If 'checked', update the value. Otherwise, do nothing.
     */
    protected override updateFormValue(): void {
      if (this.checked) {
        this.internals.setFormValue(this.value);
      }
    }

    /**
     * Called on `checked` change
     * If 'checked', update the value. Otherwise, reset it.
     */
    protected updateFormValueOnCheckedChange(): void {
      this.internals.setFormValue(this.checked ? this.value : null);
    }

    /**
     * Only a single radio should be focusable in the group. Defined as:
     * - the checked radio;
     * - the first non-disabled radio in DOM order;
     */
    protected updateFocusableRadios(): void {
      if (!this._didLoad) {
        return;
      }
      const radios = this._orderedGroupedRadios();
      const checkedIndex = radios.findIndex((r) => r.checked && !r.disabled && !r.formDisabled);
      const focusableIndex =
        checkedIndex !== -1
          ? checkedIndex
          : radios.findIndex((r) => !r.disabled && !r.formDisabled); // Get the first focusable radio

      if (focusableIndex !== -1) {
        radios[focusableIndex].tabIndex = 0;
        radios.splice(focusableIndex, 1);
      }

      // Reset tabIndex on other radios
      radios.forEach((r) => r.removeAttribute('tabindex'));
    }

    protected async navigateByKeyboard(next: SbbFormAssociatedRadioButtonElement): Promise<void> {
      next.checked = true;
      this.emitChangeEvents();

      await next.updateComplete;
      next.focus();
    }

    protected emitChangeEvents(): void {
      // Manually dispatch events to simulate a user interaction
      this.dispatchEvent(
        new InputEvent('input', { bubbles: true, cancelable: true, composed: true }),
      );
      this.dispatchEvent(new Event('change', { bubbles: true }));
    }

    /**
     * Add `this` to the radioButton registry
     */
    private _connectToRegistry(name = this.name): void {
      if (!name) {
        return;
      }
      RadioButtonRegistry.addRadioToGroup(
        this as unknown as SbbFormAssociatedRadioButtonMixinType,
        name,
      );
    }

    /**
     * Remove `this` from the radioButton registry
     */
    private _disconnectFromRegistry(): void {
      RadioButtonRegistry.removeRadioFromGroup(
        this as unknown as SbbFormAssociatedRadioButtonMixinType,
      );
    }

    /**
     * Deselect other radio of the same group
     */
    private _deselectGroupedRadios(): void {
      RadioButtonRegistry.getRadios(this.name, this.form)
        .filter((r) => r !== (this as unknown as SbbFormAssociatedRadioButtonMixinType))
        .forEach((r) => (r.checked = false));
    }

    /**
     * Return the grouped radios in DOM order
     */
    private _orderedGroupedRadios(groupName = this.name): SbbFormAssociatedRadioButtonElement[] {
      return Array.from(
        (this.form ?? document).querySelectorAll<SbbFormAssociatedRadioButtonElement>(
          `:is(sbb-radio-button, sbb-radio-button-panel)[name="${groupName}"]`,
        ),
      ).filter((el) => interactivityChecker.isVisible(el));
    }

    private async _handleArrowKeyDown(evt: KeyboardEvent): Promise<void> {
      if (!isArrowKeyPressed(evt)) {
        return;
      }
      evt.preventDefault();

      const enabledRadios = this._orderedGroupedRadios().filter(
        (r) => !r.disabled && !r.formDisabled,
      );
      const current: number = enabledRadios.indexOf(this);
      const nextIndex: number = getNextElementIndex(evt, current, enabledRadios.length);

      await this.navigateByKeyboard(enabledRadios[nextIndex]);
    }
  }

  return SbbFormAssociatedRadioButtonElement as unknown as Constructor<SbbFormAssociatedRadioButtonMixinType> &
    T;
};
