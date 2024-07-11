import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../button/secondary-button.js';
import type { SbbFlipCardDetailsElement } from '../flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '../flip-card-summary.js';

import style from './flip-card.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot summary - Use this slot to provide a sbb-flip-card-summary component.
 * @slot details - Use this slot to provide a sbb-flip-card-details component.
 *
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-flip-card')
export class SbbFlipCardElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Whether the card is flipped or not. */
  @state() private _flipped = false;

  /** TODO */
  public toggle(): void {
    this._flipped = !this._flipped;
    this.toggleAttribute('data-flipped', this._flipped);
    this.summary.inert = this._flipped;
    this.details.inert = !this._flipped;
  }

  public get summary(): SbbFlipCardSummaryElement {
    return this.querySelector('sbb-flip-card-summary')!;
  }

  public get details(): SbbFlipCardDetailsElement {
    return this.querySelector('sbb-flip-card-details')!;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.summary.inert = this._flipped;
    this.details.inert = !this._flipped;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card--wrapper">
        <slot name="summary"></slot>
        <button
          @click=${() => this.toggle()}
          aria-label="Click on this card to show more details"
          aria-expanded=${this._flipped.toString()}
        ></button>
        <slot name="details"></slot>
        <sbb-secondary-button
          class="sbb-flip-card--toggle-button"
          icon-name=${this._flipped ? 'cross-small' : 'plus-small'}
          @click=${() => this.toggle()}
        ></sbb-secondary-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card': SbbFlipCardElement;
  }
}
