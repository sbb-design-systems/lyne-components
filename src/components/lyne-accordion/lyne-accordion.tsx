import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from '../lyne-accordion-item/lyne-accordion-item.events';

/**
 * @slot unnamed - Place lyne-accordion-item elements in the slot
 */

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion.scss',
  tag: 'lyne-accordion'
})

export class LyneAccordion {

  /**
   * Set this if you want to use the accordion on a non-white background.
   */
  @Prop() public nonWhiteBackground?: boolean;

  @Element() private _element: HTMLElement;

  private _eventIds = [];

  private _setEventIds(): void {
    const items = this._element.querySelectorAll('lyne-accordion-item');

    items.forEach((item, index) => {
      const eventId = item.getAttribute('event-id');
      let finalEventId;

      if (eventId) {
        finalEventId = eventId;
      } else {
        finalEventId = `accordion-item-id-${index}`;
        item.setAttribute('event-id', finalEventId);
      }

      this._eventIds.push(finalEventId);
    });
  }

  private _addEventListeners(): void {
    this._element.addEventListener(events.didClose, (evt) => {
      console.log(evt);
    });

    this._element.addEventListener(events.didOpen, (evt) => {
      console.log(evt);
    });
  }

  public componentWillLoad(): void {
    this._setEventIds();
    this._addEventListeners();
  }

  public render(): JSX.Element {
    const nonWhite = this.nonWhiteBackground
      ? ' accordion--non-white'
      : '';

    return (
      <div class={`accordion${nonWhite}`}>
        <slot />
      </div>
    );
  }
}
