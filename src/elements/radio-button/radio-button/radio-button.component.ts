import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getOverride, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
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
 * @overrideType value - string | null
 */
export
@customElement('sbb-radio-button')
@slotState()
class SbbRadioButtonElement<T = string> extends SbbRadioButtonCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [radioButtonCommonStyle, radioButtonStyle];
  public static readonly events = {
    stateChange: 'stateChange',
    change: 'change',
    input: 'input',
  } as const;

  /**
   * Size variant, either xs, s or m.
   * @default 'm' / 'xs' (lean)
   */
  @property({ reflect: true })
  @getOverride((i, v) => i.group?.size ?? v)
  public accessor size: SbbRadioButtonSize = isLean() ? 'xs' : 'm';

  /**
   * The value of the form element
   */
  @property()
  public accessor value: T | null = null;

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
