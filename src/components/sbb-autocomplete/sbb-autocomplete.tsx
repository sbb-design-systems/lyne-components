import { Component, ComponentInterface, Element, h, JSX, Prop } from '@stencil/core';
import events from './sbb-autocomplete.events';
import { InterfaceSbbAutocompleteAttributes } from './sbb-autocomplete.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-autocomplete.scss',
  tag: 'sbb-autocomplete',
})
export class SbbAutocomplete implements ComponentInterface {
  /** Documentation for someProp */
  @Prop()
  public someProp?: InterfaceSbbAutocompleteAttributes['someInterface'];

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
