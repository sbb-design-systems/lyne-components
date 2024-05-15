import {
  LitElement,
  html,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSlotStateController } from '../../core/controllers.js';
import { SbbPanelMixin, SbbUpdateSchedulerMixin } from '../../core/mixins.js';
import { SbbCheckboxCommonElementMixin, commonStyle } from '../common.js';

import '../../screen-reader-only.js';
import '../../visual-checkbox.js';

import checkboxPanelStyle from './checkbox-panel.scss?lit&inline';

/**
 * It displays a checkbox enhanced with selection panel design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-checkbox`.
 * @slot subtext - Slot used to render a subtext under the label (only visible within a selection panel).
 * @slot suffix - Slot used to render additional content after the label (only visible within a selection panel).
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {Event} change - Event fired on change.
 * @event {InputEvent} input - Event fired on input.
 */
@customElement('sbb-checkbox-panel')
export class SbbCheckboxPanelElement extends SbbPanelMixin(
  SbbCheckboxCommonElementMixin(SbbUpdateSchedulerMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [commonStyle, checkboxPanelStyle];

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.toggleAttribute('data-checked', this.checked);

      if (this.isSelectionPanelInput && this.checked !== changedProperties.get('checked')!) {
        this.stateChange.emit({ type: 'checked', checked: this.checked });
      }
    }
    if (changedProperties.has('disabled')) {
      if (this.isSelectionPanelInput && this.disabled !== changedProperties.get('disabled')!) {
        this.stateChange.emit({ type: 'disabled', disabled: this.disabled });
      }
    }
  }

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
              ></sbb-visual-checkbox>
            </span>
            <span class="sbb-checkbox__label">
              <slot></slot>
              <slot name="suffix"></slot>
            </span>
          </span>
          <slot name="subtext"></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox-panel': SbbCheckboxPanelElement;
  }
}
