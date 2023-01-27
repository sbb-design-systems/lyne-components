import { Component, ComponentInterface, Element, h, JSX, State } from '@stencil/core';

import clockFaceSVG from './assets/sbb_clock_face.svg';
import clockHandleHoursSVG from './assets/sbb_clock_hours.svg';
import clockHandleMinutesSVG from './assets/sbb_clock_minutes.svg';
import clockHandleSecondsSVG from './assets/sbb_clock_seconds.svg';

let moveHoursHand;
let moveMinutesHand;
let handMovement;

@Component({
  shadow: true,
  styleUrl: 'sbb-clock.scss',
  tag: 'sbb-clock',
})
export class SbbClock implements ComponentInterface {
  /** Whether is true, the clock's hands are hidden; it's set to true when calculations are ready. */
  @State() private _isInitialized = false;

  /** Reference to the host element. */
  @Element() private _element: HTMLElement;

  /** Reference to the hour hand. */
  private _clockHandHours: HTMLElement;

  /** Reference to the minute hand. */
  private _clockHandMinutes: HTMLElement;

  /** Reference to the second hand. */
  private _clockHandSeconds: HTMLElement;

  /** Hours value for the current date. */
  private _hours: number;

  /** Minutes value for the current date. */
  private _minutes: number;

  /** Seconds value for the current date. */
  private _seconds: number;

  /** Number of hours on the clock face. */
  private readonly _totalHoursOnClockFace = 12;

  /** Number of minutes on the clock face. */
  private readonly _totalMinutesOnClockFace = 60;

  /** Number of seconds on the clock face. */
  private readonly _totalSecondsOnClockFace = 60;

  /** Timeout for the clock start. */
  private readonly _initialTimeOutDuration = 50;

  /** Angle in a single rotation. */
  private readonly _fullAngle = 360;

  /** Angle between two consecutive hours: 360/12, means a full rotation / number of hours in a rotation. */
  private readonly _hoursAngle = 30;

  /** Angle between two consecutive minutes: 360/60, means a full rotation / number of minutes in one hour. */
  private readonly _minutesAngle = 6;

  /** Angle between two consecutive seconds for SBB clock custom behavior. */
  private readonly _sbbSecondsAngle = 360 / 58.5;

  /** Number of seconds in a minute. */
  private readonly _secondsInAMinute = 60;

  /** Number of seconds in an hour. */
  private readonly _secondsInAnHour = 3600;

  private readonly _eventListenerOptions: AddEventListenerOptions = {
    once: true,
    passive: true,
  };

  private _handlePageVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this._stopClock();
    } else if (!this._hasDataNow()) {
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
    this._clockHandHours?.removeEventListener('animationend', moveHoursHand);
    this._clockHandSeconds?.removeEventListener('animationend', moveMinutesHand);
    clearInterval(handMovement);
  }

  private _removeHoursAnimationStyles(): void {
    this._clockHandHours?.classList.remove('sbb-clock__hand-hours--initial-hour');
    this._element.style.removeProperty('--sbb-clock-hours-animation-start-angle');
    this._element.style.removeProperty('--sbb-clock-hours-animation-duration');
  }

  private _removeSecondsAnimationStyles(): void {
    this._clockHandSeconds?.classList.remove('sbb-clock__hand-seconds--initial-minute');
    this._clockHandMinutes?.classList.remove('sbb-clock__hand-minutes--no-transition');
    this._element.style.removeProperty('--sbb-clock-seconds-animation-start-angle');
    this._element.style.removeProperty('--sbb-clock-seconds-animation-duration');
  }

  /** Given the current date, calculates the hh/mm/ss values and the hh/mm/ss left to the next midnight. */
  private _getCurrentTime(): void {
    const date = this._now();
    this._hours = date.getHours() % 12;
    this._minutes = date.getMinutes();
    this._seconds = date.getSeconds();
  }

  /** Set the starting position for the three hands on the clock face. */
  private _setHandsStartingPosition(): void {
    this._getCurrentTime();
    const remainingSeconds = this._totalSecondsOnClockFace - this._seconds;
    const remainingMinutes = this._totalMinutesOnClockFace - this._minutes;
    const remainingHours = this._totalHoursOnClockFace - this._hours;

    let hoursAnimationDuration = 0;
    let hasRemainingMinutesOrSeconds = 0;

    if (remainingSeconds > 0) {
      hoursAnimationDuration += remainingSeconds;
      hasRemainingMinutesOrSeconds = 1;
    }

    if (remainingMinutes > 0) {
      hoursAnimationDuration +=
        (remainingMinutes - hasRemainingMinutesOrSeconds) * this._secondsInAMinute;
      hasRemainingMinutesOrSeconds = 1;
    }

    if (remainingHours > 0) {
      hoursAnimationDuration +=
        (remainingHours - hasRemainingMinutesOrSeconds) * this._secondsInAnHour;
    }

    if (this._clockHandSeconds) {
      this._clockHandSeconds.style.animation = '';
    }

    this._element.style.setProperty(
      '--sbb-clock-hours-animation-start-angle',
      `${Math.ceil(this._hours * this._hoursAngle + this._minutes / 2)}deg`
    );
    this._element.style.setProperty(
      '--sbb-clock-hours-animation-duration',
      `${hoursAnimationDuration}s`
    );
    this._element.style.setProperty(
      '--sbb-clock-seconds-animation-start-angle',
      `${Math.ceil(this._seconds * this._sbbSecondsAngle)}deg`
    );
    this._element.style.setProperty(
      '--sbb-clock-seconds-animation-duration',
      `${remainingSeconds}s`
    );

    this._setMinutesHand();

    this._clockHandSeconds?.classList.add('sbb-clock__hand-seconds--initial-minute');
    this._clockHandHours?.classList.add('sbb-clock__hand-hours--initial-hour');
    this._element.style.setProperty('--sbb-clock-animation-play-state', 'running');

    this._isInitialized = true;
  }

  /** Set the starting position for the minutes hand. */
  private _setMinutesHand(): void {
    this._clockHandMinutes?.style.setProperty(
      'transform',
      `rotateZ(${Math.ceil(this._minutes * this._minutesAngle)}deg)`
    );
  }

  /** Move the hours hand to the next value. */
  private _moveHoursHand(): void {
    this._removeHoursAnimationStyles();

    let hoursAngle = Math.ceil(this._hours * this._hoursAngle + this._minutes / 2);

    if (hoursAngle >= this._fullAngle) {
      hoursAngle -= this._fullAngle;
    }

    this._clockHandHours?.style.setProperty('transform', `rotateZ(${hoursAngle}deg)`);
  }

  /** Move the minutes hand to the next value. */
  private _moveMinutesHand(): void {
    this._clockHandSeconds?.removeEventListener('animationend', moveMinutesHand);

    this._removeSecondsAnimationStyles();

    this._addMinutesAndSetHands();

    handMovement = setInterval(
      this._addMinutesAndSetHands.bind(this),
      this._totalSecondsOnClockFace * 1000
    );
  }

  private _addMinutesAndSetHands(): void {
    this._minutes++;
    this._setMinutesHand();
  }

  /** Stops the clock by removing all the animations. */
  private _stopClock(): void {
    clearInterval(handMovement);

    if (this._hasDataNow()) {
      this._setHandsStartingPosition();
      this._clockHandSeconds?.classList.add('sbb-clock__hand-seconds--initial-minute');
      this._clockHandHours?.classList.add('sbb-clock__hand-hours--initial-hour');
    } else {
      this._removeSecondsAnimationStyles();
      this._removeHoursAnimationStyles();
    }

    this._clockHandHours?.removeEventListener('animationend', moveHoursHand);
    this._clockHandSeconds?.removeEventListener('animationend', moveMinutesHand);

    this._clockHandMinutes?.classList.add('sbb-clock__hand-minutes--no-transition');

    this._element.style.setProperty('--sbb-clock-animation-play-state', 'paused');
  }

  /** Starts the clock by defining the hands starting position then starting the animations. */
  private _startClock(): void {
    moveHoursHand = (): void => this._moveHoursHand();
    moveMinutesHand = (): void => this._moveMinutesHand();

    this._clockHandHours?.addEventListener(
      'animationend',
      moveHoursHand,
      this._eventListenerOptions
    );
    this._clockHandSeconds?.addEventListener(
      'animationend',
      moveMinutesHand,
      this._eventListenerOptions
    );

    setTimeout(() => {
      this._setHandsStartingPosition();
    }, this._initialTimeOutDuration);
  }

  private _hasDataNow(): boolean {
    const dataNow = +this._element.dataset?.now;
    return !isNaN(dataNow);
  }

  private _now(): Date {
    if (this._hasDataNow()) {
      return new Date(+this._element.dataset?.now);
    }
    return new Date();
  }

  public componentDidLoad(): void {
    this._addEventListeners();

    if (this._hasDataNow()) {
      this._stopClock();
    } else {
      this._startClock();
    }
  }

  public disconnectedCallback(): void {
    this._removeEventListeners();
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
}
