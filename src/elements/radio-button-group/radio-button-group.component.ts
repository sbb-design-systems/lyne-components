import type { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbSelectionGroupBaseElement } from '../core/base-elements.ts';
import { forceType } from '../core/decorators.ts';
import type { SbbRadioButtonElement } from '../radio-button/radio-button.component.ts';
import type { SbbRadioButtonPanelElement } from '../radio-button-panel.ts';

let nextId = 0;

/**
 * It can be used as a container for radio button elements.
 *
 * @slot - Use the unnamed slot to add `sbb-radio-button`, `sbb-radio-button-panel`, `sbb-selection-action-panel` and `sbb-selection-expansion-panel` elements to the `sbb-radio-button-group`.
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 * @overrideType value - (T = string) | null
 */
export class SbbRadioButtonGroupElement<T = string> extends SbbSelectionGroupBaseElement<
  SbbRadioButtonElement<T> | SbbRadioButtonPanelElement<T>
> {
  public static override readonly elementName: string = 'sbb-radio-button-group';
  public static override readonly role = 'radiogroup';
  public static readonly events = {
    didChange: 'didChange',
    change: 'change',
    input: 'input',
  } as const;
  protected readonly selectionElementSelectors = 'sbb-radio-button, sbb-radio-button-panel';
  protected readonly panelElementSelector: string = 'sbb-radio-button-panel';

  /**
   * Whether the radios can be deselected.
   */
  @forceType()
  @property({ attribute: 'allow-empty-selection', type: Boolean })
  public accessor allowEmptySelection: boolean = false;

  /**
   * The value of the radio group.
   */
  @property()
  public set value(val: T | null) {
    this._fallbackValue = val;
    if (!this.hasUpdated) {
      return;
    }
    if (val == null) {
      this.selectionElements.forEach((r) => (r.checked = false));
      return;
    }
    const toCheck = this.selectionElements.find((r) => r.value === val);
    if (toCheck) {
      toCheck.checked = true;
    }
  }
  public get value(): T | null {
    return (
      this.selectionElements.find((r) => r.checked && !r.disabled)?.value ?? this._fallbackValue
    );
  }
  /**
   * Used to preserve the `value` in case the radios are not yet 'loaded'
   */
  private _fallbackValue: T | null = null;

  /** Name for the group. Will be propagated to the child radio buttons. Must be unique if multiple groups are used on the same page. */
  @forceType()
  @property()
  // eslint-disable-next-line no-useless-assignment
  public accessor name: string = `sbb-radio-button-group-${++nextId}`;

  /** List of contained radio buttons. */
  public get radioButtons(): (SbbRadioButtonElement<T> | SbbRadioButtonPanelElement<T>)[] {
    return this.selectionElements;
  }

  public constructor() {
    super();
    this.addEventListener?.('change', (e: Event) => this._onRadioChange(e));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('name')) {
      this._updateRadiosName();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this.updateComplete.then(() => this._updateRadioState());
  }

  private _onRadioChange(event: Event): void {
    const target = event.target! as SbbRadioButtonElement | SbbRadioButtonPanelElement;

    // Only filter radio-buttons event
    if (
      (target.localName !== 'sbb-radio-button' && target.localName !== 'sbb-radio-button-panel') ||
      target.group !== this
    ) {
      return;
    }

    this._fallbackValue = null; // Since the user interacted, the fallbackValue logic does not apply anymore

    /**
     * Deprecated. Mirrors change event for React. Will be removed once React properly supports change events.
     * @deprecated
     */
    this.dispatchEvent(new Event('didChange', { bubbles: true }));
  }

  /**
   * Proxy 'name' to child radio-buttons
   */
  private _updateRadiosName(): void {
    this.selectionElements.forEach((r) => (r.name = this.name));
  }

  /**
   * Re-trigger the setter and update the checked state of the radios.
   * Mainly used to cover cases where the setter is called before the radios are loaded
   */
  private _updateRadioState(): void {
    if (this._fallbackValue != null) {
      // eslint-disable-next-line no-self-assign
      this.value = this.value;
    }
  }

  protected override onSlotChange(): void {
    super.onSlotChange();

    this._updateRadiosName();
    this._updateRadioState();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-group': SbbRadioButtonGroupElement;
  }
}
