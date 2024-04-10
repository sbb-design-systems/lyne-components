import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbSlotStateController } from '../../core/controllers/index.js';
import { setOrRemoveAttribute } from '../../core/dom/index.js';
import { EventEmitter } from '../../core/eventing/index.js';
import {
  SbbRadioButtonCommonElementMixin,
  commonStyle,
  radioButtonStyle,
  type SbbRadioButtonStateChange,
} from '../common/index.js';

export type SbbRadioButtonSize = 's' | 'm';

/**
 * It displays a radio button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 */
@customElement('sbb-radio-button')
export class SbbRadioButtonElement extends SbbRadioButtonCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [commonStyle, radioButtonStyle];
  public static readonly events = {
    stateChange: 'stateChange',
  } as const;

  /**
   * Label size variant, either m or s.
   */
  @property({ reflect: true })
  public set size(value: SbbRadioButtonSize) {
    this._size = value;
  }
  public get size(): SbbRadioButtonSize {
    return this.group?.size ?? this._size;
  }
  private _size: SbbRadioButtonSize = 'm';

  /**
   * @internal
   * Internal event that emits whenever the state of the radio option
   * in relation to the parent selection panel changes.
   */
  private _stateChange: EventEmitter<SbbRadioButtonStateChange> = new EventEmitter(
    this,
    SbbRadioButtonElement.events.stateChange,
    { bubbles: true },
  );

  protected override handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.setAttribute('aria-checked', `${currentValue}`);
      this._stateChange.emit({ type: 'checked', checked: currentValue });
    }
  }

  protected override handleDisabledChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      setOrRemoveAttribute(this, 'aria-disabled', currentValue ? 'true' : null);
      this._stateChange.emit({ type: 'disabled', disabled: currentValue });
    }
  }

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // We need to call requestUpdate to update the reflected attributes
    ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
  }

  protected override render(): TemplateResult {
    return html`
      <label class="sbb-radio-button">
        <input
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?checked=${this.checked}
          value=${this.value || nothing}
          class="sbb-screen-reader-only"
        />
        <span class="sbb-radio-button__label-slot">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button': SbbRadioButtonElement;
  }
}
