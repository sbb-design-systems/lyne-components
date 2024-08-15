import { type CSSResultGroup, html, isServer, LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y/focus.js';
import { SbbConnectedAbortController, SbbLanguageController } from '../../core/controllers.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nFlipCard, i18nReverseCard } from '../../core/i18n.js';
import { SbbHydrationMixin } from '../../core/mixins.js';
import type { SbbFlipCardDetailsElement } from '../flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '../flip-card-summary.js';

import style from './flip-card.scss?lit&inline';

import '../../button/secondary-button-static.js';
import '../../screen-reader-only/screen-reader-only.js';

/**
 * Displays an informative card that reveals more information upon being clicked.
 *
 * @slot - Use the unnamed slot to add a `sbb-flip-card-summary` and a `sbb-flip-card-details` element.
 * @event {CustomEvent<void>} flip - Emits when the flip card flips.
 *
 */
@customElement('sbb-flip-card')
export class SbbFlipCardElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    flip: 'flip',
  } as const;

  /**
   * This will be forwarded as aria-label to the action in the non flipped state.
   * If not set, the textContent of the `sbb-flip-card-summary` is taken.
   */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /** Emits whenever the component is flipped. */
  protected flip: EventEmitter = new EventEmitter(this, SbbFlipCardElement.events.flip);

  /** Returns the slotted sbb-flip-card-summary. */
  public get summary(): SbbFlipCardSummaryElement | null {
    return this.querySelector?.('sbb-flip-card-summary');
  }

  /** Returns the slotted sbb-flip-card-details. */
  public get details(): SbbFlipCardDetailsElement | null {
    return this.querySelector?.('sbb-flip-card-details');
  }

  /** Whether the flip card is flipped. */
  public get isFlipped(): boolean {
    return this._flipped;
  }

  /** Whether the card is flipped or not. */
  @state() private _flipped = false;

  private _abort = new SbbConnectedAbortController(this);
  private _language = new SbbLanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      'click',
      (event: Event) => {
        if (
          event.target === this ||
          !(event.target as HTMLElement)?.matches?.(IS_FOCUSABLE_QUERY)
        ) {
          this.toggle();
        }
      },
      { signal: this._abort.signal },
    );
  }

  /** Toggles the state of the sbb-flip-card. */
  public toggle(): void {
    this._flipped = !this._flipped;
    this.toggleAttribute('data-flipped', this._flipped);
    this.summary!.inert = this._flipped;
    this.details!.inert = !this._flipped;
    this.flip.emit();
  }

  private async _accessibilityLabel(): Promise<string> {
    if (isServer) {
      return '';
    }
    await this.hydrationComplete;

    return !this._flipped
      ? `${(this.accessibilityLabel ? this.accessibilityLabel : this.summary?.textContent?.trim()) ?? ''}, ${i18nFlipCard[this._language.current]}`
      : i18nReverseCard[this._language.current];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card">
        <button class="sbb-flip-card-button" aria-expanded=${this._flipped.toString()}>
          <sbb-screen-reader-only>${until(this._accessibilityLabel(), '')}</sbb-screen-reader-only>
        </button>
        <slot name="summary" @slotchange=${() => (this.summary!.inert = this._flipped)}></slot>
        <slot name="details" @slotchange=${() => (this.details!.inert = !this._flipped)}></slot>
        <sbb-secondary-button-static
          class="sbb-flip-card--toggle-button"
          icon-name=${this._flipped ? 'cross-small' : 'plus-small'}
          size="s"
        ></sbb-secondary-button-static>
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
