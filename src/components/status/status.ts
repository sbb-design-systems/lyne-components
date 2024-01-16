import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { NamedSlotStateController } from '../core/common-behaviors';
import type { TitleLevel } from '../title';

import style from './status.scss?lit&inline';
import '../icon';
import '../title';

export type SbbStatusType = 'info' | 'success' | 'warning' | 'error';

/**
 * Displays a message to the user's attention.
 *
 * @slot - Use the unnamed slot to add content to the status message.
 * @slot title - Use this to provide a title for the status (optional).
 */
@customElement('sbb-status')
export class SbbStatusElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  private readonly _statusTypes: Map<string, string> = new Map([
    ['info', 'circle-information-small'],
    ['success', 'circle-tick-small'],
    ['warning', 'circle-exclamation-point-small'],
    ['error', 'circle-cross-small'],
  ]);

  /** The type of the status. */
  @property({ reflect: true }) public type: SbbStatusType = 'info';

  /** Content of title. */
  @property({ reflect: true, attribute: 'title-content' }) public titleContent?: string;

  /** Level of title, it will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '3';

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-status">
        <sbb-icon class="sbb-status__icon" name=${this._statusTypes.get(this.type)!}></sbb-icon>
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
