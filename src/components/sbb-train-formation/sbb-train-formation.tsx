import { Component, Element, h, JSX, Prop } from '@stencil/core';
import events from './sbb-train-formation.events';
import { InterfaceSbbTrainFormationAttributes } from './sbb-train-formation.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train-formation.scss',
  tag: 'sbb-train-formation',
})
export class SbbTrainFormation {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbTrainFormationAttributes['someInterface'];

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
