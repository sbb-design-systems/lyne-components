import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { setAttribute } from '../core/dom';
import type { TitleLevel } from '../title';

import style from './status.scss?lit&inline';

import '../icon';
import '../title';

const statusTypes = new Map([
  ['info', 'circle-information-small'],
  ['success', 'circle-tick-small'],
  ['warning', 'circle-exclamation-point-small'],
  ['error', 'circle-cross-small'],
]);

/**
 * Displays a message to the user's attention.
 *
 * @slot - Use the unnamed slot to add content to the status message.
 * @slot title - Use this to provide a title for the status (optional).
 */
@customElement('sbb-status')
export class SbbStatus extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * The type of the status.
   */
  @property({ reflect: true }) public type?: 'info' | 'success' | 'warning' | 'error' = 'info';

  /**
   * Content of title.
   */
  @property({ reflect: true, attribute: 'title-label' }) public titleLabel?: string;

  /**
   * Level of title, it will be rendered as heading tag (e.g. h3). Defaults to level 3.
   */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '3';

  /**
   * Content of text.
   */
  @property({ reflect: true, attribute: 'text-label' }) public textLabel?: string;

  protected override render(): TemplateResult {
    const hasTitle = !!this.titleLabel;

    setAttribute(this, 'data-has-title', hasTitle);

    return html`
      <div class="sbb-status" type="${this.type}">
        <sbb-icon class="sbb-status__icon" name=${statusTypes.get(this.type)!}></sbb-icon>
        <span class="sbb-status__content">
          ${hasTitle
            ? html`<sbb-title class="sbb-status__title" level=${this.titleLevel} visual-level="5">
                <slot name="title">${this.titleLabel}</slot>
              </sbb-title>`
            : nothing}
          <span class="sbb-status__text">${this.textLabel}</span>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-status': SbbStatus;
  }
}
