import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { slotState } from '../core/decorators.js';
import { SbbIconNameMixin } from '../icon.js';
import type { SbbTitleElement } from '../title.js';

import style from './status.scss?lit&inline';

import '../title.js';

export type SbbStatusType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'pending'
  | 'incomplete'
  | 'not-started'
  | 'in-progress';

/**
 * Displays a message to the user's attention.
 *
 * @slot - Use the unnamed slot to add content to the status message.
 * @slot title - Use this to provide an `sbb-title` for the status (optional).
 * @slot icon - Use this slot to override the default status icon.
 * @cssprop [--sbb-status-color=var(--sbb-color-iron)] - Specify a custom color,
 * which will override the predefined color for any type.
 * @cssprop [--sbb-status-text-color=var(--sbb-status-color)] - Specify a custom text color,
 * which will override the predefined color for any type. Only valid for a status without a title.
 */
export
@customElement('sbb-status')
@slotState()
class SbbStatusElement extends SbbIconNameMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  private readonly _statusTypes: Map<SbbStatusType, string> = new Map([
    ['info', 'circle-information-small'],
    ['success', 'circle-tick-small'],
    ['warning', 'circle-exclamation-point-small'],
    ['error', 'circle-cross-small'],
    ['pending', 'circle-three-dots-small'],
    ['incomplete', 'circle-dotted-part-x-small'],
    ['not-started', 'circle-dotted-small'],
    ['in-progress', 'circle-dotted-part-small'],
  ]);

  /** The type of the status. */
  @property({ reflect: true }) public accessor type: SbbStatusType = 'info';

  private _configureTitle(): void {
    const title = this.querySelector?.<SbbTitleElement>('sbb-title');
    if (title) {
      customElements.upgrade(title);
      title.visualLevel = '5';
    }
  }

  protected override renderIconSlot(): TemplateResult {
    return html`
      <slot name="icon">
        <sbb-icon name=${this.iconName || this._statusTypes.get(this.type)!}></sbb-icon>
      </slot>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-status">
        <span class="sbb-status__icon"> ${this.renderIconSlot()} </span>
        <span class="sbb-status__content">
          <slot name="title" @slotchange=${this._configureTitle}></slot>
          <p class="sbb-status__content-slot">
            <slot></slot>
          </p>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-status': SbbStatusElement;
  }
}
