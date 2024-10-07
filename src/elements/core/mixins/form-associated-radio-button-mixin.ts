import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { getNextElementIndex, isArrowKeyPressed } from '../a11y.js';
import { SbbConnectedAbortController } from '../controllers.js';

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
}

/**
 * TODO add docs (maybe move to new file)
 * @internal
 */
export class RadioButtonRegistry {
  private static _registry: { [x: string]: SbbFormAssociatedRadioButtonMixinType[] } = {};

  private constructor() {}

  public static addRadioToGroup(
    radio: SbbFormAssociatedRadioButtonMixinType,
    groupName: string,
  ): void {
    if (!this._registry[groupName]) {
      this._registry[groupName] = [];
    }
    // Check for duplicates
    if (this._registry[groupName].indexOf(radio) !== -1) {
      return;
    }
    this._registry[groupName].push(radio);
  }

  public static removeRadioFromGroup(
    radio: SbbFormAssociatedRadioButtonMixinType,
    groupName: string,
  ): void {
    const index = this._registry[groupName]?.indexOf(radio);
    if (!this._registry[groupName] || index === -1) {
      return;
    }
    this._registry[groupName].splice(index, 1);

    if (this._registry[groupName].length === 0) {
      delete this._registry[groupName];
    }
  }

  public static getRadios(groupName: string): SbbFormAssociatedRadioButtonMixinType[] {
    return this._registry[groupName];
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
    @property({ type: Boolean })
    public set checked(value: boolean) {
      this._checked = value;
    }
    public get checked(): boolean {
      return this._checked;
    }
    private _checked: boolean = false;

    protected abort = new SbbConnectedAbortController(this);

    protected constructor() {
      super();
      /** @internal */
      this.internals.role = 'radio';
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._connectToRegistry();

      const signal = this.abort.signal;
      this.addEventListener('keydown', (e) => this._handleArrowKeyDown(e), { signal });
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

      if (changedProperties.has('disabled')) {
        // this.internals.ariaDisabled = this.disabled.toString(); // TODO probably not needed
        this._setFocusableRadio();
      }
      if (changedProperties.has('required')) {
        this.internals.ariaRequired = this.required.toString();
      }

      // On 'name' change, move 'this' to the new registry
      if (changedProperties.has('name')) {
        const oldName = changedProperties.get('name')!;
        this._disconnectFromRegistry(oldName);
        this._connectToRegistry();
        if (this.checked) {
          this._deselectGroupedRadios();
          this._setFocusableRadio();
        }
      }

      if (changedProperties.has('checked')) {
        this.toggleAttribute('data-checked', this.checked);
        this.internals.ariaChecked = this.checked.toString();
        this.updateFormValueOnCheckedChange();
        if (this.checked) {
          this._deselectGroupedRadios();
          this._setFocusableRadio();
        }
      }
    }

    /**
     * Called on `value` change
     * If I'm checked, update the value. Otherwise, do nothing.
     */
    protected override updateFormValue(): void {
      if (this.checked) {
        this.internals.setFormValue(this.value);
      }
    }

    /**
     * Called on `checked` change
     * If I'm checked, set the value. Otherwise, reset it.
     */
    protected updateFormValueOnCheckedChange(): void {
      this.internals.setFormValue(this.checked ? this.value : null);
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
    private _disconnectFromRegistry(name = this.name): void {
      if (!name) {
        return;
      }
      RadioButtonRegistry.removeRadioFromGroup(
        this as unknown as SbbFormAssociatedRadioButtonMixinType,
        name,
      );
    }

    /**
     * Deselect other radio of the same group
     */
    private _deselectGroupedRadios(): void {
      RadioButtonRegistry.getRadios(this.name)
        .filter((r) => r !== (this as unknown as SbbFormAssociatedRadioButtonMixinType))
        .forEach((r) => (r.checked = false));
    }

    /**
     * Return the grouped radios in DOM order
     */
    private _orderedGrouperRadios(groupName = this.name): SbbFormAssociatedRadioButtonElement[] {
      return Array.from(
        (this.form ?? document).querySelectorAll<SbbFormAssociatedRadioButtonElement>(
          `:is(sbb-radio-button, sbb-radio-button-panel)[name="${groupName}"]`,
        ),
      );
    }

    /**
     * The focusable radio is the checked one or the first in DOM order
     * TODO handle radio-button panel exception (they are always focusable? check _hasSelectionExpansionPanelElement in the group)
     */
    private _setFocusableRadio(): void {
      const radios = this._orderedGrouperRadios();
      const checkedIndex = radios.findIndex(
        (radio) => radio.checked && !radio.disabled && !radio.formDisabled,
      );

      radios.forEach((r) => r.removeAttribute('tabindex'));
      radios[checkedIndex !== -1 ? checkedIndex : 0].tabIndex = 0;
    }

    private async _handleArrowKeyDown(evt: KeyboardEvent): Promise<void> {
      if (!isArrowKeyPressed(evt)) {
        return;
      }

      const enabledRadios = this._orderedGrouperRadios().filter(
        (r) => !r.disabled && !r.formDisabled,
      );
      const current: number = enabledRadios.indexOf(this);
      const nextIndex: number = getNextElementIndex(evt, current, enabledRadios.length);

      // if (
      //   !enabledRadios ||
      //   !enabledRadios.length ||
      //   // don't trap nested handling
      //   ((evt.target as HTMLElement) !== this &&
      //     (evt.target as HTMLElement).parentElement !== this &&
      //     (evt.target as HTMLElement).parentElement?.localName !== 'sbb-selection-expansion-panel')
      // ) {
      //   return;
      // }

      // TODO
      // if (!this._hasSelectionExpansionPanelElement) {
      //   enabledRadios[nextIndex].checked = true;
      // }

      enabledRadios[nextIndex].checked = true;
      evt.preventDefault();

      await enabledRadios[nextIndex].updateComplete;
      enabledRadios[nextIndex].focus();
    }
  }

  return SbbFormAssociatedRadioButtonElement as unknown as Constructor<SbbFormAssociatedRadioButtonMixinType> &
    T;
};