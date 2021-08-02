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

@Component({
  shadow: true,
  styleUrl: 'lyne-clock.scss',
  tag: 'lyne-clock'
})

export class LyneClock {

  @Element() private _element: HTMLElement;

  /** Text for the Heading */
  @Prop() public text = 'Default title text';

  // private clockFace: HTMLElement;
  private clockHandHours: HTMLElement;
  private clockHandMinutes: HTMLElement;
  private clockHandSeconds: HTMLElement;

  private cacheElements() {
    // this.clockFace = this._element.shadowRoot.querySelector('#clock__face');
    this.clockHandHours = this._element.shadowRoot.querySelector('#clock__hand-hours');
    this.clockHandMinutes = this._element.shadowRoot.querySelector('#clock__hand-minutes');
    this.clockHandSeconds = this._element.shadowRoot.querySelector('#clock__hand-seconds');
  }

  private setCurrentTime() {

    let date = new Date(),
      seconds = date.getSeconds(),
      minutes = date.getMinutes(),
      hours = date.getHours(),
      hands;

    // Create an object with each hand and it's angle in degrees
    hands = [
      {
        hand: this.clockHandHours,
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: this.clockHandMinutes,
        angle: (minutes * 6)
      },
      {
        hand: this.clockHandSeconds,
        angle: (seconds * 6)
      }
    ];

    for (let j = 0; j < hands.length; j++) {
      hands[j].hand.style.setProperty('transform', 'rotateZ(' + hands[j].angle + 'deg)');

      // Note start position for count first minute move
      if (j === 2) {
        this.clockHandSeconds.setAttribute('data-second-angle', hands[j].angle);
        // this.clockHandSeconds.setAttribute('data-second', seconds);
      }
    }

  }

  public componentDidLoad(): void {
    console.log('did load');
    this.cacheElements();
    this.setCurrentTime();
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
