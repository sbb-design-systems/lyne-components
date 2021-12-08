import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-autocomplete-list.events';
import { InterfaceLyneAutocompleteListAttributes } from './lyne-autocomplete-list.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-autocomplete-list.default.scss',
    shared: 'styles/lyne-autocomplete-list.shared.scss'
  },
  tag: 'lyne-autocomplete-list'
})

export class LyneAutocompleteList {

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneAutocompleteListAttributes['someInterface'];

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
