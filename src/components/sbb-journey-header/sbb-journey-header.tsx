import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { i18nConnectionFrom, i18nConnectionRoundtrip, i18nConnectionTo } from '../../global/i18n';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import { InterfaceJourneyHeaderAttributes } from './sbb-journey-header.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-journey-header.scss',
  tag: 'sbb-journey-header',
})
export class SbbJourneyHeader {
  /** Origin location for the journey header. */
  @Prop() public origin!: string;

  /** Destination location for the journey header. */
  @Prop() public destination!: string;

  /** Whether the journey is a round trip. If so, the icon changes to a round-trip one. */
  @Prop() public roundTrip?: boolean;

  /** Heading level of the journey header element (e.g. h1-h6). */
  @Prop() public level?: InterfaceTitleAttributes['level'] = '3';

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  /** Journey header size. */
  @Prop({ reflect: true }) public size?: InterfaceJourneyHeaderAttributes['size'] = 'm';

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l))
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const iconName = this.roundTrip ? 'arrows-long-right-left-small' : 'arrow-long-right-small';

    return (
      <sbb-title
        level={this.level}
        negative={this.negative}
        visual-level={this.size === 'l' ? '4' : '5'}
      >
        <span class="sbb-journey-header" dir={getDocumentWritingMode()}>
          <span class="sbb-journey-header__origin">
            <span class="sbb-journey-header__connection--visually-hidden">
              {i18nConnectionFrom[this._currentLanguage]}
            </span>
            {this.origin}
          </span>
          <sbb-icon name={iconName} />
          <span class="sbb-journey-header__destination">
            <span class="sbb-journey-header__connection--visually-hidden">
              {i18nConnectionTo[this._currentLanguage]}
            </span>
            {this.destination}
            {this.roundTrip && (
              <span class="sbb-journey-header__connection--visually-hidden">
                {i18nConnectionRoundtrip(this.origin)[this._currentLanguage]}
              </span>
            )}
          </span>
        </span>
      </sbb-title>
    );
  }
}
