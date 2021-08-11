import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';

import clockFaceSVG from './assets/sbb_clock_face.svg';
import clockHandleHoursSVG from './assets/sbb_clock_hours.svg';
import clockHandleMinutesSVG from './assets/sbb_clock_minutes.svg';
import clockHandleSecondsSVG from './assets/sbb_clock_seconds.svg';

let moveMinuteHand;

@Component({
  shadow: true,
  styleUrl: 'lyne-clock.scss',
  tag: 'lyne-clock'
})

export class LyneClock {

  @Prop() public paused = false;
  @Prop() public initialtime = 'now';

  @Element() private _element: HTMLElement;

  private _clockHandHours: HTMLElement;
  private _clockHandMinutes: HTMLElement;
  private _clockHandSeconds: HTMLElement;

  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  private _defaultSecondsAnimationDuration = 60;
  private _remainingSeconds: number;
  private _hoursAngle: number;
  private _minutesAngle: number;

  private _handMovement: any;

  private _cacheElements(): void {
    this._clockHandHours = this._element.shadowRoot.querySelector('.clock__hand-hours');
    this._clockHandMinutes = this._element.shadowRoot.querySelector('.clock__hand-minutes');
    this._clockHandSeconds = this._element.shadowRoot.querySelector('.clock__hand-seconds');
  }

  private _handlePageVisiblityChange(): void {
    if (document.visibilityState === 'hidden') {
      this._stopClock();
    } else {
      this._startClock();
    }
  }

  private _addEventListeners(): void {
    document.addEventListener('visibilitychange', this._handlePageVisiblityChange.bind(this), false);
  }

  private _removeEventListeners(): void {
    document.removeEventListener('visibilitychange', this._handlePageVisiblityChange.bind(this), false);
  }

  private _setCurrentTime(): void {

    if (this.initialtime === 'now') {
      const date = new Date();

      this._hours = date.getHours();
      this._minutes = date.getMinutes();
      this._seconds = date.getSeconds();

    } else {
      const predefinedTime = this.initialtime.split(':');

      this._hours = Number(predefinedTime[0]);
      this._minutes = Number(predefinedTime[1]);
      this._seconds = Number(predefinedTime[2]);
    }

    this._remainingSeconds = this._defaultSecondsAnimationDuration - this._seconds;

  }

  private _moveHandsInitially(): void {

    this._element.style.setProperty('--clock-seconds-animation-start-angle', `${this._seconds * 6}deg`);
    this._element.style.setProperty('--clock-seconds-animation-duration', `${this._remainingSeconds}s`);

    this._hoursAngle = (this._hours * 30) + (this._minutes / 2);

    this._clockHandHours.style.setProperty('transform', `rotateZ(${this._hoursAngle}deg)`);

    this._setMinuteHand();

  }

  private _setMinuteHand(): void {
    this._minutesAngle = this._minutes * 6;
    this._clockHandMinutes.style.setProperty('transform', `rotateZ(${this._minutesAngle}deg)`);
  }

  private _moveMinuteHand(): void {

    this._clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
    this._clockHandSeconds.removeEventListener('animationend', moveMinuteHand);

    this._minutes++;
    this._setMinuteHand();

    this._handMovement = setInterval(() => {
      this._minutes++;
      this._setMinuteHand();
    }, this._defaultSecondsAnimationDuration * 1000);

  }

  private _stopClock(): void {

    this._clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
    this._clockHandSeconds.removeEventListener('animationend', moveMinuteHand);

    clearInterval(this._handMovement);

    this._element.style.setProperty('--clock-animation-play-state', 'paused');

  }

  private _startClock(): void {

    moveMinuteHand = (): void => this._moveMinuteHand();

    this._setCurrentTime();
    this._moveHandsInitially();

    this._clockHandSeconds.classList.add('clock__hand-seconds--initial-minute');
    this._clockHandSeconds.addEventListener('animationend', moveMinuteHand);
    this._element.style.setProperty('--clock-animation-play-state', 'running');

  }

  public componentWillLoad(): void {
    this._addEventListeners();
  }

  public componentDidLoad(): void {
    this._cacheElements();

    if (this.paused) {
      this._stopClock();
    } else {
      this._startClock();
    }

  }

  public render(): any {
    return <div class='clock'>
      <span class='clock__face' innerHTML={clockFaceSVG} />
      <span class='clock__hand-hours' innerHTML={clockHandleHoursSVG} />
      <span class='clock__hand-minutes' innerHTML={clockHandleMinutesSVG} />
      <span class='clock__hand-seconds' innerHTML={clockHandleSecondsSVG} />
    </div>;
  }

  public disconnectedCallback(): void {
    this._removeEventListeners();
  }

}
