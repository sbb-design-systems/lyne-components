import {
  Component,
  Element,
  h,
  Prop,
  State
} from '@stencil/core';

import {
  i18nUseArrowKeysToNavigate,
  i18nXResultsAvailable
} from '../../global/i18n';

import getDocumentLang from '../../global/helpers/get-document-lang';
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
  @State() private _selectedAutocompleteItemIndex = -1;

  @Element() private _element: HTMLElement;

  private _currentLanguage = getDocumentLang();
  private _dataItems!: [any];
  private _inputElement!: HTMLLyneTextInputElement;
  private _listElement!: HTMLUListElement;

  private _handleArrowKeys = (key): void => {
    const isDownKey = key === 'ArrowDown';

    if (isDownKey) {
      if (this._selectedAutocompleteItemIndex < this._dataItems.length - 1) {
        this._selectedAutocompleteItemIndex++;
      } else {
        this._selectedAutocompleteItemIndex = 0;
      }
    } else {
      if (this._selectedAutocompleteItemIndex > 0) {
        this._selectedAutocompleteItemIndex--;
      } else {
        this._selectedAutocompleteItemIndex = this._dataItems.length - 1;
      }
    }
  };

  private _handleEscapeKey = (): void => {
    this._handleBlur();
  };

  private _handleKeyPress = (evt): void => {

    const {
      key
    } = evt;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      this._handleArrowKeys(key);

      return;
    }

    if (key === 'Escape') {
      this._handleEscapeKey();
    }

  };

  private _handleFocus = (evt): void => {
    this._isVisible = true;
    console.log('focus', evt);

    this._inputElement.addEventListener('keydown', this._handleKeyPress);
  };

  private _handleInput = (evt): void => {
    console.log('input');

    this._inputValue = evt.detail.value;

    this.value = evt.detail.value;
  };

  private _handleBlur = (): void => {
    this._isVisible = false;
    console.log('blur');

    this._inputElement.removeEventListener('keydown', this._handleKeyPress);
  };

  private _handleListClick = (evt): void => {
    const {
      path
    } = evt;

    let firstElement = null;

    if (path.length > 0) {
      [firstElement] = path;
    }

    this._selectedAutocompleteValue = firstElement.innerText;
    this.value = firstElement.innerText;
    this._handleBlur();
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

    this._dataItems = itemsDataHelper(this.items);
    let autocompleteClasses = 'autocomplete__list';

    if (this._isVisible) {
      autocompleteClasses += ' autocomplete__list--visible';
    }

    const listAttributes = {};

    if (!this._isVisible) {
      listAttributes['aria-hidden'] = true;
      listAttributes['role'] = 'presentation';
    }

    let a11yHintText = '';

    if (this._isVisible) {
      const a11yResults = i18nXResultsAvailable(this._dataItems.length)[this._currentLanguage];
      const a11yArrowKeys = i18nUseArrowKeysToNavigate[this._currentLanguage];

      a11yHintText = `${a11yResults} ${a11yArrowKeys}`;
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
          ref={(el): void => {
            this._inputElement = el;
          }}
        ></lyne-text-input>

        <ul
          class={autocompleteClasses}
          id='autocomplete-list'
          role='listbox'
          ref={(el): void => {
            this._listElement = el;
          }}
          {...listAttributes}
        >

          {this._dataItems.map((item, index) => (
            <lyne-autocomplete-item
              text={item.text}
              highlight={this._inputValue}
              itemSelected={index === this._selectedAutocompleteItemIndex}
              ariaPosinset={index + 1}
              ariaSetsize={this._dataItems.length}
            />
          ))}
        </ul>

        <p
          class='autocomplete__accessibility-hint'
          role='status'
          aria-live='polite'
          aria-atomic='true'
        >{a11yHintText}</p>

      </div>
    );
  }
}
