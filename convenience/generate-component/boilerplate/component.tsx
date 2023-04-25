import { Component, ComponentInterface, Element, h, JSX, Prop } from '@stencil/core';
import events from './__name__.events';
import { Interface__nameUpperCase__Attributes } from './__name__.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: '__name__.scss',
  tag: '__name__',
})
export class __nameUpperCase__ implements ComponentInterface {
  /** Documentation for someProp */
  @Prop()
  public someProp?: Interface__nameUpperCase__Attributes['someInterface'];

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
      <button class="__name__" onClick={this._clickHandler}>
        {this.someProp}
      </button>
    );
  }
}
