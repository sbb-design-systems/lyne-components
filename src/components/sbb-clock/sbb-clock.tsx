import { Component, Element, h, Prop, State } from '@stencil/core';

import clockFaceSVG from './assets/sbb_clock_face.svg';
import clockHandleHoursSVG from './assets/sbb_clock_hours.svg';
import clockHandleMinutesSVG from './assets/sbb_clock_minutes.svg';
import clockHandleSecondsSVG from './assets/sbb_clock_seconds.svg';

import { Time } from './sbb-clock.custom';

let moveHoursHand;
let moveMinutesHand;
let handMovement;

const eventListenerOptions = {
  once: true,
  passive: true,
};

@Component({
  shadow: true,
  styleUrl: 'sbb-clock.scss',
  tag: 'sbb-clock',
})
export class SbbClock {
  @Element() private _element: HTMLElement;

  /**
   * We use _isInitialized to hide the hands of
   * the clock till the calculations are ready
   */
  @State() private _isInitialized = false;

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
  private _initialTimeOutDuration = 50;
  private _remainingHours: number;
  private _remainingMinutes: number;
  private _remainingSeconds: number;
  private _hoursAngle: number;
  private _minutesAngle: number;

  private _handlePageVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this._stopClock();
    } else if (!this.paused) {
      this._startClock();
    }
  }

  private _addEventListeners(): void {
    document.addEventListener(
      'visibilitychange',
      this._handlePageVisibilityChange.bind(this),
      false
    );
  }

  private _removeEventListeners(): void {
    document.removeEventListener(
      'visibilitychange',
      this._handlePageVisibilityChange.bind(this),
      false
    );
    this._clockHandHours.removeEventListener('animationend', moveHoursHand);
    this._clockHandSeconds.removeEventListener('animationend', moveMinutesHand);
    clearInterval(handMovement);
  }

  private _removeHoursAnimationStyles(): void {
    this._clockHandHours.classList.remove('sbb-clock__hand-hours--initial-hour');
    this._element.style.removeProperty('--clock-hours-animation-start-angle');
    this._element.style.removeProperty('--clock-hours-animation-duration');
  }

  private _removeSecondsAnimationStyles(): void {
    this._clockHandSeconds.classList.remove('sbb-clock__hand-seconds--initial-minute');
    this._clockHandMinutes.classList.remove('sbb-clock__hand-minutes--no-transition');
    this._element.style.removeProperty('--clock-seconds-animation-start-angle');
    this._element.style.removeProperty('--clock-seconds-animation-duration');
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
    this._getCurrentTime();

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

    this._clockHandSeconds.style.animation = '';

    this._element.style.setProperty(
      '--clock-hours-animation-start-angle',
      `${Math.ceil(this._hours * 30 + this._minutes / 2)}deg`
    );
    this._element.style.setProperty(
      '--clock-hours-animation-duration',
      `${hoursAnimationDuration}s`
    );
    this._element.style.setProperty(
      '--clock-seconds-animation-start-angle',
      `${Math.ceil(this._seconds * (360 / 58.5))}deg`
    );
    this._element.style.setProperty(
      '--clock-seconds-animation-duration',
      `${this._remainingSeconds}s`
    );

    this._setMinutesHand();

    this._clockHandSeconds.classList.add('sbb-clock__hand-seconds--initial-minute');
    this._clockHandHours.classList.add('sbb-clock__hand-hours--initial-hour');
    this._element.style.setProperty('--clock-animation-play-state', 'running');

    this._isInitialized = true;
  }

  private _setMinutesHand(): void {
    this._minutesAngle = this._minutes * 6;
    this._clockHandMinutes.style.setProperty(
      'transform',
      `rotateZ(${Math.ceil(this._minutesAngle)}deg)`
    );
  }

  private _moveHoursHand(): void {
    this._removeHoursAnimationStyles();

    this._hoursAngle = Math.ceil(this._hours * 30 + this._minutes / 2);

    if (this._hoursAngle === 720) {
      this._hoursAngle = 0;
    } else if (this._hoursAngle > 360) {
      this._hoursAngle -= 360;
    }

    this._clockHandHours.style.setProperty(
      'transform',
      `rotateZ(${Math.ceil(this._hoursAngle)}deg)`
    );
  }

  private _moveMinutesHand(): void {
    this._clockHandSeconds.removeEventListener('animationend', moveMinutesHand);

    this._removeSecondsAnimationStyles();

    this._minutes++;
    this._setMinutesHand();

    handMovement = setInterval(() => {
      this._minutes++;
      this._setMinutesHand();
    }, this._defaultSecondsAnimationDuration * 1000);
  }

  private _stopClock(): void {
    clearInterval(handMovement);

    if (this.paused) {
      this._moveHandsInitially();
      this._clockHandSeconds.classList.add('sbb-clock__hand-seconds--initial-minute');
      this._clockHandHours.classList.add('sbb-clock__hand-hours--initial-hour');
    } else {
      this._removeSecondsAnimationStyles();
      this._removeHoursAnimationStyles();
    }

    this._clockHandHours.removeEventListener('animationend', moveHoursHand);
    this._clockHandSeconds.removeEventListener('animationend', moveMinutesHand);

    this._clockHandMinutes.classList.add('sbb-clock__hand-minutes--no-transition');

    this._element.style.setProperty('--clock-animation-play-state', 'paused');
  }

  private _startClock(): void {
    moveHoursHand = (): void => this._moveHoursHand();
    moveMinutesHand = (): void => this._moveMinutesHand();

    this._clockHandHours.addEventListener('animationend', moveHoursHand, eventListenerOptions);
    this._clockHandSeconds.addEventListener('animationend', moveMinutesHand, eventListenerOptions);

    setTimeout(() => {
      this._moveHandsInitially();
    }, this._initialTimeOutDuration);
  }

  public componentDidLoad(): void {
    this._addEventListeners();

    if (this.paused) {
      this._stopClock();
    } else {
      this._startClock();
    }
  }

  public render(): JSX.Element {
    const initClass = this._isInitialized ? '' : ' sbb-clock--not-initialized';

    return (
      <div class={`sbb-clock${initClass}`}>
        <span class="sbb-clock__face" innerHTML={clockFaceSVG} />
        <span
          class="sbb-clock__hand-hours"
          innerHTML={clockHandleHoursSVG}
          ref={(el): void => {
            this._clockHandHours = el;
          }}
        />
        <span
          class="sbb-clock__hand-minutes sbb-clock__hand-minutes--no-transition"
          innerHTML={clockHandleMinutesSVG}
          ref={(el): void => {
            this._clockHandMinutes = el;
          }}
        />
        <span
          class="sbb-clock__hand-seconds"
          innerHTML={clockHandleSecondsSVG}
          ref={(el): void => {
            this._clockHandSeconds = el;
          }}
        />
      </div>
    );
  }

  public disconnectedCallback(): void {
    this._removeEventListeners();
  }
}
