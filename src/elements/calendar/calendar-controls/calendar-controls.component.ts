import { type CSSResultGroup, html, nothing, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { SbbElement } from '../../core/base-elements/element.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import '../../button.ts';

import style from './calendar-controls.scss?lit&inline';

export interface SbbCalendarControls {
  prevButtonFn: () => void;
  nextButtonFn: () => void;
  prevButtonDisabled: boolean;
  prevButtonAriaLabel: string;
  nextButtonDisabled: boolean;
  nextButtonAriaLabel: string;
}

/**
 * It displays the controls in the `sbb-calendar` component.
 */
export class SbbCalendarControlsElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-calendar-controls';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  @state()
  public set controls(value: SbbCalendarControls | null) {
    this._controls = value;
  }
  public get controls(): SbbCalendarControls | null {
    return this._controls;
  }
  private _controls: SbbCalendarControls | null = null;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-calendar__controls">
        <sbb-secondary-button
          size="m"
          icon-name="chevron-small-left-small"
          aria-label=${this._controls?.prevButtonAriaLabel || nothing}
          @click=${this._controls?.prevButtonFn}
          ?disabled=${this._controls?.prevButtonDisabled}
          id="sbb-calendar__controls-previous"
        ></sbb-secondary-button>
        <div class="sbb-calendar__controls-month">
          <slot></slot>
        </div>
        <sbb-secondary-button
          size="m"
          icon-name="chevron-small-right-small"
          aria-label=${this._controls?.nextButtonAriaLabel || nothing}
          @click=${this._controls?.nextButtonFn}
          ?disabled=${this._controls?.nextButtonDisabled}
          id="sbb-calendar__controls-next"
        ></sbb-secondary-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-controls': SbbCalendarControlsElement;
  }
}
