import { i18nConnectionFrom, i18nConnectionRoundtrip, i18nConnectionTo } from '../core/i18n';
import { TitleLevel } from '../title';
import { getDocumentWritingMode } from '../core/dom';
import { documentLanguage, HandlerRepository, languageChangeHandlerAspect } from '../core/eventing';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './journey-header.scss?lit&inline';
import '../title';
import '../icon';

export type JourneyHeaderSize = 'm' | 'l';

/**
 * Combined with the `sbb-journey-summary`, it displays the journey's detail.
 */
@customElement('sbb-journey-header')
export class SbbJourneyHeader extends LitElement {
  public static override styles: CSSResult = style;

  /** Origin location for the journey header. */
  @property() public origin!: string;

  /** Destination location for the journey header. */
  @property() public destination!: string;

  /** Whether the journey is a round trip. If so, the icon changes to a round-trip one. */
  @property({ attribute: 'round-trip', type: Boolean }) public roundTrip?: boolean;

  /** Heading level of the journey header element (e.g. h1-h6). */
  @property() public level?: TitleLevel = '3';

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /** Journey header size. */
  @property({ reflect: true }) public size?: JourneyHeaderSize = 'm';

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
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
              ${i18nConnectionFrom[this._currentLanguage]}
            </span>
            ${this.origin}
          </span>
          <sbb-icon name=${iconName}></sbb-icon>
          <span class="sbb-journey-header__destination">
            <span class="sbb-journey-header__connection--visually-hidden">
              ${i18nConnectionTo[this._currentLanguage]}
            </span>
            ${this.destination}
            ${this.roundTrip
              ? html` <span class="sbb-journey-header__connection--visually-hidden">
                  ${i18nConnectionRoundtrip(this.origin)[this._currentLanguage]}
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
    'sbb-journey-header': SbbJourneyHeader;
  }
}
