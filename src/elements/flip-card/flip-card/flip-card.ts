import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { SbbLanguageController } from '../../core/controllers.js';
import { i18nFlipCard, i18nReverseCard } from '../../core/i18n.js';
import { SbbHydrationMixin } from '../../core/mixins.js';
import type { SbbFlipCardDetailsElement } from '../flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '../flip-card-summary.js';

import style from './flip-card.scss?lit&inline';

import '../../button/secondary-button.js';

/**
 * Displays an informative card that reveals more informations upon being clicked.
 *
 * @slot summary - Use this slot to provide a sbb-flip-card-summary component.
 * @slot details - Use this slot to provide a sbb-flip-card-details component.
 *
 */
@customElement('sbb-flip-card')
export class SbbFlipCardElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Returns the slotted sbb-flip-card-summary. */
  public get summary(): SbbFlipCardSummaryElement {
    return this.querySelector('sbb-flip-card-summary')!;
  }

  /** Returns the slotted sbb-flip-card-details. */
  public get details(): SbbFlipCardDetailsElement {
    return this.querySelector('sbb-flip-card-details')!;
  }

  /** Whether the card is flipped or not. */
  @state() private _flipped = false;

  private _language = new SbbLanguageController(this);

  /** Toggles the state of the sbb-flip-card. */
  public toggle(): void {
    this._flipped = !this._flipped;
    this.toggleAttribute('data-flipped', this._flipped);
    this.summary.inert = this._flipped;
    this.details.inert = !this._flipped;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card">
        <slot name="summary" @slotchange=${() => (this.summary.inert = this._flipped)}></slot>
        <button
          @click=${() => this.toggle()}
          aria-label=${!this._flipped
            ? i18nFlipCard[this._language.current]
            : i18nReverseCard[this._language.current]}
          aria-expanded=${this._flipped.toString()}
        ></button>
        <slot name="details" @slotchange=${() => (this.details.inert = !this._flipped)}></slot>
        <sbb-secondary-button
          class="sbb-flip-card--toggle-button"
          icon-name=${this._flipped ? 'cross-small' : 'plus-small'}
          @click=${() => this.toggle()}
          size="s"
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
