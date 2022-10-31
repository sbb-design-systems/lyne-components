import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { InterfaceTimetableRowAttributes, Notice, PtSituation } from './sbb-timetable-row.custom';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nClass, i18nDirection, i18nFromQuay, i18nOccupancy } from '../../global/i18n';
import { durationToTime, isProductIcon, renderIconProduct } from './sbb-timetable-row.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
  private _currentLanguage = getDocumentLang();

  /** The trip Prop */
  @Prop() public trip?: InterfaceTimetableRowAttributes['trip'];

  /** The price Prop, which consists of the data for the badge. */
  @Prop() public price?: InterfaceTimetableRowAttributes['price'];

  /** This will be forwarded as aria-label to the relevant element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated. */
  @Prop() public disableAnimation?: boolean;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @Prop() public loadingTrip?: boolean;

  /** When this prop is true the badge for the price will appear loading. */
  @Prop() public loadingPrice?: boolean;

  /** When this prop is true the sbb-card will be in the active state. */
  @Prop() public active?: boolean;

  /** This click event gets emitted when the user clicks on the component. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-timetable-row_click',
  })
  public sbbClick: EventEmitter<any>;

  @Element() private _element: HTMLElement;

  private _now(): number {
    const dataNow = +this._element.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  /** The skeleton render function for the loading state */
  private _renderSkeleton(): JSX.Element {
    return (
      <button disabled class="sbb-loading">
        <div class="sbb-loading__wrapper">
          {this.price != undefined && <span class="sbb-loading__badge"></span>}
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
        </div>
      </button>
    );
  }

  /**
   * Sorts the Array and sets the items with the highest priority to the top
   * @param items Array with the type of Notice or PtSituation.
   * @returns sorted Array with the type of Notice or PtSituation.
   */
  private _sortPriority(items: Notice[] | PtSituation[]): Notice[] | PtSituation[] {
    items?.sort((a, b) => {
      return parseFloat(b.priority) - parseFloat(a.priority);
    });
    return items;
  }

  private _clickHandler = (): void => {
    this.sbbClick.emit({
      bubbles: true,
    });
  };

  public render(): JSX.Element {
    if (this.loadingTrip) {
      return this._renderSkeleton();
    }

    const { legs, notices, situations, id }: InterfaceTimetableRowAttributes['trip'] =
      this.trip || {};

    const {
      product,
      direction,
      departureWalk,
      departure,
      arrival,
      arrivalWalk,
      tripStatus,
      occupancy,
      duration,
    } = this.trip?.summary || {};
    const sortedNotices = this._sortPriority(notices);
    const sortedSituations = this._sortPriority(situations);

    return (
      <sbb-card
        active={this.active}
        card-id={id}
        accessibility-label={this.accessibilityLabel}
        onClick={this._clickHandler}
      >
        {this.loadingPrice && <span slot="badge" class="sbb-loading__badge"></span>}
        {this.price && !this.loadingPrice && (
          <sbb-card-badge
            slot="badge"
            appearance={this.price.isDiscount ? 'primary' : 'primary-negative'}
            price={this.price.price}
            text={this.price.text}
            isDiscount={this.price.isDiscount}
          />
        )}
        <div class="sbb-timetable__row">
          <div class="sbb-timetable__row-header">
            <div class="sbb-timetable__row-details">
              <sbb-icon name={product?.vehicleMode} />
              {isProductIcon(product?.vehicleSubModeShortName.toLocaleLowerCase()) ? (
                renderIconProduct(product?.vehicleSubModeShortName, product?.line)
              ) : (
                <span class="sbb-timetable__row-transportnumber">
                  {product?.vehicleSubModeShortName + ' ' + product?.line}
                </span>
              )}
            </div>
            <p>{i18nDirection[this._currentLanguage] + ' ' + direction}</p>
          </div>
          <sbb-pearl-chain-time
            legs={legs}
            departureTime={departure?.time}
            arrivalTime={arrival?.time}
            departureWalk={departureWalk}
            arrivalWalk={arrivalWalk}
            disableAnimation={this.disableAnimation}
            data-now={this._now()}
          ></sbb-pearl-chain-time>

          <div class="sbb-timetable__row-footer">
            <span class={tripStatus?.quayChanged ? `sbb-timetable__row-quay--changed` : ''}>
              <span class="sbb-screenreaderonly">{i18nFromQuay.long[this._currentLanguage]}</span>
              <span class="sbb-timetable__row--quay">
                {i18nFromQuay.short[this._currentLanguage]}
              </span>
              {departure?.quayRtName}
            </span>

            {(occupancy?.firstClass || occupancy?.secondClass) && (
              <ul class="sbb-timetable__row-occupancy" role="list">
                <li>
                  {occupancy?.firstClass ? '1.' : ''}
                  <sbb-icon
                    class="sbb-occupancy__item"
                    name={`utilization-` + occupancy?.firstClass}
                  />
                  <span class="sbb-screenreaderonly">{i18nClass.first[this._currentLanguage]}</span>
                  <span class="sbb-screenreaderonly">
                    {i18nOccupancy[occupancy.firstClass.toLowerCase()][this._currentLanguage]}
                  </span>
                </li>
                <li>
                  {occupancy?.secondClass ? '2.' : ''}
                  <sbb-icon
                    class="sbb-occupancy__item"
                    name={`utilization-` + occupancy?.secondClass}
                  />
                  <span class="sbb-screenreaderonly">
                    {i18nClass.second[this._currentLanguage]}
                  </span>
                  <span class="sbb-screenreaderonly">
                    {i18nOccupancy[occupancy.secondClass.toLowerCase()][this._currentLanguage]}
                  </span>
                </li>
              </ul>
            )}
            {sortedNotices?.length > 0 ? (
              <ul class="sbb-timetable__row-hints" role="list">
                {sortedNotices.map((notice, index) =>
                  index < 4 ? (
                    <li>
                      <sbb-icon
                        class="sbb-travel-hints__item"
                        name={'sa-' + notice?.name.toLowerCase()}
                        aria-hidden="false"
                        aria-label={notice?.text}
                      />
                    </li>
                  ) : (
                    ''
                  )
                )}
              </ul>
            ) : (
              ''
            )}
            <time>{durationToTime(duration)}</time>
            {sortedSituations?.length > 0 ? (
              <span class="sbb-timetable__row-warning">
                {sortedSituations.map((situation, index) =>
                  index <= 1 ? (
                    <sbb-icon
                      name={situation.cause?.toLowerCase()}
                      aria-hidden="false"
                      aria-label={situation.broadcastMessages}
                    />
                  ) : (
                    ''
                  )
                )}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </sbb-card>
    );
  }
}
