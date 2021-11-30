import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-autocomplete.default.scss',
    shared: 'styles/lyne-autocomplete.shared.scss'
  },
  tag: 'lyne-autocomplete'
})

export class LyneAutocomplete {

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
          <lyne-autocomplete-item
            text='pre ipsum item1 post lorem'
            highlight='tem'
          >
          </lyne-autocomplete-item>
          <lyne-autocomplete-item text='item2'>
          </lyne-autocomplete-item>
        </ul>
      </div>
    );
  }
}
