import { LitElement, html, nothing, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSlotStateController } from '../../core/controllers.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import { SbbPanelMixin, SbbUpdateSchedulerMixin } from '../../core/mixins.js';
import {
  SbbRadioButtonCommonElementMixin,
  radioButtonCommonStyle,
  type SbbRadioButtonStateChange,
} from '../common.js';

import radioButtonPanelStyle from './radio-button-panel.scss?lit&inline';

/**
 /**
 * It displays a radio button enhanced with the selection panel design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @slot subtext - Slot used to render a subtext under the label (only visible within a `sbb-selection-expansion-panel`).
 * @slot suffix - Slot used to render additional content after the label (only visible within a `sbb-selection-expansion-panel`).
 */
@customElement('sbb-radio-button-panel')
export class SbbRadioButtonPanelElement extends SbbPanelMixin(
  SbbRadioButtonCommonElementMixin(SbbUpdateSchedulerMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [radioButtonCommonStyle, radioButtonPanelStyle];
  public static readonly events = {
    stateChange: 'stateChange',
    radioButtonLoaded: 'radioButtonLoaded',
  } as const;

  /**
   * @internal
   * Internal event that emits whenever the state of the radio option
   * in relation to the parent selection panel changes.
   */
  private _stateChange: EventEmitter<SbbRadioButtonStateChange> = new EventEmitter(
    this,
    SbbRadioButtonPanelElement.events.stateChange,
    { bubbles: true },
  );

  /**
   * @internal
   * Internal event that emits when the radio button is loaded.
   */
  private _radioButtonLoaded: EventEmitter<void> = new EventEmitter(
    this,
    SbbRadioButtonPanelElement.events.radioButtonLoaded,
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

    this._radioButtonLoaded.emit();
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
          class="sbb-radio-button__input"
        />
        <span class="sbb-radio-button__label-slot">
          <slot></slot>
          <slot name="suffix"></slot>
        </span>
        <slot name="subtext"></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-panel': SbbRadioButtonPanelElement;
  }
}
