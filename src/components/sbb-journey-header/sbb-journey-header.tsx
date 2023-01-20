import { Component, h, JSX, Listen, Prop, State } from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { i18nConnectionFrom, i18nConnectionRoundtrip, i18nConnectionTo } from '../../global/i18n';
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

  /**
   * Journey header markup: depending on the context where it will be used,
   * it is important to pick the correct markup element to match the correct semantics.
   */
  @Prop() public level?: InterfaceJourneyHeaderAttributes['level'] = '3';

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  /** Journey header size. */
  @Prop({ reflect: true }) public size?: InterfaceJourneyHeaderAttributes['size'] = 'm';

  @State() private _currentLanguage = documentLanguage();

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  public render(): JSX.Element {
    const iconName = this.roundTrip ? 'arrows-left-right-small' : 'arrow-long-right-small';

    return (
      <sbb-title level={this.level} negative={this.negative}>
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
