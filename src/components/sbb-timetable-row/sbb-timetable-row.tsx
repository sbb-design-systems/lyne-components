import { Component, h, Prop } from '@stencil/core';
import { InterfaceTimetableRowAttributes, Notice, PtSituation } from './sbb-timetable-row.custom';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nDirection, i18nDeparture, i18nArrival } from '../../global/i18n';
import {
  durationToTime,
  isProductIcon,
  renderIconProduct,
  renderStringProduct,
  walkTimeAfter,
  walkTimeBefore
} from './sbb-timetable-row.helper';
import { format } from 'date-fns-tz';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row'
})
export class SbbTimetableRow {
  private _currentLanguage = getDocumentLang();

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @Prop() public loading = false;

  /** The config Prop */
  @Prop() public config?: InterfaceTimetableRowAttributes['trip'];

  /** This will be forwarded as aria-label to the relevant element. */
  @Prop() public accessibilityLabel: string;

  /** This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated. */
  @Prop() public disableAnimation?: boolean;

  /** The skeleton render function for the loading state */
  private _renderSkeleton(): JSX.Element {
    return (
      <div>
        {/*<sbb-timetable-row-button disabled class="loading" role="presentation">*/}
        <div class="loading">
          <span class="loading__badge"></span>
          <div class="loading__row"></div>
          <div class="loading__row"></div>
          <div class="loading__row"></div>
        </div>
        {/* </sbb-timetable-row-button>*/}
      </div>
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
    if (this.loading) {
      return this._renderSkeleton();
    }

    /* add legs for sbb-pearl-chain */
    const { price, notices, situations, id }: InterfaceTimetableRowAttributes['trip'] =
      this.config || {};

    const {
      product,
      direction,
      departureWalk,
      departure,
      arrival,
      arrivalWalk,
      tripStatus,
      occupancy,
      duration
    } = this.config?.summary || {};

    const badgeClass = price?.length ? 'timetable__row-badge' : '';

    const sortedNotices = this._sortPriority(notices);
    const sortedSituations = this._sortPriority(situations);

    const arrivalTime: string = arrival?.time && format(new Date(arrival?.time), 'H:mm');
    const departureTime: string = departure?.time && format(new Date(departure?.time), 'H:mm');

    return (
      <div id={id} role="presentation" accessibility-label={this.accessibilityLabel}>
        {/*<sbb-timetable-row-button
          id={id}
          role="presentation"
          accessibility-label={this.accessibilityLabel}
        >*/}
        <div class={`timetable__row ${badgeClass}`} role="row">
          {price && (
            <sbb-card-badge>
              <span slot="generic">{price}</span>
            </sbb-card-badge>
          )}

          <div class="timetable__row-header" role="rowheader">
            <div class="timetable__row-details">
              <sbb-icon name={product?.vehicleMode} />
              {isProductIcon(product?.vehicleSubModeShortName.toLocaleLowerCase()) === true
                ? renderIconProduct(product?.vehicleSubModeShortName, product?.line)
                : renderStringProduct(product?.vehicleSubModeShortName, product?.line)}
            </div>
            <p>{i18nDirection[this._currentLanguage] + ' ' + direction}</p>
          </div>

          <div class="timetable__row-body" role="gridcell">
            {departureWalk ? walkTimeBefore(departureWalk) : ''}

            <time class="timetable__row-time" dateTime={departureTime}>
              <span class="screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>
              {departureTime}
            </time>
            <sbb-pearl-chain class="timetable__row-chain" legs=""></sbb-pearl-chain>
            {/*<sbb-pearl-chain
              class="timetable__row-chain"
              legs={legs}
              disable-animation={this.disableAnimation}
              />*/}
            <time class="timetable__row-time" dateTime={arrivalTime}>
              <span class="screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
              {arrivalTime}
            </time>
            {arrivalWalk ? walkTimeAfter(arrivalWalk) : ''}
          </div>

          <div class="timetable__row-footer" role="gridcell">
            <span class={tripStatus?.quayChanged ? `timetable__row-platform--changed` : ''}>
              {arrival?.quayName}
            </span>

            {occupancy?.firstClass || occupancy?.secondClass ? (
              <div>
                <ul class="timetable__row-occupancy" role="list">
                  <li>
                    {occupancy?.firstClass ? '1.' : ''}
                    <sbb-icon
                      class="occupancy__item"
                      name={`utilization-` + occupancy?.firstClass}
                    />
                  </li>
                  <li>
                    {occupancy?.secondClass ? '2.' : ''}
                    <sbb-icon
                      class="occupancy__item"
                      name={`utilization-` + occupancy?.secondClass}
                    />
                  </li>
                </ul>
              </div>
            ) : (
              ''
            )}
            {sortedNotices?.length > 0 ? (
              <ul class="timetable__row-hints" role="list">
                {sortedNotices.map((notice, index) =>
                  index < 4 ? (
                    <li>
                      <sbb-icon
                        class="travel-hints__item"
                        name={notice?.name}
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
              <span class="timetable__row-warning">
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
        {/*</sbb-timetable-row-button>*/}
      </div>
    );
  }
}
