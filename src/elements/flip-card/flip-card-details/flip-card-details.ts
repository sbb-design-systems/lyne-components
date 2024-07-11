import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y.js';
import { hostAttributes } from '../../core/decorators.js';
import { AgnosticMutationObserver } from '../../core/observers.js';

import style from './flip-card-details.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-flip-card-details')
@hostAttributes({
  slot: 'details',
})
export class SbbFlipCardDetailsElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  private _flipCardMutationObserver = new AgnosticMutationObserver(() =>
    this._checkForSlottedActions(),
  );

  private _checkForSlottedActions(): void {
    const cardFocusableAttributeName = 'data-card-focusable';

    Array.from(this.querySelectorAll?.(IS_FOCUSABLE_QUERY) ?? [])
      .filter((el) => !el.hasAttribute(cardFocusableAttributeName))
      .forEach((el: Element) => el.setAttribute(cardFocusableAttributeName, ''));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._checkForSlottedActions();
    this._flipCardMutationObserver.observe(this, {
      childList: true,
      subtree: true,
    });
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this._checkForSlottedActions();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._flipCardMutationObserver.disconnect();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card-details--wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card-details': SbbFlipCardDetailsElement;
  }
}
