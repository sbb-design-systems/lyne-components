import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { slotState } from '../../core/decorators.js';
import {
  panelCommonStyle,
  SbbPanelMixin,
  type SbbPanelSize,
  SbbUpdateSchedulerMixin,
} from '../../core/mixins.js';
import { radioButtonCommonStyle, SbbRadioButtonCommonElementMixin } from '../common.js';

import '../../screen-reader-only.js';

/**
 /**
 * It displays a radio button enhanced with the panel design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @slot subtext - Slot used to render a subtext under the label.
 * @slot suffix - Slot used to render additional content after the label.
 * @slot badge - Use this slot to provide a `sbb-card-badge` (optional).
 */
@customElement('sbb-radio-button-panel')
@slotState()
export class SbbRadioButtonPanelElement extends SbbPanelMixin(
  SbbRadioButtonCommonElementMixin(SbbUpdateSchedulerMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [radioButtonCommonStyle, panelCommonStyle];

  // FIXME using ...super.events requires: https://github.com/sbb-design-systems/lyne-components/issues/2600
  public static readonly events = {
    stateChange: 'stateChange',
    panelConnected: 'panelConnected',
  } as const;

  /**
   * Size variant.
   */
  @property({ reflect: true })
  public set size(value: SbbPanelSize) {
    this._size = value;
  }
  public get size(): SbbPanelSize {
    return this.group?.size ? (this.group.size === 'xs' ? 's' : this.group.size) : this._size;
  }
  private _size: SbbPanelSize = 'm';

  protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.toggleAttribute('data-checked', this.checked);
    }

    if (changedProperties.has('size')) {
      if (!this.group) {
        this.closest?.('sbb-selection-expansion-panel')?.setAttribute('data-size', this.size);
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <label class="sbb-selection-panel">
        <div class="sbb-selection-panel__badge">
          <slot name="badge"></slot>
        </div>
        <span class="sbb-radio-button">
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
            <slot name="suffix"></slot>
          </span>
          <slot name="subtext"></slot>
          ${this.expansionState
            ? html`<sbb-screen-reader-only>${this.expansionState}</sbb-screen-reader-only>`
            : nothing}
        </span>
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
