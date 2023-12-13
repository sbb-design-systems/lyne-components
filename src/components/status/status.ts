import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { setAttribute } from '../core/dom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
} from '../core/eventing';
import type { TitleLevel } from '../title';

import style from './status.scss?lit&inline';
import '../icon';
import '../title';

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
  @property({ reflect: true }) public type: 'info' | 'success' | 'warning' | 'error' = 'info';

  /** Content of title. */
  @property({ reflect: true, attribute: 'title-content' }) public titleContent?: string;

  /** Level of title, it will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '3';

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('title');

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'data-has-title', this._namedSlots.title || !!this.titleContent);

    return html`
      <div class="sbb-status" type="${this.type}">
        <sbb-icon class="sbb-status__icon" name=${this._statusTypes.get(this.type)!}></sbb-icon>
        <span class="sbb-status__content">
          ${this._namedSlots.title || this.titleContent
            ? html` <sbb-title class="sbb-status__title" level=${this.titleLevel} visual-level="5">
                <slot name="title">${this.titleContent}</slot>
              </sbb-title>`
            : nothing}
          <slot></slot>
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
