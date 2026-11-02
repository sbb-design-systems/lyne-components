import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbElement } from '../../core.ts';

import style from './card.scss?inline';

/**
 * It displays content related to a single subject.
 *
 * @slot - Use the unnamed slot to add content to the card.
 * For specific use cases, `<sbb-card-button>`, `<sbb-card-link>` or `<sbb-card-badge>` elements can be slotted.
 */
export class SbbCardElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-card';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /** Option to set the component's background color. */
  @property({ reflect: true }) public accessor color:
    'white' | 'milk' | 'transparent-bordered' | 'transparent-bordered-dashed' = 'white';

  public override connectedCallback(): void {
    super.connectedCallback();
    this._toggleBadgePresence();
  }

  private _toggleBadgePresence(): void {
    this.toggleState('has-badge', !!this.querySelector?.('sbb-card-badge'));
  }

  protected override render(): TemplateResult {
    return html`<slot @slotchange=${() => this._toggleBadgePresence()}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card': SbbCardElement;
  }
}
