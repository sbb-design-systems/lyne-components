import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbConnectedAbortController } from '../../core/controllers.js';
import { hostAttributes, slotState } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import type { SbbHorizontalFrom, SbbOrientation, SbbStateChange } from '../../core/interfaces.js';
import { SbbDisabledMixin } from '../../core/mixins.js';
import type { SbbRadioButtonStateChange, SbbRadioButtonSize } from '../common.js';
import type { SbbRadioButtonPanelElement } from '../radio-button-panel.js';
import type { SbbRadioButtonElement } from '../radio-button.js';

import style from './radio-button-group.scss?lit&inline';

export type SbbRadioButtonGroupEventDetail = {
  value: any | null;
  radioButton: SbbRadioButtonElement | SbbRadioButtonPanelElement;
};

let nextId = 0;

/**
 * It can be used as a container for one or more `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-radio-button` elements to the `sbb-radio-button-group`.
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} didChange - Deprecated. Only used for React. Will probably be removed once React 19 is available. Emits whenever the `sbb-radio-group` value changes.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} change - Emits whenever the `sbb-radio-group` value changes.
 * @event {CustomEvent<SbbRadioButtonGroupEventDetail>} input - Emits whenever the `sbb-radio-group` value changes.
 */
@customElement('sbb-radio-button-group')
@hostAttributes({
  role: 'radiogroup',
})
@slotState()
export class SbbRadioButtonGroupElement extends SbbDisabledMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    change: 'change',
    input: 'input',
  } as const;

  /**
   * Whether the radios can be deselected.
   */
  @property({ attribute: 'allow-empty-selection', type: Boolean })
  public allowEmptySelection: boolean = false;

  /**
   * Whether the radio group is required.
   */
  @property({ type: Boolean }) public required: boolean = false;

  /**
   * The value of the radio group.
   */
  @property()
  public set value(val: any | null) {
    if (!this._didLoad) {
      this._initValue = val;
      return;
    }
    if (!val) {
      this.radioButtons.forEach((r) => (r.checked = false));
      return;
    }
    this.radioButtons.find((r) => r.value === val)?.select();
  }
  public get value(): any | null {
    return this.radioButtons.find((r) => r.checked && !r.disabled)?.value;
  }
  private _initValue: any | null;

  /**
   * Size variant.
   */
  @property() public size: SbbRadioButtonSize = 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom;

  /**
   * Radio group's orientation, either horizontal or vertical.
   */
  @property({ reflect: true })
  public orientation: SbbOrientation = 'horizontal';

  @property()
  public name: string = `sbb-radio-button-group-${++nextId}`;

  /**
   * List of contained radio buttons.
   */
  public get radioButtons(): (SbbRadioButtonElement | SbbRadioButtonPanelElement)[] {
    return (
      Array.from(this.querySelectorAll?.('sbb-radio-button, sbb-radio-button-panel') ?? []) as (
        | SbbRadioButtonElement
        | SbbRadioButtonPanelElement
      )[]
    ).filter((el) => el.closest?.('sbb-radio-button-group') === this);
  }

  private _didLoad = false;
  private _abort = new SbbConnectedAbortController(this);

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroupElement.events.didChange,
  );

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   */
  private _change: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroupElement.events.change,
  );

  /**
   * Emits whenever the `sbb-radio-group` value changes.
   */
  private _input: EventEmitter = new EventEmitter<SbbRadioButtonGroupEventDetail>(
    this,
    SbbRadioButtonGroupElement.events.input,
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener(
      'stateChange',
      (e: CustomEvent<SbbStateChange>) =>
        this._onRadioButtonChange(e as CustomEvent<SbbRadioButtonStateChange>),
      {
        signal,
        passive: true,
      },
    );
    this.toggleAttribute(
      'data-has-panel',
      !!this.querySelector?.('sbb-selection-expansion-panel, sbb-radio-button-panel'),
    );
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
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
    this._didLoad = true;

    if (this._initValue) {
      this.value = this._initValue;
    }
  }

  private _onRadioButtonChange(event: CustomEvent<SbbRadioButtonStateChange>): void {
    event.stopPropagation();

    if (!this._didLoad) {
      return;
    }

    if (event.detail.type === 'checked') {
      const radioButton = event.target as SbbRadioButtonElement;

      // TODO
      if (event.detail.checked) {
        // this.value = radioButton.value;
        this._emitChange(radioButton, this.value);
      } else if (this.allowEmptySelection) {
        // this.value = this.radioButtons.find((radio) => radio.checked)?.value;
        if (!this.value) {
          this._emitChange(radioButton);
        }
      }
    }
  }

  private _emitChange(radioButton: SbbRadioButtonElement, value?: string): void {
    this._change.emit({ value, radioButton });
    this._input.emit({ value, radioButton });
    this._didChange.emit({ value, radioButton });
  }

  private _updateRadiosName(): void {
    this.radioButtons.forEach((r) => (r.name = this.name));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-radio-group">
        <slot @slotchange=${() => this._updateRadiosName()}></slot>
      </div>
      <div class="sbb-radio-group__error">
        <slot name="error"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-group': SbbRadioButtonGroupElement;
  }
}
