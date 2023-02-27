import { Component, Element, h, JSX, Listen, Prop, State } from '@stencil/core';
import { Boarding, HimCus, Price, Trip } from './sbb-timetable-row.custom';

import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import {
  i18nClass,
  i18nDirection,
  i18nFromPier,
  i18nFromPlatform,
  i18nFromStand,
  i18nOccupancy,
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
import { durationToTime } from '../../global/helpers/date-helper';
@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
  @State() private _currentLanguage = documentLanguage();

  /** The trip Prop */
  @Prop() public trip: Trip;

  /** The price Prop, which consists of the data for the badge. */
  @Prop() public price?: Price;

  /** This will be forwarded as aria-label to the relevant element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated. */
  @Prop() public disableAnimation?: boolean;

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

  /** When this prop is true the sbb-card will be in the active state. */
  @Prop() public active?: boolean;

  @Element() private _element: HTMLElement;

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  private _now(): number {
    const dataNow = +this._element.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  /** The skeleton render function for the loading state */
  private _renderSkeleton(): JSX.Element {
    return (
      <sbb-card size="l" class="sbb-loading">
        {this.loadingPrice && <sbb-card-badge slot="badge" class="sbb-loading__badge" />}
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

  /** map Quay */
  private _renderQuayType(): JSX.Element | undefined {
    if (!this.trip.summary?.product) return undefined;
    return (
      <span class="sbb-timetable__row--quay">
        <span class="sbb-screenreaderonly">
          {this._getQuayType(this.trip.summary.product?.vehicleMode)?.long[this._currentLanguage]}
        </span>
        {this._getQuayType(this.trip.summary.product?.vehicleMode)?.short[this._currentLanguage]}
      </span>
    );
  }

  private _handleHimCus(trip: Trip): HimCus | undefined {
    const situations = trip.situations && sortSituation(trip.situations);
    const cus = getCus(trip);

    return Object.keys(cus)?.length ? cus : situations?.length && getHimIcon(situations[0]);
  }

  public render(): JSX.Element {
    if (this.loadingTrip) {
      return this._renderSkeleton();
    }

    const { legs, id, notices } = this.trip || {};

    const {
      product,
      direction,
      departureWalk,
      departure,
      arrival,
      arrivalWalk,
      occupancy,
      duration,
    } = this.trip?.summary || {};

    const himCus = this.trip && this._handleHimCus(this.trip);
    const hasHimCus = !!himCus && !!Object.keys(himCus).length;

    const noticeAttributes = notices && handleNotices(notices);

    return (
      <sbb-card size="l" active={this.active} id={id} role="rowgroup">
        {this.loadingPrice && <sbb-card-badge slot="badge" class="sbb-loading__badge" />}
        {this.price && !this.loadingPrice && (
          <sbb-card-badge
            slot="badge"
            appearance={this.price.isDiscount ? 'primary' : 'primary-negative'}
            price={this.price.price}
            text={this.price.text}
            isDiscount={this.price.isDiscount}
          />
        )}
        <div class="sbb-timetable__row" role="row">
          <div class="sbb-timetable__row-header" role="gridcell">
            <div class="sbb-timetable__row-details">
              {product && getTransportIcon(product.vehicleMode) && (
                <span class="sbb-timetable__row-transport-wrapper">
                  <sbb-icon
                    class="sbb-timetable__row-transport-icon"
                    name={'picto:' + getTransportIcon(product.vehicleMode)}
                  />
                  <span class="sbb-screenreaderonly">{product.vehicleMode}</span>
                </span>
              )}
              {product &&
                product.vehicleSubModeShortName &&
                (isProductIcon(product?.vehicleSubModeShortName?.toLocaleLowerCase())
                  ? renderIconProduct(product.vehicleSubModeShortName, product.line)
                  : renderStringProduct(product.vehicleSubModeShortName, product?.line))}
            </div>
            {direction && <p>{i18nDirection[this._currentLanguage] + ' ' + direction}</p>}
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
                {this._renderQuayType()}
                {departure?.quayChanged ? departure?.quayRtName : departure?.quayAimedName}
              </span>
            )}
            {((occupancy?.firstClass && occupancy?.firstClass !== 'UNKNOWN') ||
              (occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN')) && (
              <ul class="sbb-timetable__row-occupancy" role="list">
                {occupancy?.firstClass && occupancy.firstClass !== 'UNKNOWN' && (
                  <li>
                    1.
                    <sbb-icon
                      class="sbb-occupancy__item"
                      name={`utilization-` + occupancy?.firstClass?.toLowerCase()}
                    />
                    <span class="sbb-screenreaderonly">
                      {i18nClass.first[this._currentLanguage]}
                    </span>
                    <span class="sbb-screenreaderonly">
                      {i18nOccupancy[occupancy?.firstClass?.toLowerCase()] &&
                        i18nOccupancy[occupancy?.firstClass?.toLowerCase()][this._currentLanguage]}
                    </span>
                  </li>
                )}
                {occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN' && (
                  <li>
                    2.
                    <sbb-icon
                      class="sbb-occupancy__item"
                      name={`utilization-` + occupancy?.secondClass?.toLowerCase()}
                    />
                    <span class="sbb-screenreaderonly">
                      {i18nClass.second[this._currentLanguage]}
                    </span>
                    <span class="sbb-screenreaderonly">
                      {i18nOccupancy[occupancy.secondClass?.toLowerCase()] &&
                        i18nOccupancy[occupancy.secondClass?.toLowerCase()][this._currentLanguage]}
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
                    )
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
            {duration > 0 && <time>{durationToTime(duration)}</time>}
            {hasHimCus && (
              <span class="sbb-timetable__row-warning">
                <sbb-icon name={himCus.name} aria-hidden="false" aria-label={himCus.text} />
              </span>
            )}
          </div>
        </div>
      </sbb-card>
    );
  }
}
