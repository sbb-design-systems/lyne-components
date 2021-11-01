import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-link-list.events';
import { InterfaceLyneLinkListAttributes } from './lyne-link-list.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-link-list.default.scss',
    shared: 'styles/lyne-link-list.shared.scss'
  },
  tag: 'lyne-link-list'
})

export class LyneLinkList {

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneLinkListAttributes['someInterface'];

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
