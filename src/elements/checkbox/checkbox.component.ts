import { html, type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbElement } from '../core/base-elements.ts';
import { getOverride } from '../core/decorators.ts';
import { isLean } from '../core/dom.ts';
import type { SbbIconPlacement } from '../core/interfaces.ts';
import { boxSizingStyles } from '../core/styles.ts';
import { SbbIconNameMixin } from '../icon.ts';

import style from './checkbox.scss?inline';
import {
  SbbCheckboxCommonElementMixin,
  checkboxCommonStyle,
  type SbbCheckboxSize,
} from './common/checkbox-common.ts';

import '../visual-checkbox.ts';

/**
 * It displays a checkbox enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-checkbox`.
 * @slot icon - Slot used to render the checkbox icon (disabled inside a selection panel).
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @overrideType value - (T = string) | null
 */
export class SbbCheckboxElement<T = string> extends SbbIconNameMixin(
  SbbCheckboxCommonElementMixin(SbbElement),
) {
  public static override readonly elementName: string = 'sbb-checkbox';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    checkboxCommonStyle,
    unsafeCSS(style),
  ];

  /** Value of the form element. */
  @property()
  public accessor value: T | null = null;

  /**
   * Size variant, either xs, s or m.
   * @default 'm' / 'xs' (lean)
   */
  @property({ reflect: true })
  @getOverride((i, v) => i.group?.size ?? v)
  public accessor size: SbbCheckboxSize = isLean() ? 'xs' : 'm';

  /** The label position relative to the labelIcon. Defaults to end */
  @property({ attribute: 'icon-placement', reflect: true })
  public accessor iconPlacement: SbbIconPlacement = 'end';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-checkbox-wrapper">
        <span class="sbb-checkbox">
          <span class="sbb-checkbox__inner">
            <span class="sbb-checkbox__aligner">
              <sbb-visual-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled || this.formDisabled}
                .size=${this.size}
              ></sbb-visual-checkbox>
            </span>
            <span class="sbb-checkbox__label">
              <slot></slot>
              ${this.renderIconSlot()}
            </span>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox': SbbCheckboxElement;
  }
}
