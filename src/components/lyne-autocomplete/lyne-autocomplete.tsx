import {
  Component,
  Element,
  h,
  Prop,
  State
} from '@stencil/core';
import inputEvents from '../lyne-text-input/lyne-text-input.events';
import itemsDataHelper from './lyne-autocomplete.helper';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-autocomplete.default.scss',
    shared: 'styles/lyne-autocomplete.shared.scss'
  },
  tag: 'lyne-autocomplete'
})

export class LyneAutocomplete {

  /**
   * Items to show in the autocomplete interface. You should pass a stringified
   * array of objects, containing the `text` key for each object with an
   * appropriate value.
   */
  @Prop() public items? = '[{"text": "pre ipsum item1 post lorem"},{"text": "pre ipsum item2 post lorem"},{"text": "pre ipsum item3 post lorem"}]';

  /**
   * The value to use as default value for the input. The input value or the
   * selected autocomplete value is reflected to this attribute.
   */
  @Prop({
    reflect: true
  }) public value?: string;

  @State() private _inputValue: string;
  @State() private _selectedAutocompleteValue: string;
  @State() private _isVisible = false;

  @Element() private _element: HTMLElement;

  private _listElement!: HTMLUListElement;

  private _handleFocus = (evt): void => {
    this._isVisible = true;
    console.log('focus', evt);
  };

  private _handleInput = (evt): void => {
    this._inputValue = evt.detail.value;

    this.value = evt.detail.value;
  };

  private _handleBlur = (evt): void => {
    this._isVisible = false;
    console.log('blur', evt);
  };

  private _handleListClick = (evt): void => {
    const {
      path
    } = evt;

    let firstElement = null;

    if (path.length > 0) {
      [firstElement] = path;
    }

    this._isVisible = false;

    this._selectedAutocompleteValue = firstElement.innerText;
    this.value = firstElement.innerText;
  };

  public componentDidLoad(): void {
    this._element.addEventListener('focus', this._handleFocus);
    this._element.addEventListener(inputEvents.input, this._handleInput);
    this._element.addEventListener('blur', this._handleBlur);
    this._listElement.addEventListener('click', this._handleListClick);
  }

  public disconnectCallback(): void {
    this._element.removeEventListener('focus', this._handleFocus);
    this._element.removeEventListener(inputEvents.input, this._handleInput);
    this._element.removeEventListener('blur', this._handleBlur);
    this._listElement.removeEventListener('click', this._handleListClick);
  }

  public render(): JSX.Element {

    const dataCheck = itemsDataHelper(this.items);
    let autocompleteClasses = 'autocomplete__list';

    if (this._isVisible) {
      autocompleteClasses += ' autocomplete__list--visible';
    }

    return (
      <div class='autocomplete'>

        <lyne-text-input
          class='autocomplete__input'
          inputAutoCompleteValue='off'
          inputName='textfield'
          inputType='text'
          label='Von'
          inputPlaceholder='z.B. Bern'
          labelVisible
          inputRequired
          eventId='sampleId'
          debounceInputEvent={200}
          inputAriaExpanded={this._isVisible}
          inputRole='combobox'
          inputAriaAutocomplete='list'
          inputAriaControls='autocomplete-list'
          inputValue={this.value || this._selectedAutocompleteValue}
        ></lyne-text-input>

        <ul
          class={autocompleteClasses}
          id='autocomplete-list'
          role='listbox'
          ref={(el): void => {
            this._listElement = el;
          }}
        >
          {dataCheck.map((item, index) => (
            <lyne-autocomplete-item
              text={item.text}
              highlight={this._inputValue}
              ariaSelected={false}
              ariaPosinset={index + 1}
              ariaSetsize={dataCheck.length}
            />
          ))}
        </ul>

        <p
          class='autocomplete__accessibility-hint'
          role='status'
          aria-live='polite'
          aria-atomic='true'
        >10 Ergebnisse sind verfügbar, verwenden Sie nach oben und unten Pfeiltasten um zu navigieren.</p>

      </div>
    );
  }
}
