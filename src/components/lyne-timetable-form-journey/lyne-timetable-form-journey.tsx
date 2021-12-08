import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-timetable-form-journey.events';
import { InterfaceLyneTimetableFormJourneyAttributes } from './lyne-timetable-form-journey.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-form-journey.default.scss',
    shared: 'styles/lyne-timetable-form-journey.shared.scss'
  },
  tag: 'lyne-timetable-form-journey'
})

export class LyneTimetableFormJourney {

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneTimetableFormJourneyAttributes['someInterface'];

  @Element() private _element: HTMLElement;

  private _clickHandler = (): void => {

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: 'some event detail'
    });

    this._element.dispatchEvent(event);
  };

  public render(): JSX.Element {
    return (
      <button
        class='some-class'
        onClick={this._clickHandler}
      >
        {this.someProp}
      </button>
    );
  }
}
