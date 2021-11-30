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
      <div>
        <lyne-text-input
          inputName='textfield'
          inputType='text'
          label='Von'
          inputPlaceholder='z.B. Bern'
          labelVisible
          inputRequired
        ></lyne-text-input>
        <ul class='autocomplete__list'>
          <lyne-autocomplete-item text='item1'></lyne-autocomplete-item>
          <lyne-autocomplete-item text='item2'></lyne-autocomplete-item>
        </ul>
      </div>
    );
  }
}
