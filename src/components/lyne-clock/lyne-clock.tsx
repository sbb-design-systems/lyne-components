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

const defaultSecondsAnimationDuration = 60;

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

  private _remainingSeconds: number;
  private _hoursAngle: number;
  private _minutesAngle: number;

  private _handMovement: any;

  private _cacheElements(): void {
    this._clockHandHours = this._element.shadowRoot.querySelector('.clock__hand-hours');
    this._clockHandMinutes = this._element.shadowRoot.querySelector('.clock__hand-minutes');
    this._clockHandSeconds = this._element.shadowRoot.querySelector('.clock__hand-seconds');
  }

  public setCurrentTime(): void {

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

    this._remainingSeconds = defaultSecondsAnimationDuration - this._seconds;

  }

  public moveHandsInitially(): void {

    this._element.style.setProperty('--clock-seconds-animation-start-angle', `${this._seconds * 6}deg`);
    this._element.style.setProperty('--clock-seconds-animation-duration', `${this._remainingSeconds}s`);

    this._clockHandSeconds.classList.add('clock__hand-seconds--initial-minute');

    this._hoursAngle = (this._hours * 30) + (this._minutes / 1.95);

    this._clockHandHours.style.setProperty('transform', `rotateZ(${this._hoursAngle}deg)`);

    this.setMinuteHand();

  }

  public setMinuteHand(): void {
    this._minutesAngle = this._minutes * 6;
    this._clockHandMinutes.style.setProperty('transform', `rotateZ(${this._minutesAngle}deg)`);
  }

  public moveMinuteHand(): void {
    this._minutes++;
    this.setMinuteHand();

    this._handMovement = setInterval(() => {
      this._minutes++;
      this.setMinuteHand();
    }, defaultSecondsAnimationDuration * 1000);

  }

  public stopClock(): void {
    clearInterval(this._handMovement);
    this._element.style.setProperty('--clock-animation-play-state', 'paused');
  }

  public startClock(): void {
    this._element.style.setProperty('--clock-animation-play-state', 'running');

    this._clockHandSeconds.addEventListener('animationend', () => {
      this._clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
      this.moveMinuteHand();
    });

  }

  public componentDidLoad(): void {

    this._cacheElements();
    this.setCurrentTime();
    this.moveHandsInitially();

    if (this.paused) {
      this.stopClock();
    } else {
      this.startClock();
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

}
