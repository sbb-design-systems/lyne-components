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

  private _defaultHoursAnimationDuration = 24;
  private _defaultMinutesAnimationDuration = 60;
  private _defaultSecondsAnimationDuration = 60;
  private _remainingHours: number;
  private _remainingMinutes: number;
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
    } else if (!this.paused) {
      this._startClock();
    }
  }

  private _addEventListeners(): void {
    document.addEventListener('visibilitychange', this._handlePageVisiblityChange.bind(this), false);
  }

  private _removeEventListeners(): void {
    document.removeEventListener('visibilitychange', this._handlePageVisiblityChange.bind(this), false);
  }

  private _getCurrentTime(): void {

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
    this._remainingMinutes = this._defaultMinutesAnimationDuration - this._minutes;
    this._remainingHours = this._defaultHoursAnimationDuration - this._hours;

  }

  private _moveHandsInitially(): void {

    let hoursAnimationDuration = this._remainingSeconds;

    if (this._remainingSeconds > 0) {
      hoursAnimationDuration += (this._remainingMinutes - 1) * 60;
    }

    if (this._remainingHours > 0 && this._remainingMinutes > 0) {
      hoursAnimationDuration += (this._remainingHours - 1) * 3600;
    }

    this._element.style.setProperty('--clock-hours-animation-start-angle', `${(this._hours * 30) + (this._minutes / 2)}deg`);
    this._element.style.setProperty('--clock-hours-animation-duration', `${hoursAnimationDuration}s`);
    this._element.style.setProperty('--clock-seconds-animation-start-angle', `${this._seconds * 6}deg`);
    this._element.style.setProperty('--clock-seconds-animation-duration', `${this._remainingSeconds}s`);

    this._setMinutesHand();

  }

  private _setMinutesHand(): void {
    this._minutesAngle = this._minutes * 6;
    this._clockHandMinutes.style.setProperty('transform', `rotateZ(${this._minutesAngle}deg)`);
  }

  private _setHoursHand(): void {
    this._clockHandHours.classList.remove('clock__hand-hours--initial-hour');
    this._hoursAngle = (this._hours * 30) + (this._minutes / 2);

    if (this._hoursAngle === 720) {
      this._hoursAngle = 0;
    } else if (this._hoursAngle > 360) {
      this._hoursAngle -= 360;
    }

    this._clockHandHours.style.setProperty('transform', `rotateZ(${this._hoursAngle}deg)`);
  }

  private _moveMinutesHand(): void {
    this._clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
    this._clockHandSeconds.removeEventListener('animationend', moveMinuteHand);

    this._minutes++;
    this._setMinutesHand();

    if (this._minutes === 60) {
      this._setHoursHand();
    }

    this._handMovement = setInterval(() => {
      this._minutes++;
      this._setMinutesHand();
    }, this._defaultSecondsAnimationDuration * 1000);

  }

  private _stopClock(): void {

    if (this.paused) {
      this._getCurrentTime();
      this._moveHandsInitially();
      this._clockHandSeconds.classList.add('clock__hand-seconds--initial-minute');
      this._clockHandHours.classList.add('clock__hand-hours--initial-hour');
    } else {
      this._clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
    }

    this._clockHandSeconds.removeEventListener('animationend', moveMinuteHand);
    clearInterval(this._handMovement);

    this._element.style.setProperty('--clock-animation-play-state', 'paused');

  }

  private _startClock(): void {

    this._getCurrentTime();
    this._moveHandsInitially();

    moveMinuteHand = (): void => this._moveMinutesHand();

    this._clockHandSeconds.classList.add('clock__hand-seconds--initial-minute');
    this._clockHandHours.classList.add('clock__hand-hours--initial-hour');
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
