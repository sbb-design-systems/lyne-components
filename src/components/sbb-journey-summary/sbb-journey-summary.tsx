import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceJourneySummaryAttributes } from './sbb-journey-summary.custom';
import isTomorrow from 'date-fns/isTomorrow';
import { isToday, parseISO, format, intervalToDuration, isBefore, isValid } from 'date-fns';
import { i18nArrival, i18nDeparture, i18nDurationHour, i18nDurationMinute, i18nToday, i18nTomorrow, i18nWalkingDistanceArrival, i18nWalkingDistanceDeparture } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';
@Component({
  shadow: true,
  styleUrl: 'sbb-journey-summary.scss',
  tag: 'sbb-journey-summary',
})
export class SbbJourneySummary {

  @Prop() public summaryConfig!: InterfaceJourneySummaryAttributes['config'];

  private _currentLanguage = getDocumentLang();


  private _formatTime(duration): JSX.Element {
    return (
      <span>
        <time>{duration.hours}</time>
        <span>{i18nDurationHour.single.short[this._currentLanguage]}</span>
        <time>{duration.minutes}</time>
        <span>{i18nDurationMinute.single.short[this._currentLanguage]}</span>
      </span>
    );
  };

  private _renderJourneyStart(departureTime: Date, arrivalTime: Date): JSX.Element {
    let duration: Duration;
    if (isBefore(departureTime, arrivalTime)) duration = intervalToDuration({ start: departureTime, end: arrivalTime });
    else {
       duration = isValid( arrivalTime) && intervalToDuration({ start: arrivalTime, end: departureTime });
    }

    if (isTomorrow(departureTime) || isToday(departureTime)) {
      return (isTomorrow(departureTime) ?
        <span>{i18nTomorrow[this._currentLanguage]}, {this._formatTime(duration)}</span> : <span>{i18nToday[this._currentLanguage]}, {this._formatTime(duration)}</span>);
    };
   if(isValid(departureTime))
    return <span><time>{format(departureTime, 'dd.MM, ')}</time>{this._formatTime(duration)}</span>;
  };


  private _renderJourneyVias(vias: string[]): JSX.Element {
    const slicedVias = vias.slice(0, 4);
    return (
      <div class="journey-summary__via-block">
        <span class="journey-summary__via-text">Via</span>
        <ul class="journey-summary__vias">
          {slicedVias.map((via, index) =>
            <li class="journey-summary__via">{via}{index !== slicedVias.length - 1 && <span>, </span>}</li>
          )}
        </ul>
      </div>);
  }

  private _renderWalkTime(before: boolean, duration: number): JSX.Element {
    if (before) return (
      <span class="journey-summary__walktime">
        <sbb-icon name='walk-small'></sbb-icon><time>{duration}<span aria-hidden="true">'</span></time>
        <span class="screenreaderonly">{i18nWalkingDistanceDeparture[this._currentLanguage]}</span>
      </span>
    );
    return (
      <span class="journey-summary__walktime">
        <time>{duration}<span aria-hidden="true">'</span></time>
        <span class="screenreaderonly">{i18nWalkingDistanceArrival[this._currentLanguage]}</span>
        <sbb-icon name='walk-small'></sbb-icon>
      </span>);
  }

  public render(): JSX.Element {
    const { vias, startPoint, destination } = this.summaryConfig || {};
    const departureTime: Date = parseISO(this.summaryConfig?.departure?.time);
    const arrivalTime: Date = parseISO(this.summaryConfig?.arrival?.time);


    return (
      <div class="journey-summary" >
        {startPoint && (
          <sbb-journey-header origin={startPoint} destination={destination}></sbb-journey-header>
        )}
        {vias && this._renderJourneyVias(vias)}
        <div class="journey-summary__body">
          {this._renderJourneyStart(departureTime, arrivalTime)}
          <div class="journey-summary__transportation-details">
            <span class="screenreaderonly">{i18nDeparture[this._currentLanguage]}</span>
            {this.summaryConfig?.departureWalk && this._renderWalkTime(true, this.summaryConfig?.departureWalk)}
            {isValid(departureTime) && (<time>{format(departureTime, 'HH:mm')}</time>)}
            <div class="journey-summary__pearlchain">
              <sbb-pearl-chain legs={this.summaryConfig?.legs} />
            </div>
            {isValid(arrivalTime) && (<time>{format(arrivalTime, 'HH:mm')}</time>)}
            <span class="screenreaderonly">{i18nArrival[this._currentLanguage]}</span>
            {this.summaryConfig?.arrivalWalk && this._renderWalkTime(false, this.summaryConfig?.arrivalWalk)}
          </div>
          <div class="journey-summary_slot">
            <slot />
          </div>
        </div>
      </div >
    );
  }
}
