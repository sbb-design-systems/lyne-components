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

import { Time } from './lyne-clock.custom.d';

let moveHoursHand;
let moveMinutesHand;

@Component({
  shadow: true,
  styleUrl: 'lyne-clock.scss',
  tag: 'lyne-clock'
})

export class LyneClock {

  @Element() private _element: HTMLElement;

  /** If set to true, the clock will be paused. */
  @Prop() public paused? = false;

  /**
   * initialTime accepts a string following
   * a ${number}:${number}:${number} pattern.
   * If left empty or the string 'now' is used
   * we will set the current time the client
   * has on its device.
   */
  @Prop() public initialTime?: Time;

  private _clockHandHours!: HTMLElement;
  private _clockHandMinutes!: HTMLElement;
  private _clockHandSeconds!: HTMLElement;

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

  private _handlePageVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this._stopClock();
    } else if (!this.paused) {
      this._startClock();
    }
  }

  private _addEventListeners(): void {
    document.addEventListener('visibilitychange', this._handlePageVisibilityChange.bind(this), false);
  }

  private _removeEventListeners(): void {
    document.removeEventListener('visibilitychange', this._handlePageVisibilityChange.bind(this), false);
    this._clockHandHours.removeEventListener('animationend', moveHoursHand);
    this._clockHandSeconds.removeEventListener('animationend', moveMinutesHand);

  }

  private _getCurrentTime(): void {
    const predefinedTime = this.initialTime.split(':');

    if (predefinedTime[0] === 'now') {
      const date = new Date();

      this._hours = date.getHours();
      this._minutes = date.getMinutes();
      this._seconds = date.getSeconds();

    } else {

      this._hours = Number(predefinedTime[0]);
      this._minutes = Number(predefinedTime[1]);
      this._seconds = Number(predefinedTime[2]);

    }

    this._remainingSeconds = this._defaultSecondsAnimationDuration - this._seconds;
    this._remainingMinutes = this._defaultMinutesAnimationDuration - this._minutes;
    this._remainingHours = this._defaultHoursAnimationDuration - this._hours;

  }

  private _moveHandsInitially(): void {

    let hoursAnimationDuration = 0;

    if (this._remainingSeconds > 0) {
      hoursAnimationDuration = this._remainingSeconds;
    }

    if (this._remainingMinutes > 0 && this._remainingSeconds > 0) {
      hoursAnimationDuration += (this._remainingMinutes - 1) * 60;
    } else if (this._remainingMinutes > 0) {
      hoursAnimationDuration += this._remainingMinutes * 60;
    }

    if (this._remainingHours > 0 && (this._remainingMinutes > 0 || this._remainingSeconds > 0)) {
      hoursAnimationDuration += (this._remainingHours - 1) * 3600;
    } else if (this._remainingHours > 0) {
      hoursAnimationDuration += this._remainingHours * 3600;
    }

    this._element.style.setProperty('--clock-hours-animation-start-angle', `${Math.ceil((this._hours * 30) + (this._minutes / 2))}deg`);
    this._element.style.setProperty('--clock-hours-animation-duration', `${hoursAnimationDuration}s`);
    this._element.style.setProperty('--clock-seconds-animation-start-angle', `${Math.ceil(this._seconds * 6)}deg`);
    this._element.style.setProperty('--clock-seconds-animation-duration', `${this._remainingSeconds}s`);

    this._setMinutesHand();

  }

  private _setMinutesHand(): void {
    this._minutesAngle = this._minutes * 6;
    this._clockHandMinutes.style.setProperty('transform', `rotateZ(${Math.ceil(this._minutesAngle)}deg)`);
  }

  private _moveHoursHand(): void {
    this._clockHandHours.classList.remove('clock__hand-hours--initial-hour');
    this._hoursAngle = Math.ceil((this._hours * 30) + (this._minutes / 2));

    console.log(this._hoursAngle);

    if (this._hoursAngle === 720) {
      this._hoursAngle = 0;
    } else if (this._hoursAngle > 360) {
      this._hoursAngle -= 360;
    }

    this._clockHandHours.style.setProperty('transform', `rotateZ(${Math.ceil(this._hoursAngle)}deg)`);
  }

  private _moveMinutesHand(): void {

    this._clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
    this._clockHandSeconds.removeEventListener('animationend', moveMinutesHand);

    this._minutes++;
    this._setMinutesHand();

    this._handMovement = setInterval(() => {
      this._minutes++;
      this._setMinutesHand();
    }, this._defaultSecondsAnimationDuration * 1000);

  }

  private _stopClock(): void {

    this._clockHandHours.removeEventListener('animationend', moveHoursHand);
    this._clockHandSeconds.removeEventListener('animationend', moveMinutesHand);

    if (this.paused) {
      this._getCurrentTime();
      this._moveHandsInitially();
      this._clockHandSeconds.classList.add('clock__hand-seconds--initial-minute');
      this._clockHandHours.classList.add('clock__hand-hours--initial-hour');
    } else {
      this._clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
      this._clockHandHours.classList.remove('clock__hand-hours--initial-hour');
    }

    clearInterval(this._handMovement);

    this._element.style.setProperty('--clock-animation-play-state', 'paused');

  }

  private _startClock(): void {

    const eventListenerOptions = {
      passive: true
    };

    this._getCurrentTime();

    this._clockHandSeconds.classList.add('clock__hand-seconds--initial-minute');
    this._clockHandHours.classList.add('clock__hand-hours--initial-hour');

    this._moveHandsInitially();

    this._element.style.setProperty('--clock-animation-play-state', 'running');


    this._clockHandHours.addEventListener('animationend', moveHoursHand, eventListenerOptions);
    this._clockHandSeconds.addEventListener('animationend', moveMinutesHand, eventListenerOptions);

  }

  public componentDidLoad(): void {

    this._addEventListeners();

    moveHoursHand = (): void => this._moveHoursHand();
    moveMinutesHand = (): void => this._moveMinutesHand();

    if (this.paused) {
      this._stopClock();
    } else {
      this._startClock();
    }

  }

  public render(): JSX.Element {
    return <div class='clock'>
      <span
        class='clock__face'
        innerHTML={clockFaceSVG}
      />
      <span
        class='clock__hand-hours'
        innerHTML={clockHandleHoursSVG}
        ref={(el): void => {
          this._clockHandHours = el;
        }}
      />
      <span
        class='clock__hand-minutes'
        innerHTML={clockHandleMinutesSVG}
        ref={(el): void => {
          this._clockHandMinutes = el;
        }}
      />
      <span
        class='clock__hand-seconds'
        innerHTML={clockHandleSecondsSVG}
        ref={(el): void => {
          this._clockHandSeconds = el;
        }}
      />
    </div>;
  }

  public disconnectedCallback(): void {
    this._removeEventListeners();
  }

}
