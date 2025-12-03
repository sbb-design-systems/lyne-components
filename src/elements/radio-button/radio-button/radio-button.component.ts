import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getOverride } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import {
  SbbRadioButtonCommonElementMixin,
  radioButtonCommonStyle,
  type SbbRadioButtonSize,
} from '../common.ts';

import radioButtonStyle from './radio-button.scss?lit&inline';

/**
 * It displays a radio button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-radio-button')
class SbbRadioButtonElement<T = string> extends SbbRadioButtonCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    radioButtonCommonStyle,
    radioButtonStyle,
  ];
  public static readonly events = {
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
      <div class="sbb-radio-button">
        <span class="sbb-radio-button__label-slot">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button': SbbRadioButtonElement;
  }
}
