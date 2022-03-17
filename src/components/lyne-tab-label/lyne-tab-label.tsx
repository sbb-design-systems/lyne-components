import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-tab-label.events';
import { InterfaceLyneTabLabelAttributes } from './lyne-tab-label.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-label.default.scss',
    shared: 'styles/lyne-tab-label.shared.scss'
  },
  tag: 'lyne-tab-label'
})

export class LyneTabLabel {

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneTabLabelAttributes['someInterface'];

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
