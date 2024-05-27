import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSlotStateController } from '../../core/controllers.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import {
  SbbRadioButtonCommonElementMixin,
  type SbbRadioButtonStateChange,
  radioButtonCommonStyle,
} from '../common.js';

import radioButtonStyle from './radio-button.scss?lit&inline';

/**
 * It displays a radio button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 */
@customElement('sbb-radio-button')
export class SbbRadioButtonElement extends SbbRadioButtonCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [radioButtonCommonStyle, radioButtonStyle];
  public static readonly events = {
    stateChange: 'stateChange',
  } as const;

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
