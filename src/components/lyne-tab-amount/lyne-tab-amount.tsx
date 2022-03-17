import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-tab-amount.events';
import { InterfaceLyneTabAmountAttributes } from './lyne-tab-amount.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-amount.default.scss',
    shared: 'styles/lyne-tab-amount.shared.scss'
  },
  tag: 'lyne-tab-amount'
})

export class LyneTabAmount {

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneTabAmountAttributes['someInterface'];

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
