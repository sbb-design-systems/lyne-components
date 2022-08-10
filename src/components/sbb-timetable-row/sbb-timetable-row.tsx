import { Component, h, Prop, Element } from '@stencil/core';
import { InterfaceTimetableRowAttributes, Notice, PtSituation } from './sbb-timetable-row.custom';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nDirection, i18nDeparture, i18nArrival } from '../../global/i18n';
import {
  durationToTime,
  isProductIcon,
  renderIconProduct,
  renderStringProduct,
  renderTime,
  walkTimeAfter,
  walkTimeBefore,
} from './sbb-timetable-row.helper';

/**
 * @slot badge - Slot used to render the sbb-card-badge component
 * @slot pictogram - Slot used to render the product category
 * @slot transportNumber - Slot used to render the icon for the transportation number
 * - alternative: override with the `transportNumber` Prop
 * @slot direction - Slot used to render the direction text
 * @slot walkTimeBefore - Slot used to render the walk time - renders automaticly the walk-icon next to it - recommandation: use `<time>` tag here
 * @slot walkTimeAfter - Slot used to render the walk time - renders automaticly the walk-icon next to it - recommandation: use `<time>` tag here
 * @slot leftTime - Slot used to render the time for the transportation time - recommandation: use `<time>` tag here
 * @slot rightTime - Slot used to render the departure time - recommandation: use `<time datetime="">` tag here
 * @slot leftTime - Slot used to render the arrival time - recommandation: use `<time datetime="">` tag here
 * @slot pearlChain - Slot used to render the sbb-pearchain-chain component
 * @slot platform - Slot used to render the platform
 * @slot occupancyFirstClass - Slot used to render the icon for the occupancy in the first class
 * @slot occupancySecondClass - Slot used to render the icon for the occupancy in the second class
 * @slot travelHints - Slot used to render the hint icons as a list
 * @slot duration - Slot used to render the duration - recommandation: use `<time>` tag here
 * @slot warning - Slot used to render a warning icon - CUS-HIM Icons
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row.scss',
  tag: 'sbb-timetable-row',
})
export class SbbTimetableRow {
  private _currentLanguage = getDocumentLang();

  @Prop() public loading?: boolean;

  @Prop() public config!: InterfaceTimetableRowAttributes['trip'];

  @Prop() public accessibilityLabel?: string;

  /** Host element */
  @Element() private _hostElement: HTMLElement;
  private _hasBadgeSlot: boolean;
  private _hasWalkTimeBefore: boolean;
  private _hasWalkTimeAfter: boolean;

  public componentWillLoad(): void {
    this._hasBadgeSlot = Boolean(this._hostElement.querySelector('[slot="badge"]'));
    this._hasWalkTimeBefore = Boolean(this._hostElement.querySelector('[slot="walkTimeBefore"]'));
    this._hasWalkTimeAfter = Boolean(this._hostElement.querySelector('[slot="walkTimeAfter"]'));
  }

  private _renderSkeleton(): JSX.Element {
    return (
      //tbd disabled and tab={-1} prop to button
      <sbb-timetable-row-button class="loading" role="presentation">
        <div class="loading">
          <span class="loading__badge"></span>
          <div class="loading__row"></div>
          <div class="loading__row"></div>
          <div class="loading__row"></div>
        </div>
      </sbb-timetable-row-button>
    );
  }

  private _sortPriority(items: Notice[] | PtSituation[]): Notice[] | PtSituation[] {
    items?.sort((a, b) => {
      return parseFloat(b.priority) - parseFloat(a.priority);
    });
    return items;
  }

  public render(): JSX.Element {
    if (this.loading === true) {
      return this._renderSkeleton();
    }

    const badgeClass = this._hasBadgeSlot ? 'timetable__row-badge' : '';

    const {
      price,
      //legs,
      notices,
      situations,
      tripId,
      valid,
    }: InterfaceTimetableRowAttributes['trip'] = this.config;

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
    } = this.config?.summary || {};

    const sortedNotices = this._sortPriority(notices);
    const sortedSituations = this._sortPriority(situations);

    return (
      // use sbb-timetable-row-button as wrapper
      <div id={tripId} role="presentation" accessibility-label={this.accessibilityLabel}>
        <div class={`timetable__row ${badgeClass}`} role="row">
          {valid ? (
            <slot name="badge">
              <sbb-card-badge>
                <span slot="generic">{price}</span>
              </sbb-card-badge>
            </slot>
          ) : (
            ''
          )}
          <div class="timetable__row-header" role="rowheader">
            <div class="timetable__row-details">
              <slot name="pictogram">
                <sbb-icon name={product?.vehicleMode} />
              </slot>
              <slot name="product">
                {isProductIcon(product?.vehicleSubModeShortName.toLocaleLowerCase()) === true
                  ? renderIconProduct(product?.vehicleSubModeShortName, product?.line)
                  : renderStringProduct(product?.vehicleSubModeShortName, product?.line)}
              </slot>
            </div>
            <slot name="direction">
              <p>{i18nDirection[this._currentLanguage] + ' ' + direction}</p>
            </slot>
          </div>

          <div class="timetable__row-body" role="gridcell">
            {this._hasWalkTimeBefore || departureWalk ? walkTimeBefore(departureWalk) : ''}

            <slot name="leftTime">
              <time class="timetable__row-time" dateTime={'' + departure?.time}>
                <span class="screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>

                {renderTime(departure?.time)}
              </time>
            </slot>
            <slot name="pearlChain">
              {/* <sbb-pearl-chain class="timetable__row-chain" legs={legs} /> */}
            </slot>
            <slot name="rightTime">
              <time class="timetable__row-time" dateTime={'' + arrival?.time}>
                <span class="screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
                {renderTime(arrival?.time)}
              </time>
            </slot>
            {this._hasWalkTimeAfter || arrivalWalk ? walkTimeAfter(arrivalWalk) : ''}
          </div>

          <div class="timetable__row-footer" role="gridcell">
            <slot name="platform">
              <span class={tripStatus?.quayChanged ? `timetable__row-platform--changed` : ''}>
                {arrival?.quayName}
              </span>
            </slot>

            {occupancy?.firstClass || occupancy?.secondClass ? (
              <div>
                <ul class="timetable__row-occupancy" role="list">
                  <li>
                    {occupancy?.firstClass ? '1.' : ''}
                    <slot name="occupancyFirstClass">
                      <sbb-icon
                        class="occupancy__item"
                        name={`utilization-` + occupancy?.firstClass}
                      />
                    </slot>
                  </li>
                  <li>
                    {occupancy?.secondClass ? '2.' : ''}
                    <slot name="occupancySecondClass">
                      <sbb-icon
                        class="occupancy__item"
                        name={`utilization-` + occupancy?.secondClass}
                      />
                    </slot>
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
            <slot name="travelHints"></slot>
            <slot name="duration">
              <time class="">{durationToTime(duration)}</time>
            </slot>
            <slot name="warning">
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
            </slot>
          </div>
        </div>
      </div>
    );
  }
}
