import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceLyneAutocompleteAttributes } from './lyne-autocomplete.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-autocomplete.default.scss',
    shared: 'styles/lyne-autocomplete.shared.scss'
  },
  tag: 'lyne-autocomplete'
})

export class LyneAutocomplete {

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneAutocompleteAttributes['someInterface'];

  public render(): JSX.Element {
    return (
      <div class='autocomplete'>
        <lyne-text-input
          class='autocomplete__input'
          inputName='textfield'
          inputType='text'
          label='Von'
          inputPlaceholder='z.B. Bern'
          labelVisible
          inputRequired
        ></lyne-text-input>
        <ul class='autocomplete__list'>
          <li class='autocomplete__list-item'>item 1</li>
        </ul>
      </div>
    );
  }
}
