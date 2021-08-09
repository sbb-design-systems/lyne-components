import {
  Component,
  h,
  Element,
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

  private clockHandHours: HTMLElement;
  private clockHandMinutes: HTMLElement;
  private clockHandSeconds: HTMLElement;

  private hours: number;
  private minutes: number;
  private seconds: number;
  private remainingSeconds: number;

  private hoursAngle: number;
  private minutesAngle: number;

  private cacheElements(): void {
    this.clockHandHours = this._element.shadowRoot.querySelector('#clock__hand-hours');
    this.clockHandMinutes = this._element.shadowRoot.querySelector('#clock__hand-minutes');
    this.clockHandSeconds = this._element.shadowRoot.querySelector('#clock__hand-seconds');
  }

  public setCurrentTime(): void {

    if (this.initialtime === 'now') {
      let date = new Date();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
    } else {
      let predefinedTime = this.initialtime.split(':');
      this.hours = +predefinedTime[0]; // the + converts the string to a number
      this.minutes = +predefinedTime[1];
      this.seconds = +predefinedTime[2];
    }

    this.remainingSeconds = defaultSecondsAnimationDuration - this.seconds;

  };

  public moveHandsInitially(): void {

    this._element.style.setProperty('--seconds-animation-start-angle', this.seconds * 6 + 'deg');
    this._element.style.setProperty('--seconds-animation-duration', this.remainingSeconds + 's');

    this.clockHandSeconds.classList.add('clock__hand-seconds--initial-minute');

    this.hoursAngle = (this.hours * 30) + (this.minutes / 2);

    this.clockHandHours.style.setProperty('transform', 'rotateZ(' + this.hoursAngle + 'deg)');

    this.setMinuteHand();

  }

  public setMinuteHand(): void {
    this.minutesAngle = this.minutes * 6;
    this.clockHandMinutes.style.setProperty('transform', 'rotateZ(' + this.minutesAngle + 'deg)');
  };

  public moveMinuteHand(): void {
    this.minutes++;
    this.setMinuteHand();

    setInterval(function() {
      this.minutes++;
      this.setMinuteHand();
    }.bind(this), defaultSecondsAnimationDuration * 1000);

  }

  public componentDidLoad(): void {

    this.cacheElements();
    this.setCurrentTime();

    this.moveHandsInitially();

    this.clockHandSeconds.addEventListener('animationend', function() {
      this.clockHandSeconds.classList.remove('clock__hand-seconds--initial-minute');
      this.moveMinuteHand();
    }.bind(this));

  }

  public render(): any {
    return <div class="clock">
      <span id='clock__face' innerHTML={clockFaceSVG} />
      <span id='clock__hand-hours' innerHTML={clockHandleHoursSVG} />
      <span id='clock__hand-minutes' innerHTML={clockHandleMinutesSVG} />
      <span id='clock__hand-seconds' innerHTML={clockHandleSecondsSVG} />
    </div>
  }

}
