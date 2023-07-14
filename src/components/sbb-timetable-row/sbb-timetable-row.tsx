import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { Boarding, HimCus, Price } from './sbb-timetable-row.custom';

import {
  i18nClass,
  i18nDeparture,
  i18nDirection,
  i18nFromPier,
  i18nFromPlatform,
  i18nFromStand,
  i18nMeansOfTransport,
  i18nNew,
  i18nOccupancy,
  i18nTripDuration,
} from '../../global/i18n';
import {
  handleNotices,
  getCus,
  getHimIcon,
  getTransportIcon,
  isProductIcon,
  renderIconProduct,
  renderStringProduct,
  sortSituation,
} from './sbb-timetable-row.helper';
import { ITripItem } from '../../global/interfaces';
import { format } from 'date-fns';
import { removeTimezoneFromISOTimeString, durationToTime } from '../../global/datetime';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { getDepartureArrivalTimeAttribute } from '../../global/timetable';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
  /** The trip Prop */
  @Prop() public trip: ITripItem;

  /** The price Prop, which consists of the data for the badge. */
  @Prop() public price?: Price;

  /** This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated. */
  @Prop({ reflect: true }) public disableAnimation?: boolean;

  /** This will be forwarded to the notices section */
  @Prop() public boarding?: Boarding;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @Prop() public loadingTrip?: boolean;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @Prop() public loadingPrice?: boolean;

  /**
   * Hidden label for the card action. It override the automatically generated accessibility text for the component. Use this prop to provide custom accessibility information for the component.
   */
  @Prop() public cardActionLabel?: string;

  /** This will be forwarded to the sbb-card component as aria-expanded. */
  @Prop() public accessibilityExpanded?: boolean;

  /** When this prop is true the sbb-card will be in the active state. */
  @Prop() public active?: boolean;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  private _now(): number {
    const dataNow = +this._element.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  /** The skeleton render function for the loading state */
  private _renderSkeleton(): JSX.Element {
    return (
      <sbb-card size="l" class="sbb-loading">
        {this.loadingPrice && <sbb-card-badge class="sbb-loading__badge" />}
        <div class="sbb-loading__wrapper">
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
        </div>
      </sbb-card>
    );
  }

  private _getQuayType(vehicleMode: string): any {
    switch (vehicleMode) {
      case 'TRAIN':
        return i18nFromPlatform;
      case 'SHIP':
        return i18nFromPier;
      case 'TRAMWAY':
        return i18nFromStand;
      case 'BUS':
        return i18nFromStand;
      default:
        return undefined;
    }
  }

  private _getQuayTypeStrings(): { long: string; short: string } | null {
    if (!this.trip.summary?.product) return null;
    const quayType = this._getQuayType(this.trip.summary.product?.vehicleMode);
    return {
      long: quayType?.long[this._currentLanguage],
      short: quayType?.short[this._currentLanguage],
    };
  }

  /** map Quay */
  private _renderQuayType(): JSX.Element | undefined {
    if (!this.trip.summary?.product) return undefined;
    const quayTypeStrings = this._getQuayTypeStrings();
    return (
      <span class="sbb-timetable__row--quay">
        <span class="sbb-screenreaderonly">{quayTypeStrings?.long}&nbsp;</span>
        <span aria-hidden="true">{quayTypeStrings?.short}</span>
      </span>
    );
  }

  private _handleHimCus(trip: ITripItem): HimCus | undefined {
    const { situations } = trip || {};
    const sortedSituations = situations && sortSituation(situations);
    const cus = getCus(trip, this._currentLanguage);

    return Object.keys(cus)?.length ? cus : situations?.length && getHimIcon(sortedSituations[0]);
  }

  private _getAccessibilityText(trip: ITripItem): string {
    const { summary, legs } = trip || {};
    const { departureWalk, arrivalWalk, departure, product, direction } = summary || {};

    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      legs,
      departureWalk || 0,
      arrivalWalk || 0,
      this._currentLanguage,
    );

    const departureTime: Date | undefined = departure?.time
      ? removeTimezoneFromISOTimeString(departure.time)
      : undefined;

    const departureWalkText = departureTimeAttribute
      ? `${departureTimeAttribute.text} ${departureTimeAttribute.duration}. `
      : '';

    const departureTimeText = departureTime
      ? `${i18nDeparture[this._currentLanguage]}: ${format(departureTime, 'HH:mm')}. `
      : '';

    const departureQuayChangedText =
      departure?.quayChanged && departure?.quayRtName
        ? `${i18nNew[this._currentLanguage]} ${this._getQuayTypeStrings()
            ?.long} ${departure?.quayRtName}. `
        : '';

    const departureQuayAimedName =
      departure?.quayAimedName && !departure?.quayChanged
        ? `${this._getQuayTypeStrings()?.long} ${departure?.quayAimedName}. `
        : '';

    const meansOfTransportText =
      product && product.vehicleMode
        ? i18nMeansOfTransport[product.vehicleMode.toLowerCase()] &&
          `${i18nMeansOfTransport[product.vehicleMode.toLowerCase()][this._currentLanguage]}. `
        : '';

    const vehicleSubModeText = product?.vehicleSubModeShortName
      ? product.vehicleSubModeShortName + ' ' + product.line + '. '
      : '';

    const directionText = `${i18nDirection[this._currentLanguage]} ${direction}. `;

    const himCusText = trip && (this._handleHimCus(trip)?.text || '');

    return `${departureWalkText} ${departureTimeText} ${departureQuayChangedText} ${departureQuayAimedName} ${meansOfTransportText} ${vehicleSubModeText} ${directionText} ${himCusText}`;
  }

  public render(): JSX.Element {
    if (this.loadingTrip) {
      return this._renderSkeleton();
    }

    const { legs, id, notices, summary } = this.trip || {};

    const {
      product,
      direction,
      departureWalk,
      departure,
      arrival,
      arrivalWalk,
      occupancy,
      duration,
    } = summary || {};

    const himCus = this.trip && this._handleHimCus(this.trip);
    const hasHimCus = !!himCus && !!Object.keys(himCus).length;

    const noticeAttributes = notices && handleNotices(notices);

    const durationObj = durationToTime(duration, this._currentLanguage);
    return (
      <Host role="rowgroup">
        <sbb-card size="l" id={id}>
          <sbb-card-action
            active={this.active}
            aria-expanded={this.accessibilityExpanded?.toString()}
          >
            {this.cardActionLabel ? this.cardActionLabel : this._getAccessibilityText(this.trip)}
          </sbb-card-action>
          {this.loadingPrice && <sbb-card-badge class="sbb-loading__badge" />}
          {this.price && !this.loadingPrice && (
            <sbb-card-badge color={this.price.isDiscount ? 'charcoal' : 'white'}>
              {this.price.isDiscount && <span>%</span>}
              {this.price.text && <span>{this.price.text}</span>}
              {this.price.price && <span>{this.price.price}</span>}
            </sbb-card-badge>
          )}
          <div class="sbb-timetable__row" role="row">
            <div class="sbb-timetable__row-header" role="gridcell">
              <div class="sbb-timetable__row-details">
                {product &&
                  getTransportIcon(
                    product.vehicleMode,
                    product.vehicleSubModeShortName || '',
                    this._currentLanguage,
                  ) && (
                    <span class="sbb-timetable__row-transport-wrapper">
                      <sbb-icon
                        class="sbb-timetable__row-transport-icon"
                        name={
                          'picto:' +
                          getTransportIcon(
                            product.vehicleMode,
                            product.vehicleSubModeShortName || '',
                            this._currentLanguage,
                          )
                        }
                      />
                      <span class="sbb-screenreaderonly">
                        {product &&
                          product.vehicleMode &&
                          i18nMeansOfTransport[product.vehicleMode.toLowerCase()] &&
                          i18nMeansOfTransport[product.vehicleMode.toLowerCase()][
                            this._currentLanguage
                          ]}
                        &nbsp;
                      </span>
                    </span>
                  )}
                {product &&
                  product.vehicleSubModeShortName &&
                  (isProductIcon(product?.vehicleSubModeShortName?.toLocaleLowerCase())
                    ? renderIconProduct(product.vehicleSubModeShortName, product.line)
                    : renderStringProduct(product.vehicleSubModeShortName, product?.line))}
              </div>
              {direction && <p>{`${i18nDirection[this._currentLanguage]} ${direction}`}</p>}
            </div>
            <sbb-pearl-chain-time
              role="gridcell"
              legs={legs}
              departureTime={departure?.time}
              arrivalTime={arrival?.time}
              departureWalk={departureWalk}
              arrivalWalk={arrivalWalk}
              disableAnimation={this.disableAnimation}
              data-now={this._now()}
            ></sbb-pearl-chain-time>
            <div class="sbb-timetable__row-footer" role="gridcell">
              {product && this._getQuayType(product.vehicleMode) && departure?.quayAimedName && (
                <span class={departure?.quayChanged ? `sbb-timetable__row-quay--changed` : ''}>
                  <span class="sbb-screenreaderonly">
                    {`${i18nDeparture[this._currentLanguage]} ${
                      departure?.quayChanged ? i18nNew[this._currentLanguage] : ''
                    }`}
                    &nbsp;
                  </span>
                  {this._renderQuayType()}
                  {departure?.quayChanged ? departure?.quayRtName : departure?.quayAimedName}
                </span>
              )}
              {((occupancy?.firstClass && occupancy?.firstClass !== 'UNKNOWN') ||
                (occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN')) && (
                <ul class="sbb-timetable__row-occupancy" role="list">
                  {occupancy?.firstClass && occupancy.firstClass !== 'UNKNOWN' && (
                    <li>
                      <span aria-hidden="true">1.</span>
                      <sbb-icon
                        class="sbb-occupancy__item"
                        name={`utilization-` + occupancy?.firstClass?.toLowerCase()}
                      />
                      <span class="sbb-screenreaderonly">
                        {i18nOccupancy[occupancy?.firstClass?.toLowerCase()] &&
                          `${i18nClass.first[this._currentLanguage]} ${
                            i18nOccupancy[occupancy?.firstClass?.toLowerCase()][
                              this._currentLanguage
                            ]
                          }.`}
                      </span>
                    </li>
                  )}
                  {occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN' && (
                    <li>
                      <span aria-hidden="true">2.</span>
                      <sbb-icon
                        class="sbb-occupancy__item"
                        name={`utilization-` + occupancy?.secondClass?.toLowerCase()}
                      />
                      <span class="sbb-screenreaderonly">
                        {i18nOccupancy[occupancy?.secondClass?.toLowerCase()] &&
                          `${i18nClass.second[this._currentLanguage]} ${
                            i18nOccupancy[occupancy?.secondClass?.toLowerCase()][
                              this._currentLanguage
                            ]
                          }.`}
                      </span>
                    </li>
                  )}
                </ul>
              )}
              {((noticeAttributes && noticeAttributes.length) || this.boarding) && (
                <ul class="sbb-timetable__row-hints" role="list">
                  {noticeAttributes?.map(
                    (notice, index) =>
                      index < 4 && (
                        <li>
                          <sbb-icon
                            class="sbb-travel-hints__item"
                            name={'sa-' + notice.name?.toLowerCase()}
                          />
                          <span class="sbb-screenreaderonly">{notice.text?.template}</span>
                        </li>
                      ),
                  )}
                  {this.boarding && (
                    <li>
                      <sbb-icon
                        class="sbb-travel-hints__item"
                        name={this.boarding?.name}
                        aria-label={this.boarding?.text}
                        aria-hidden="false"
                      />
                    </li>
                  )}
                </ul>
              )}
              {duration > 0 && (
                <time>
                  <span class="sbb-screenreaderonly">
                    {`${i18nTripDuration[this._currentLanguage]} ${durationObj.long}`}
                  </span>
                  <span aria-hidden="true">{durationObj.short}</span>
                </time>
              )}
              {hasHimCus && (
                <span class="sbb-timetable__row-warning">
                  <sbb-icon name={himCus.name} />
                  <span class="sbb-screenreaderonly">{himCus.text}</span>
                </span>
              )}
            </div>
          </div>
        </sbb-card>
      </Host>
    );
  }
}
