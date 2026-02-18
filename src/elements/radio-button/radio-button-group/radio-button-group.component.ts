import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.ts';
import { SbbDisabledMixin, SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbRadioButtonSize } from '../common.ts';
import type { SbbRadioButtonPanelElement } from '../radio-button-panel.ts';
import type { SbbRadioButtonElement } from '../radio-button.ts';

import style from './radio-button-group.scss?lit&inline';

let nextId = 0;

/**
 * It can be used as a container for one or more `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-radio-button` elements to the `sbb-radio-button-group`.
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-radio-button-group')
class SbbRadioButtonGroupElement<T = string> extends SbbDisabledMixin(
  SbbElementInternalsMixin(LitElement),
) {
  public static override readonly role = 'radiogroup';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    didChange: 'didChange',
    change: 'change',
    input: 'input',
  } as const;

  /**
   * Whether the radios can be deselected.
   */
  @forceType()
  @property({ attribute: 'allow-empty-selection', type: Boolean })
  public accessor allowEmptySelection: boolean = false;

  /**
   * Whether the radio group is required.
   */
  @forceType()
  @property({ type: Boolean })
  public accessor required: boolean = false;

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
      this.radioButtons.forEach((r) => (r.checked = false));
      return;
    }
    const toCheck = this.radioButtons.find((r) => r.value === val);
    if (toCheck) {
      toCheck.checked = true;
    }
  }
  public get value(): T | null {
    return this.radioButtons.find((r) => r.checked && !r.disabled)?.value ?? this._fallbackValue;
  }
  /**
   * Used to preserve the `value` in case the radios are not yet 'loaded'
   */
  private _fallbackValue: T | null = null;

  /**
   * Size variant, either xs, s or m.
   * @default 'm' / 'xs' (lean)
   */
  @property() public accessor size: SbbRadioButtonSize = isLean() ? 'xs' : 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom | null = null;

  /**
   * Radio group's orientation, either horizontal or vertical.
   */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  @forceType()
  @property()
  public accessor name: string = `sbb-radio-button-group-${++nextId}`;

  /**
   * List of contained radio buttons.
   */
  public get radioButtons(): (SbbRadioButtonElement<T> | SbbRadioButtonPanelElement<T>)[] {
    return (
      Array.from(this.querySelectorAll?.('sbb-radio-button, sbb-radio-button-panel') ?? []) as (
        | SbbRadioButtonElement<T>
        | SbbRadioButtonPanelElement<T>
      )[]
    ).filter((el) => el.closest?.('sbb-radio-button-group') === this);
  }

  public constructor() {
    super();

    this.addController(
      new MutationController(this, {
        config: { childList: true, subtree: true },
        callback: () =>
          this.toggleState('has-panel', !!this.querySelector?.('sbb-radio-button-panel')),
      }),
    );

    this.addEventListener?.('change', (e: Event) => this._onRadioChange(e));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('disabled'));
    }
    if (changedProperties.has('required')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('required'));
    }
    if (changedProperties.has('size')) {
      this.radioButtons.forEach((r) => r.requestUpdate?.('size'));
    }
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
    this.radioButtons.forEach((r) => (r.name = this.name));
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

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-radio-group">
        <slot
          @slotchange=${() => {
            this._updateRadiosName();
            this._updateRadioState();
          }}
        ></slot>
      </div>
      <slot name="error"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-group': SbbRadioButtonGroupElement;
  }
}
