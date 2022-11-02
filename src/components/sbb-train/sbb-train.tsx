import { Component, Element, h, JSX, Prop } from '@stencil/core';
import events from './sbb-train.events';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train.scss',
  tag: 'sbb-train',
})
export class SbbTrain {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbTrainAttributes['someInterface'];

  @Element() private _element: HTMLElement;

  private _clickHandler = (): void => {
    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: 'some event detail',
    });

    this._element.dispatchEvent(event);
  };

  public render(): JSX.Element {
    return (
      <button class="some-class" onClick={this._clickHandler}>
        {this.someProp}
      </button>
    );
  }
}
