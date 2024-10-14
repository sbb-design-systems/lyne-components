import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { slotState } from '../../core/decorators.js';
import {
  SbbRadioButtonCommonElementMixin,
  radioButtonCommonStyle,
  type SbbRadioButtonSize,
} from '../common.js';

import radioButtonStyle from './radio-button.scss?lit&inline';

/**
 * It displays a radio button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @event {Event} change - Fired on change.
 * @event {InputEvent} input - Fired on input.
 */
@customElement('sbb-radio-button')
@slotState()
export class SbbRadioButtonElement extends SbbRadioButtonCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [radioButtonCommonStyle, radioButtonStyle];
  public static readonly events = {
    stateChange: 'stateChange',
    change: 'change',
    input: 'input',
  } as const;

  /**
   * Size variant.
   */
  @property({ reflect: true })
  public set size(value: SbbRadioButtonSize) {
    this._size = value;
  }
  public get size(): SbbRadioButtonSize {
    return this.group?.size ?? this._size;
  }
  private _size: SbbRadioButtonSize = 'm';

  protected override render(): TemplateResult {
    return html`
      <label class="sbb-radio-button">
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
