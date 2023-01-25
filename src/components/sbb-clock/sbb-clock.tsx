import { Component, ComponentInterface, Element, h, JSX, State } from '@stencil/core';

import clockFaceSVG from './assets/sbb_clock_face.svg';
import clockHandleHoursSVG from './assets/sbb_clock_hours.svg';
import clockHandleMinutesSVG from './assets/sbb_clock_minutes.svg';
import clockHandleSecondsSVG from './assets/sbb_clock_seconds.svg';

@Component({
  shadow: true,
  styleUrl: 'sbb-clock.scss',
  tag: 'sbb-clock',
})
export class SbbClock implements ComponentInterface {
  /** Whether is true, the clock's hands are hidden; it's set to true when calculations are ready. */
  @State() private _isInitialized = false;

  @Element() private _element: HTMLElement;

  private _clockHandHours: HTMLElement;
  private _clockHandMinutes: HTMLElement;
  private _clockHandSeconds: HTMLElement;

  private _handMovement: ReturnType<typeof setInterval>;

  private _hours: number;
  private _minutes: number;
  private _seconds: number;
  private _remainingHours: number;
  private _remainingMinutes: number;
  private _remainingSeconds: number;

  private readonly _defaultHoursAnimationDuration = 24;
  private readonly _defaultMinutesAnimationDuration = 60;
  private readonly _defaultSecondsAnimationDuration = 60;
  private readonly _initialTimeOutDuration = 50;

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
    this._clockHandHours?.removeEventListener('animationend', this._moveHoursHand.bind(this));
    this._clockHandSeconds?.removeEventListener('animationend', this._moveMinutesHand.bind(this));
    clearInterval(this._handMovement);
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

  private _getCurrentTime(): void {
    const date = this._now();
    this._hours = date.getHours();
    this._minutes = date.getMinutes();
    this._seconds = date.getSeconds();
    this._remainingSeconds = this._defaultSecondsAnimationDuration - this._seconds;
    this._remainingMinutes = this._defaultMinutesAnimationDuration - this._minutes;
    this._remainingHours = this._defaultHoursAnimationDuration - this._hours;
  }

  private _setHandsStartingPosition(): void {
    this._getCurrentTime();

    let hoursAnimationDuration = 0;
    if (this._remainingSeconds > 0 && this._remainingMinutes > 0 && this._remainingHours > 0) {
      hoursAnimationDuration =
        this._remainingSeconds +
        (this._remainingMinutes - 1) * 60 +
        (this._remainingHours - 1) * 3600;
    } else if (this._remainingMinutes > 0 && this._remainingHours > 0) {
      hoursAnimationDuration = this._remainingMinutes * 60 + (this._remainingHours - 1) * 3600;
    } else if (this._remainingHours > 0) {
      hoursAnimationDuration = this._remainingHours * 3600;
    }

    if (this._clockHandSeconds) {
      this._clockHandSeconds.style.animation = '';
    }

    this._element.style.setProperty(
      '--sbb-clock-hours-animation-start-angle',
      `${Math.ceil(this._hours * 30 + this._minutes / 2)}deg`
    );
    this._element.style.setProperty(
      '--sbb-clock-hours-animation-duration',
      `${hoursAnimationDuration}s`
    );
    this._element.style.setProperty(
      '--sbb-clock-seconds-animation-start-angle',
      `${Math.ceil(this._seconds * (360 / 58.5))}deg`
    );
    this._element.style.setProperty(
      '--sbb-clock-seconds-animation-duration',
      `${this._remainingSeconds}s`
    );

    this._setMinutesHand();

    this._clockHandSeconds?.classList.add('sbb-clock__hand-seconds--initial-minute');
    this._clockHandHours?.classList.add('sbb-clock__hand-hours--initial-hour');
    this._element.style.setProperty('--sbb-clock-animation-play-state', 'running');

    this._isInitialized = true;
  }

  private _setMinutesHand(): void {
    this._clockHandMinutes?.style.setProperty(
      'transform',
      `rotateZ(${Math.ceil(this._minutes * 6)}deg)`
    );
  }

  private _moveHoursHand(): void {
    this._removeHoursAnimationStyles();

    let hoursAngle = Math.ceil(this._hours * 30 + this._minutes / 2);

    if (hoursAngle === 720) {
      hoursAngle = 0;
    } else if (hoursAngle > 360) {
      hoursAngle -= 360;
    }

    this._clockHandHours?.style.setProperty('transform', `rotateZ(${Math.ceil(hoursAngle)}deg)`);
  }

  private _moveMinutesHand(): void {
    this._clockHandSeconds?.removeEventListener('animationend', this._moveMinutesHand.bind(this));

    this._removeSecondsAnimationStyles();

    this._minutes++;
    this._setMinutesHand();

    this._handMovement = setInterval(() => {
      this._minutes++;
      this._setMinutesHand();
    }, this._defaultSecondsAnimationDuration * 1000);
  }

  private _stopClock(): void {
    clearInterval(this._handMovement);

    if (this._hasDataNow()) {
      this._setHandsStartingPosition();
      this._clockHandSeconds?.classList.add('sbb-clock__hand-seconds--initial-minute');
      this._clockHandHours?.classList.add('sbb-clock__hand-hours--initial-hour');
    } else {
      this._removeSecondsAnimationStyles();
      this._removeHoursAnimationStyles();
    }

    this._clockHandHours?.removeEventListener('animationend', this._moveHoursHand.bind(this));
    this._clockHandSeconds?.removeEventListener('animationend', this._moveMinutesHand.bind(this));

    this._clockHandMinutes?.classList.add('sbb-clock__hand-minutes--no-transition');

    this._element.style.setProperty('--sbb-clock-animation-play-state', 'paused');
  }

  private _startClock(): void {
    this._clockHandHours?.addEventListener(
      'animationend',
      this._moveHoursHand.bind(this),
      this._eventListenerOptions
    );
    this._clockHandSeconds?.addEventListener(
      'animationend',
      this._moveMinutesHand.bind(this),
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
