import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getOverride, slotState } from '../../core/decorators.js';
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
export
@customElement('sbb-radio-button')
@slotState()
class SbbRadioButtonElement extends SbbRadioButtonCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [radioButtonCommonStyle, radioButtonStyle];
  public static readonly events = {
    stateChange: 'stateChange',
    change: 'change',
    input: 'input',
  } as const;

  /** Size variant. */
  @property({ reflect: true })
  @getOverride((i, v) => i.group?.size ?? v)
  public accessor size: SbbRadioButtonSize = 'm';

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
