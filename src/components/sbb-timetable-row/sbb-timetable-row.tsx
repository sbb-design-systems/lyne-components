import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceTimetableRowAttributes, Notice, PtSituation } from './sbb-timetable-row.custom';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nClass, i18nDirection, i18nFromPlatform, i18nOccupancy } from '../../global/i18n';
import { durationToTime, isProductIcon, renderIconProduct } from './sbb-timetable-row.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
  private _currentLanguage = getDocumentLang();

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */

  /** The trip Prop */
  @Prop() public trip?: InterfaceTimetableRowAttributes['trip'];

  /** The price Prop,  which consits of the data for the badge*/
  @Prop() public price?: InterfaceTimetableRowAttributes['price'];

  /** This will be forwarded as aria-label to the relevant element. */
  @Prop() public accessibilityLabel: string;

  /** This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated. */
  @Prop() public disableAnimation?: boolean;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @Prop() public loadingTrip?: boolean;

  /** When this prop is true the badge for the price will appear loading*/
  @Prop() public loadingPrice?: boolean;

  /** The skeleton render function for the loading state */
  private _renderSkeleton(): JSX.Element {
    return (
      <sbb-timetable-row-button disabled class="sbb-loading" role="presentation">
        <div class="sbb-loading">
          {this.price != undefined && <span class="sbb-loading__badge"></span>}
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
        </div>
      </sbb-timetable-row-button>
    );
  }

  /**
   * sorts the Array and sets the items with the highest priority to the top
   * @param items Array with the type of Notice or PtSituation.
   * @returns sorted Array with the type of Notice or PtSituation.
   */
  private _sortPriority(items: Notice[] | PtSituation[]): Notice[] | PtSituation[] {
    items?.sort((a, b) => {
      return parseFloat(b.priority) - parseFloat(a.priority);
    });
    return items;
  }

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
    const badgeClass = this.price?.price ? 'sbb-timetable__row-badge' : '';
    const sortedNotices = this._sortPriority(notices);
    const sortedSituations = this._sortPriority(situations);

    return (
      <sbb-timetable-row-button
        id={id}
        role="presentation"
        accessibility-label={this.accessibilityLabel}
      >
        <div class={`sbb-timetable__row ${badgeClass}`} role="row">
          {this.loadingPrice && <span class="sbb-loading__badge"></span>}
          {this.price && !this.loadingPrice && (
            <sbb-card-badge
              appearance={this.price.isDiscount ? 'primary' : 'primary-negative'}
              price={this.price.price}
              text={this.price.text}
              isDiscount={this.price.isDiscount}
            />
          )}

          <div class="sbb-timetable__row-header" role="rowheader">
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
          ></sbb-pearl-chain-time>

          <div class="sbb-timetable__row-footer" role="gridcell">
            <span class={tripStatus?.quayChanged ? `sbb-timetable__row-platform--changed` : ''}>
              <span class="screenreaderonly">{i18nFromPlatform.long[this._currentLanguage]}</span>
              <span class="sbb-timetable__row--platform">
                {i18nFromPlatform.short[this._currentLanguage]}
              </span>
              {departure?.quayRtName}
            </span>

            {(occupancy?.firstClass || occupancy?.secondClass) && (
              <div>
                <ul class="sbb-timetable__row-occupancy" role="list">
                  <li>
                    {occupancy?.firstClass ? '1.' : ''}
                    <sbb-icon
                      class="sbb-occupancy__item"
                      name={`utilization-` + occupancy?.firstClass}
                    />
                    <span class="screenreaderonly">{i18nClass.first[this._currentLanguage]}</span>
                    <span class="screenreaderonly">
                      {i18nOccupancy[occupancy.firstClass.toLowerCase()][this._currentLanguage]}
                    </span>
                  </li>
                  <li>
                    {occupancy?.secondClass ? '2.' : ''}
                    <sbb-icon
                      class="sbb-occupancy__item"
                      name={`utilization-` + occupancy?.secondClass}
                    />
                    <span class="screenreaderonly">{i18nClass.second[this._currentLanguage]}</span>
                    <span class="screenreaderonly">
                      {i18nOccupancy[occupancy.secondClass.toLowerCase()][this._currentLanguage]}
                    </span>
                  </li>
                </ul>
              </div>
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
      </sbb-timetable-row-button>
    );
  }
}
