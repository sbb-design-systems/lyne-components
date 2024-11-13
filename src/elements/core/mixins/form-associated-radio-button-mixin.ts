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

/**
 * A static registry that holds a collection of grouped `radio-buttons`.
 * Groups of radio buttons are local to the form they belong (or the `renderRoot` if they're not part of any form)
 * Multiple groups of radio with the same name can coexist (as long as they belong to a different form / renderRoot)
 * It is mainly used to support the standalone groups of radios.
 * @internal
 */
const radioButtonRegistry = new WeakMap<
  Node,
  Map<string, Set<SbbFormAssociatedRadioButtonMixinType>>
>();

export declare class SbbFormAssociatedRadioButtonMixinType
  extends SbbFormAssociatedMixinType
  implements Partial<SbbDisabledMixinType>, Partial<SbbRequiredMixinType>
{
  public checked: boolean;
  public disabled: boolean;
  public required: boolean;

  protected associatedRadioButtons?: Set<SbbFormAssociatedRadioButtonMixinType>;
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

    /**
     * Set of radio buttons that belongs to the same group of `this`.
     * Assume them ordered in DOM order
     */
    protected associatedRadioButtons?: Set<SbbFormAssociatedRadioButtonElement>;
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
      const radios = this._interactableGroupedRadios();
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
    private _connectToRegistry(): void {
      if (!this.name) {
        return;
      }

      const root = this.form ?? this.getRootNode();
      let nameMap = radioButtonRegistry.get(root);

      // Initialize the 'root' map entry
      if (!nameMap) {
        nameMap = new Map();
        radioButtonRegistry.set(root, nameMap);
      }

      this.associatedRadioButtons = nameMap.get(
        this.name,
      ) as unknown as Set<SbbFormAssociatedRadioButtonElement>;

      // Initialize the group set
      if (!this.associatedRadioButtons) {
        this.associatedRadioButtons = new Set();
        nameMap.set(
          this.name,
          this.associatedRadioButtons as unknown as Set<SbbFormAssociatedRadioButtonMixinType>,
        );
      }

      // Insert the new radio into the set and sort following the DOM order.
      // Since the order of a 'Set' is the insert order, we have to empty it and re-insert radios in order
      const entries = Array.from(this.associatedRadioButtons);
      this.associatedRadioButtons.clear();

      // Find `this` position and insert it
      const index = entries.findIndex(
        (r) => this.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
      if (index !== -1) {
        entries.splice(index, 0, this);
      } else {
        entries.push(this);
      }

      // Repopulate the Set
      entries.forEach((r) => this.associatedRadioButtons!.add(r));
    }

    /**
     * Remove `this` from the radioButton registry
     */
    private _disconnectFromRegistry(): void {
      this.associatedRadioButtons?.delete(this);
      this.associatedRadioButtons = undefined;
    }

    /**
     * Return a list of 'interactable' grouped radios, ordered in DOM order
     */
    private _interactableGroupedRadios(): SbbFormAssociatedRadioButtonElement[] {
      return Array.from(this.associatedRadioButtons ?? []).filter((el) =>
        interactivityChecker.isVisible(el),
      );
    }

    /**
     * Deselect other radio of the same group
     */
    private _deselectGroupedRadios(): void {
      Array.from(this.associatedRadioButtons ?? [])
        .filter((r) => r !== this)
        .forEach((r) => (r.checked = false));
    }

    private async _handleArrowKeyDown(evt: KeyboardEvent): Promise<void> {
      if (!isArrowKeyPressed(evt)) {
        return;
      }
      evt.preventDefault();

      const enabledRadios = this._interactableGroupedRadios().filter(
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
