import {
  i18nArrival,
  i18nClass,
  i18nDeparture,
  i18nDirection,
  i18nFromPier,
  i18nFromPlatform,
  i18nFromStand,
  i18nMeansOfTransport,
  i18nNew,
  i18nOccupancy,
  i18nRealTimeInfo,
  i18nSupersaver,
  i18nTransferProcedures,
  i18nTravelhints,
  i18nTripDuration,
  i18nTripQuayChange,
} from '../core/i18n';
import { format } from 'date-fns';
import { removeTimezoneFromISOTimeString, durationToTime } from '../core/datetime';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../core/eventing';
import {
  getDepartureArrivalTimeAttribute,
  isRideLeg,
  ITripItem,
  Notice,
  PtRideLeg,
  PtSituation,
  VehicleModeEnum,
} from '../core/timetable';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { setAttribute } from '../core/dom';
import style from './sbb-timetable-row.scss?lit&inline';
import '../sbb-card';
import '../sbb-card-badge';
import '../sbb-card-action';
import '../sbb-icon';
import '../sbb-pearl-chain-time';

/** HimCus interface for mapped icon name and text */
export interface HimCus {
  name: string;
  text: string;
}

/** Boarding icon interface for mapped icon name and text */
export interface Boarding {
  name: string;
  text: string;
}

export interface Price {
  price?: string;
  text?: string;
  isDiscount?: boolean;
}

export const getTransportIcon = (
  vehicleMode: VehicleModeEnum,
  vehicleSubMode: string,
  language: string,
): string => {
  // As there are no English pictograms, we fall back to German
  const normalizedLanguage = language.replace('en', 'de');

  if (vehicleMode === 'BUS') {
    return 'bus-right';
  } else if (vehicleMode === 'CABLEWAY') {
    return 'funicular-railway-right';
  } else if (vehicleMode === 'CHAIRLIFT') {
    return 'chair-lift-right';
  } else if (vehicleMode === 'COG_RAILWAY') {
    return 'cog-railway-right';
  } else if (vehicleMode === 'GONDOLA' && vehicleSubMode === 'PB') {
    return 'cableway-right';
  } else if (vehicleMode === 'GONDOLA') {
    return 'gondola-lift-right';
  } else if (vehicleMode === 'METRO') {
    return `metro-right-${normalizedLanguage}`;
  } else if (vehicleMode === 'PLANE') {
    return 'aeroplane-right';
  } else if (vehicleMode === 'SHIP') {
    return 'jetty-right';
  } else if (vehicleMode === 'TAXI') {
    return 'taxi-right';
  } else if (vehicleMode === 'TRAIN') {
    return 'train-right';
  } else if (vehicleMode === 'TRAMWAY') {
    return 'tram-right';
  } else if (vehicleMode === 'ELEVATOR') {
    return 'lift';
  } else {
    return '';
  }
};

export const isProductIcon = (transport: string): boolean => {
  const possibleTransportTypes = [
    'bex',
    'cnl',
    'ec',
    'en',
    'gex',
    'ic',
    'ice',
    'icn',
    'ir',
    'nj',
    'ogv',
    'pe',
    're',
    'rj',
    'rjx',
    'rx',
    'sn',
    'rgv',
    'vae',
    'tgv',
  ];

  return possibleTransportTypes.includes(transport);
};

export const renderIconProduct = (transport: string, line?: string | null): TemplateResult => {
  const dashLine = line ? '-' + line : '';

  return html`<span class="sbb-timetable__row-transport">
    <sbb-icon name=${transport.toLowerCase() + dashLine}></sbb-icon>
    <span class="sbb-screenreaderonly"> ${transport.toLowerCase() + dashLine}</span>
  </span>`;
};

export const renderStringProduct = (vehicleName: string, line?: string | null): TemplateResult => {
  const space = ['M', 'B', 'T'].includes(vehicleName) ? ' ' : '';
  return html`<span class="sbb-timetable__row-transportnumber">
    ${line !== null ? vehicleName + space + line : vehicleName}
  </span>`;
};

const getReachableText = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => leg.serviceJourney?.serviceAlteration?.reachableText)?.serviceJourney
    ?.serviceAlteration?.reachableText;
};

const getDelayText = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => leg.serviceJourney?.serviceAlteration?.delayText)?.serviceJourney
    ?.serviceAlteration?.delayText;
};

const getRedirectedText = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => !!leg.serviceJourney?.serviceAlteration?.redirectedText)
    ?.serviceJourney?.serviceAlteration?.redirectedText;
};

const getUnplannedStop = (legs: PtRideLeg[]): string => {
  return legs?.find((leg) => !!leg.serviceJourney?.serviceAlteration?.unplannedStopPointsText)
    ?.serviceJourney?.serviceAlteration?.unplannedStopPointsText;
};

export const sortSituation = (situations: PtSituation[]): PtSituation[] => {
  const priorities = {
    DISTURBANCE: 0,
    INFORMATION: 1,
    DELAY: 2,
    TRAIN_REPLACEMENT_BY_BUS: 3,
    CONSTRUCTION_SITE: 4,
    END_MESSAGE: 5,
  };

  return [...situations]?.sort(
    (a: PtSituation, b: PtSituation) => priorities[a.cause] - priorities[b.cause],
  );
};

export const getHimIcon = (situation: PtSituation): HimCus => {
  switch (situation?.cause) {
    case 'DISTURBANCE':
      return {
        name: 'disruption',
        text: situation?.broadcastMessages?.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'INFORMATION':
      return {
        name: 'info',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'DELAY':
      return {
        name: 'delay',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'TRAIN_REPLACEMENT_BY_BUS':
      return {
        name: 'replacementbus',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    case 'CONSTRUCTION_SITE':
      return {
        name: 'construction',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
    default:
      return {
        name: 'info',
        text: situation?.broadcastMessages.length ? situation?.broadcastMessages[0].title : '',
      };
  }
};

export const getCus = (trip: ITripItem, currentLanguage: string): HimCus => {
  const { summary, legs } = trip || {};
  const rideLegs = legs?.filter((leg) => isRideLeg(leg)) as PtRideLeg[];
  const { tripStatus } = summary || {};

  if (tripStatus?.cancelled || tripStatus?.partiallyCancelled)
    return { name: 'cancellation', text: tripStatus?.cancelledText };
  if (getReachableText(rideLegs))
    return { name: 'missed-connection', text: getReachableText(rideLegs) };
  if (tripStatus?.alternative) return { name: 'alternative', text: tripStatus.alternativeText };
  if (getRedirectedText(rideLegs)) return { name: 'reroute', text: getRedirectedText(rideLegs) };
  if (getUnplannedStop(rideLegs)) return { name: 'add-stop', text: getUnplannedStop(rideLegs) };
  if (tripStatus?.delayed || tripStatus?.delayedUnknown)
    return { name: 'delay', text: getDelayText(rideLegs) };
  if (tripStatus?.quayChanged) {
    const departure = rideLegs[0].departure;
    return {
      name: 'platform-change',
      text: departure.quayChanged ? departure.quayChangedText : i18nTripQuayChange[currentLanguage],
    };
  }

  return {} as HimCus;
};

const findAndReplaceNotice = (notices: Notice[]): Notice | undefined => {
  const reservationNotice = ['RR', 'RK', 'RC', 'RL', 'RM', 'RS', 'RU', 'XP', 'XR', 'XT'];

  return notices.reduce((foundNotice, notice) => {
    if (foundNotice) return foundNotice;
    if (reservationNotice.includes(notice.name)) {
      return { ...notice, name: 'RR' } as Notice;
    }
  }, undefined);
};

export const filterNotices = (notices: Notice[]): Notice[] => {
  const allowedNames = ['Z', 'SB', 'SZ', 'VR', 'TG'];

  const filterNotice = notices.filter((notice, index) => {
    return notices.findIndex((n) => n.name === notice.name) === index;
  });

  return filterNotice
    .filter((notice) => allowedNames.includes(notice.name))
    .sort((a, b) => allowedNames.indexOf(a.name) - allowedNames.indexOf(b.name));
};

export const handleNotices = (notices: Notice[]): Notice[] => {
  const reservationNotice = findAndReplaceNotice(notices);
  const filteredNotices = filterNotices(notices);

  if (reservationNotice === undefined) return filteredNotices;
  if (!filteredNotices.length) return [reservationNotice];

  if (filteredNotices[0].name === 'Z' && filteredNotices[1]) {
    return [filteredNotices[0], reservationNotice, filteredNotices[1]].concat(
      filteredNotices.slice(2),
    );
  }

  return [reservationNotice, ...filteredNotices];
};

@customElement('sbb-timetable-row')
export class SbbTimetableRow extends LitElement {
  public static override styles: CSSResult = style;

  /** The trip Prop. */
  @property({ type: Object }) public trip: ITripItem;

  /** The price Prop, which consists of the data for the badge. */
  @property({ type: Object }) public price?: Price;

  /** This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation?: boolean;

  /** This will be forwarded to the notices section */
  @property({ type: Object }) public boarding?: Boarding;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @property({ attribute: 'loading-trip', type: Boolean }) public loadingTrip?: boolean;

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @property({ attribute: 'loading-price', type: Boolean }) public loadingPrice?: boolean;

  /**
   * Hidden label for the card action. It overrides the automatically generated accessibility text for the component. Use this prop to provide custom accessibility information for the component.
   */
  @property({ attribute: 'card-action-label' }) public cardActionLabel?: string;

  /** This will be forwarded to the sbb-card component as aria-expanded. */
  @property({ attribute: 'accessibility-expanded', type: Boolean })
  public accessibilityExpanded?: boolean;

  /** When this prop is true the sbb-card will be in the active state. */
  @property({ type: Boolean }) public active?: boolean;

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

  private _now(): number {
    const dataNow = +this.dataset?.now;
    return isNaN(dataNow) ? Date.now() : dataNow;
  }

  /** The skeleton render function for the loading state */
  private _renderSkeleton(): TemplateResult {
    return html`
      <sbb-card size="l" class="sbb-loading">
        ${this.loadingPrice
          ? html`<sbb-card-badge class="sbb-loading__badge"></sbb-card-badge>`
          : nothing}
        <div class="sbb-loading__wrapper">
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
          <div class="sbb-loading__row"></div>
        </div>
      </sbb-card>
    `;
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
  private _renderQuayType(): TemplateResult | undefined {
    if (!this.trip.summary?.product) return undefined;
    const quayTypeStrings = this._getQuayTypeStrings();
    return html`
      <span class="sbb-timetable__row--quay">
        <span class="sbb-screenreaderonly">${quayTypeStrings?.long}&nbsp;</span>
        <span class="sbb-timetable__row--quay-type" aria-hidden="true"
          >${quayTypeStrings?.short}</span
        >
      </span>
    `;
  }

  private _handleHimCus(trip: ITripItem): { cus: HimCus | null; him: HimCus | null } {
    const { situations } = trip || {};
    const sortedSituations = situations && sortSituation(situations);
    const cus = getCus(trip, this._currentLanguage);

    return {
      cus: Object.keys(cus)?.length ? cus : null,
      him: situations?.length ? getHimIcon(sortedSituations[0]) : null,
    };
  }

  private _getAccessibilityText(trip: ITripItem): string {
    const { summary, legs, notices } = trip || {};
    const {
      departureWalk,
      arrivalWalk,
      departure,
      arrival,
      product,
      direction,
      occupancy,
      duration,
    } = summary || {};

    const { departureTimeAttribute, arrivalTimeAttribute } = getDepartureArrivalTimeAttribute(
      legs,
      departureWalk || 0,
      arrivalWalk || 0,
      this._currentLanguage,
    );

    const departureTime: Date | undefined = departure?.time
      ? removeTimezoneFromISOTimeString(departure.time)
      : undefined;

    const arrivalTime: Date | undefined = arrival?.time
      ? removeTimezoneFromISOTimeString(arrival.time)
      : undefined;

    const departureWalkText = departureTimeAttribute
      ? `${departureTimeAttribute.text} ${departureTimeAttribute.duration}, `
      : '';

    const arrivalWalkText = arrivalTimeAttribute
      ? `${arrivalTimeAttribute.text} ${arrivalTimeAttribute.duration}, `
      : '';

    const departureTimeText = departureTime
      ? `${i18nDeparture[this._currentLanguage]}: ${format(departureTime, 'HH:mm')}, `
      : '';

    const getDepartureQuayText = (): string => {
      if (!departure?.quayFormatted) {
        return '';
      }

      // add prefix "new" if quay was changed
      const changedQuayPrefix = departure?.quayChanged ? `${i18nNew[this._currentLanguage]} ` : '';
      return `${changedQuayPrefix}${this._getQuayTypeStrings()
        ?.long} ${departure?.quayFormatted}, `;
    };

    const meansOfTransportText =
      product && product.vehicleMode
        ? i18nMeansOfTransport[product.vehicleMode.toLowerCase()] &&
          `${i18nMeansOfTransport[product.vehicleMode.toLowerCase()][this._currentLanguage]}, `
        : '';

    const vehicleSubModeText = product?.vehicleSubModeShortName
      ? `${product.vehicleSubModeShortName} ${product.line || ''}, `
      : '';

    const directionText = `${i18nDirection[this._currentLanguage]} ${direction}, `;

    const himCus = this._handleHimCus(trip);
    const cusText = himCus?.cus?.text
      ? `${i18nRealTimeInfo[this._currentLanguage]}: ${himCus?.cus?.text}, `
      : '';
    const himText = himCus?.him?.text
      ? `${i18nRealTimeInfo[this._currentLanguage]}: ${himCus?.him?.text}, `
      : '';

    const boardingText = this.boarding ? `${this.boarding.text}, ` : '';

    const priceText = `${this.price?.isDiscount ? i18nSupersaver[this._currentLanguage] : ''} ${
      this.price?.text && this.price?.price
        ? (this.price?.text || '') + ' ' + (this.price?.price || '') + ', '
        : ''
    }`;

    const transferProcedures =
      legs?.length > 1
        ? `${legs?.length - 1} ${i18nTransferProcedures[this._currentLanguage]}, `
        : '';

    const arrivalTimeText = arrivalTime
      ? `${i18nArrival[this._currentLanguage]}: ${format(arrivalTime, 'HH:mm')}, `
      : '';

    const occupancyText =
      (occupancy?.firstClass && occupancy?.firstClass !== 'UNKNOWN') ||
      (occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN')
        ? `${i18nClass.first[this._currentLanguage]} ${
            i18nOccupancy[occupancy?.firstClass?.toLowerCase()][this._currentLanguage]
          }. ${i18nClass.second[this._currentLanguage]} ${
            i18nOccupancy[occupancy?.secondClass?.toLowerCase()][this._currentLanguage]
          }.`
        : '';

    const attributes =
      notices &&
      handleNotices(notices).length &&
      handleNotices(notices)
        ?.map((notice, index) => index < 4 && notice.text?.template)
        .join(', ') + ', ';

    const attributesText = attributes
      ? `${i18nTravelhints[this._currentLanguage]}: ${attributes}`
      : '';

    const durationText =
      duration > 0
        ? `${i18nTripDuration[this._currentLanguage]} ${
            durationToTime(duration, this._currentLanguage).long
          }, `
        : '';

    return `${departureWalkText} ${departureTimeText} ${getDepartureQuayText()} ${meansOfTransportText} ${vehicleSubModeText} ${directionText} ${cusText} ${boardingText} ${priceText} ${
      cusText ? '' : himText
    } ${arrivalTimeText} ${arrivalWalkText} ${durationText} ${transferProcedures} ${occupancyText} ${attributesText}`;
  }

  protected override render(): TemplateResult {
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

    const himCus = this._handleHimCus(this.trip);
    const hasHimCus = !!himCus.cus || !!himCus.him;

    const noticeAttributes = notices && handleNotices(notices);

    const durationObj = durationToTime(duration, this._currentLanguage);
    setAttribute(this, 'role', 'rowgroup');

    return html`
      <sbb-card size="l" id=${id}>
        <sbb-card-action
          ?active=${this.active}
          aria-expanded=${this.accessibilityExpanded?.toString() ?? nothing}
        >
          ${this.cardActionLabel ? this.cardActionLabel : this._getAccessibilityText(this.trip)}
        </sbb-card-action>
        ${this.loadingPrice
          ? html`<sbb-card-badge class="sbb-loading__badge"></sbb-card-badge>`
          : nothing}
        ${this.price && !this.loadingPrice
          ? html`<sbb-card-badge color=${this.price.isDiscount ? 'charcoal' : 'white'}>
              ${this.price.isDiscount
                ? html`<span aria-hidden="true">
                    %<span class="sbb-screenreaderonly"
                      >${i18nSupersaver[this._currentLanguage]}</span
                    >
                  </span>`
                : nothing}
              ${this.price.text ? html`<span>${this.price.text}</span>` : nothing}
              ${this.price.price ? html`<span>${this.price.price}</span>` : nothing}
            </sbb-card-badge>`
          : nothing}
        <div class="sbb-timetable__row" role="row">
          <div class="sbb-timetable__row-header" role="gridcell">
            <div class="sbb-timetable__row-details">
              ${product &&
              getTransportIcon(
                product.vehicleMode,
                product.vehicleSubModeShortName || '',
                this._currentLanguage,
              )
                ? html`<span class="sbb-timetable__row-transport-wrapper">
                    <sbb-icon
                      class="sbb-timetable__row-transport-icon"
                      name=${'picto:' +
                      getTransportIcon(
                        product.vehicleMode,
                        product.vehicleSubModeShortName || '',
                        this._currentLanguage,
                      )}
                    ></sbb-icon>
                    <span class="sbb-screenreaderonly">
                      ${product &&
                      product.vehicleMode &&
                      i18nMeansOfTransport[product.vehicleMode.toLowerCase()] &&
                      i18nMeansOfTransport[product.vehicleMode.toLowerCase()][
                        this._currentLanguage
                      ]}
                      &nbsp;
                    </span>
                  </span>`
                : nothing}
              ${product &&
              product.vehicleSubModeShortName &&
              (isProductIcon(product?.vehicleSubModeShortName?.toLocaleLowerCase())
                ? renderIconProduct(product.vehicleSubModeShortName, product.line)
                : renderStringProduct(product.vehicleSubModeShortName, product?.line))}
            </div>
            ${direction
              ? html`<p>${`${i18nDirection[this._currentLanguage]} ${direction}`}</p>`
              : nothing}
          </div>
          <sbb-pearl-chain-time
            role="gridcell"
            .legs=${legs}
            .departureTime=${departure?.time}
            .arrivalTime=${arrival?.time}
            .departureWalk=${departureWalk}
            .arrivalWalk=${arrivalWalk}
            ?disable-animation=${this.disableAnimation}
            data-now=${this._now()}
          ></sbb-pearl-chain-time>
          <div class="sbb-timetable__row-footer" role="gridcell">
            ${product && this._getQuayType(product.vehicleMode) && departure?.quayFormatted
              ? html`<span
                  class=${departure?.quayChanged ? `sbb-timetable__row-quay--changed` : nothing}
                >
                  <span class="sbb-screenreaderonly">
                    ${`${i18nDeparture[this._currentLanguage]} ${
                      departure?.quayChanged ? i18nNew[this._currentLanguage] : ''
                    }`}
                    &nbsp;
                  </span>
                  ${this._renderQuayType()} ${departure?.quayFormatted}
                </span>`
              : nothing}
            ${(occupancy?.firstClass && occupancy?.firstClass !== 'UNKNOWN') ||
            (occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN')
              ? html`<ul class="sbb-timetable__row-occupancy" role="list">
                  ${occupancy?.firstClass && occupancy.firstClass !== 'UNKNOWN'
                    ? html`<li>
                        <span aria-hidden="true">1.</span>
                        <sbb-icon
                          class="sbb-occupancy__item"
                          name=${`utilization-` + occupancy?.firstClass?.toLowerCase()}
                        ></sbb-icon>
                        <span class="sbb-screenreaderonly">
                          ${i18nOccupancy[occupancy?.firstClass?.toLowerCase()] &&
                          `${i18nClass.first[this._currentLanguage]} ${
                            i18nOccupancy[occupancy?.firstClass?.toLowerCase()][
                              this._currentLanguage
                            ]
                          }.`}
                        </span>
                      </li>`
                    : nothing}
                  ${occupancy?.secondClass && occupancy.secondClass !== 'UNKNOWN'
                    ? html`<li>
                        <span aria-hidden="true">2.</span>
                        <sbb-icon
                          class="sbb-occupancy__item"
                          name=${`utilization-` + occupancy?.secondClass?.toLowerCase()}
                        ></sbb-icon>
                        <span class="sbb-screenreaderonly">
                          ${i18nOccupancy[occupancy?.secondClass?.toLowerCase()] &&
                          `${i18nClass.second[this._currentLanguage]} ${
                            i18nOccupancy[occupancy?.secondClass?.toLowerCase()][
                              this._currentLanguage
                            ]
                          }.`}
                        </span>
                      </li>`
                    : nothing}
                </ul>`
              : nothing}
            ${(noticeAttributes && noticeAttributes.length) || this.boarding
              ? html`<ul class="sbb-timetable__row-hints" role="list">
                  ${noticeAttributes?.map((notice, index) =>
                    index < 4
                      ? html`<li>
                          <sbb-icon
                            class="sbb-travel-hints__item"
                            name=${'sa-' + notice.name?.toLowerCase()}
                          ></sbb-icon>
                          <span class="sbb-screenreaderonly">${notice.text?.template}</span>
                        </li>`
                      : nothing,
                  )}
                  ${this.boarding
                    ? html`<li>
                        <sbb-icon
                          class="sbb-travel-hints__item"
                          name=${this.boarding?.name}
                          aria-label=${this.boarding?.text}
                          aria-hidden="false"
                        ></sbb-icon>
                      </li>`
                    : nothing}
                </ul>`
              : nothing}
            ${duration > 0
              ? html`<time>
                  <span class="sbb-screenreaderonly">
                    ${`${i18nTripDuration[this._currentLanguage]} ${durationObj.long}`}
                  </span>
                  <span aria-hidden="true">${durationObj.short}</span>
                </time>`
              : nothing}
            ${hasHimCus
              ? html`<span class="sbb-timetable__row-warning">
                  <sbb-icon name=${(himCus.cus || himCus.him).name}></sbb-icon>
                  <span class="sbb-screenreaderonly">${(himCus.cus || himCus.him).text}</span>
                </span>`
              : nothing}
          </div>
        </div>
      </sbb-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-row': SbbTimetableRow;
  }
}
