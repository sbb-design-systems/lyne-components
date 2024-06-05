import { LitElement, html, nothing, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSlotStateController } from '../../core/controllers.js';
import { EventEmitter } from '../../core/eventing.js';
import { SbbPanelMixin, SbbUpdateSchedulerMixin } from '../../core/mixins.js';
import { SbbRadioButtonCommonElementMixin, radioButtonCommonStyle } from '../common.js';

import radioButtonPanelStyle from './radio-button-panel.scss?lit&inline';

/**
 /**
 * It displays a radio button enhanced with the panel design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @slot subtext - Slot used to render a subtext under the label.
 * @slot suffix - Slot used to render additional content after the label.
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
   * Internal event that emits when the radio button is loaded.
   */
  private _radioButtonLoaded: EventEmitter<void> = new EventEmitter(
    this,
    SbbRadioButtonPanelElement.events.radioButtonLoaded,
    { bubbles: true },
  );

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
          class="sbb-screen-reader-only"
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
