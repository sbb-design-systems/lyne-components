import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { slotState } from '../core/decorators.js';
import { SbbIconNameMixin } from '../icon.js';
import type { SbbTitleLevel } from '../title.js';

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
 * @slot title - Use this to provide a title for the status (optional).
 * @slot icon - Use this slot to override the default status icon.
 */
@customElement('sbb-status')
@slotState()
export class SbbStatusElement extends SbbIconNameMixin(LitElement) {
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
  @property({ reflect: true }) public type: SbbStatusType = 'info';

  /** Content of title. */
  @property({ reflect: true, attribute: 'title-content' }) public titleContent?: string;

  /** Level of title, it will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public titleLevel: SbbTitleLevel = '3';

  protected override renderIconSlot(): TemplateResult {
    return html`
      <slot name="icon">
        <sbb-icon name=${this.iconName ?? this._statusTypes.get(this.type)!}></sbb-icon>
      </slot>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-status">
        <span class="sbb-status__icon"> ${this.renderIconSlot()} </span>
        <span class="sbb-status__content">
          <sbb-title class="sbb-status__title" level=${this.titleLevel} visual-level="5">
            <slot name="title">${this.titleContent}</slot>
          </sbb-title>
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
