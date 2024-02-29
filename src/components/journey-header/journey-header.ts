import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController, SbbNegativeMixin } from '../core/common-behaviors';
import { getDocumentWritingMode } from '../core/dom';
import { i18nConnectionFrom, i18nConnectionRoundtrip, i18nConnectionTo } from '../core/i18n';
import type { SbbTitleLevel } from '../title';
import '../icon';
import '../title';

import style from './journey-header.scss?lit&inline';

export type JourneyHeaderSize = 'm' | 'l';

/**
 * Combined with the `sbb-journey-summary`, it displays the journey's detail.
 */
@customElement('sbb-journey-header')
export class SbbJourneyHeaderElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Origin location for the journey header. */
  @property() public origin!: string;

  /** Destination location for the journey header. */
  @property() public destination!: string;

  /** Whether the journey is a round trip. If so, the icon changes to a round-trip one. */
  @property({ attribute: 'round-trip', type: Boolean }) public roundTrip?: boolean;

  /** Heading level of the journey header element (e.g. h1-h6). */
  @property() public level: SbbTitleLevel = '3';

  /** Journey header size. */
  @property({ reflect: true }) public size?: JourneyHeaderSize = 'm';

  private _language = new LanguageController(this);

  protected override render(): TemplateResult {
    const iconName = this.roundTrip ? 'arrows-long-right-left-small' : 'arrow-long-right-small';

    return html`
      <sbb-title
        level=${this.level ?? nothing}
        ?negative=${this.negative}
        visual-level=${this.size === 'l' ? '4' : '5'}
      >
        <span class="sbb-journey-header" dir=${getDocumentWritingMode()}>
          <span class="sbb-journey-header__origin">
            <span class="sbb-journey-header__connection--visually-hidden">
              ${i18nConnectionFrom[this._language.current]}&nbsp;
            </span>
            ${this.origin}
          </span>
          <sbb-icon name=${iconName}></sbb-icon>
          <span class="sbb-journey-header__destination">
            <span class="sbb-journey-header__connection--visually-hidden">
              &nbsp;${i18nConnectionTo[this._language.current]}&nbsp;
            </span>
            ${this.destination}
            ${this.roundTrip
              ? html` <span class="sbb-journey-header__connection--visually-hidden">
                  ${i18nConnectionRoundtrip(this.origin)[this._language.current]}
                </span>`
              : nothing}
          </span>
        </span>
      </sbb-title>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-journey-header': SbbJourneyHeaderElement;
  }
}
