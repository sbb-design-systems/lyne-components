import type { PropertyValues, TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  SbbSlotStateController
} from '../../core/controllers/index.js';
import { setOrRemoveAttribute } from '../../core/dom/index.js';
import {
  EventEmitter
} from '../../core/eventing/index.js';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces/index.js';

import { SbbRadioButtonCommonElementMixin } from '../common';

export type SbbRadioButtonStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

export type SbbRadioButtonSize = 's' | 'm';

/**
 * It displays a radio button enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 */

@customElement('sbb-radio-button')
export class SbbRadioButtonElement extends SbbRadioButtonCommonElementMixin(LitElement) {
  public static readonly events = {
    stateChange: 'stateChange',
  } as const;

  /**
   * @internal
   * Internal event that emits whenever the state of the radio option
   * in relation to the parent selection panel changes.
   */
  protected stateChange: EventEmitter<SbbRadioButtonStateChange> = new EventEmitter(
    this,
    SbbRadioButtonElement.events.stateChange,
    { bubbles: true },
  );

  protected handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.setAttribute('aria-checked', `${currentValue}`);
      this.stateChange.emit({ type: 'checked', checked: currentValue });
    }
  }

  protected handleDisabledChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      setOrRemoveAttribute(this, 'aria-disabled', currentValue ? 'true' : null);
      this.stateChange.emit({ type: 'disabled', disabled: currentValue });
    }
  }

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // We need to call requestUpdate to update the reflected attributes
    ['disabled', 'required', 'size'].forEach((p) => this.requestUpdate(p));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('checked')) {
      this.handleCheckedChange(this.checked, changedProperties.get('checked')!);
    }
    if (changedProperties.has('disabled')) {
      this.handleDisabledChange(this.disabled, changedProperties.get('disabled')!);
    }
    if (changedProperties.has('required')) {
      this.setAttribute('aria-required', `${this.required}`);
    }
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
