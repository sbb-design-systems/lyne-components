import { Component, Element, h, JSX, Prop } from '@stencil/core';
import events from './sbb-sector.events';
import { InterfaceSbbSectorAttributes } from './sbb-sector.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-sector.scss',
  tag: 'sbb-sector',
})
export class SbbSector {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbSectorAttributes['someInterface'];

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
