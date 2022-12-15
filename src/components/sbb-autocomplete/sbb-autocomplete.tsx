import { Component, ComponentInterface, Element, h, JSX, Prop, State } from '@stencil/core';

import { i18nUseArrowKeysToNavigate, i18nXResultsAvailable } from '../../global/i18n';

import events from './sbb-autocomplete.events';
import itemsDataHelper from './sbb-autocomplete.helper';
import getDocumentLang from '../../global/helpers/get-document-lang';

@Component({
  shadow: true,
  styleUrl: 'sbb-autocomplete.scss',
  tag: 'sbb-autocomplete',
})
export class SbbAutocomplete implements ComponentInterface {
  /**
   * Items to show in the autocomplete interface. You should pass a stringified
   * array of objects, containing the `text` key for each object with an
   * appropriate value.
   */
  @Prop() public items?: string;

  /**
   * The value to use as default value for the input. The input value or the
   * selected autocomplete value is reflected to this attribute.
   */
  @Prop({
    reflect: true,
  })
  public value?: string;

  /**
   * Id which is sent as the id in the eventDetail payload when a
   * value is selected
   */
  @Prop() public eventId?: string;

  /**
   * Autocomplete id.
   */
  private _autocompleteId = 'autocomplete-list';

  /**
   * Define if borderless variant of autocomplete input should be used. See
   * documentation of sbb-text-input for details.
   */
  @Prop() public inputBorderless?: boolean;

  /**
   * Debounce timeout to use for the input. See documentation of
   * sbb-text-input for details.
   */
  @Prop() public inputDebounceTimeout? = 200;

  /**
   * Name attribute for the input element. See sbb-text-input for details.
   */
  @Prop() public inputName!: string;

  /**
   * Label attribute for the input element. See sbb-text-input for details.
   */
  @Prop() public inputLabel!: string;

  /**
   * Placeholder attribute for the input element. See sbb-text-input for
   * details.
   */
  @Prop() public inputPlaceholder?: string;

  /**
   * Determine if the input label should be visible.
   * See sbb-text-input for
   * details.
   */
  @Prop() public inputLabelVisible?: boolean;

  /**
   * Define how many chars a user must type into the input field
   * for the autocomplete list to show up.
   */
  @Prop() public minChars? = 0;

  @State() private _inputValue: string;
  @State() private _isVisible = false;
  @State() private _selectedAutocompleteItemIndex = -1;

  @Element() private _element: HTMLElement;

  private _inputElement!: HTMLSbbFormFieldElement;
  private _list!: HTMLUListElement;
  private _dataItems!: [any];
  private _currentLanguage = getDocumentLang();
  private _userDidManipulateInputValue = false;
  private _initialInputValue = '';

  /**
   * ---------
   * key handling
   * ---------
   */
  private _handleArrowKeys = (key): void => {
    this._isVisible = true;

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

    this.value = this._dataItems[this._selectedAutocompleteItemIndex].text;

    const selectedElement = this._list.children[this._selectedAutocompleteItemIndex];

    selectedElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  private _handleEscapeKey = (): void => {
    if (this._userDidManipulateInputValue) {
      this.value = this._inputValue;
      this._initialInputValue = this.value;
    } else {
      if (this._initialInputValue && this._initialInputValue.length > 0) {
        this.value = this._initialInputValue;
        this._inputValue = this.value;
      } else {
        this.value = '';
        this._inputValue = '';
      }
    }

    this._isVisible = false;
    this._userDidManipulateInputValue = false;
  };

  private _handleEnterKey = (): void => {
    this.value = this._dataItems[this._selectedAutocompleteItemIndex].text;
    this._isVisible = false;

    this._handleBlur();
  };

  private _handleKeyPress = (evt): void => {
    const { key } = evt;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      this._handleArrowKeys(key);

      return;
    }

    if (key === 'Escape') {
      this._handleEscapeKey();

      return;
    }

    if (key === 'Enter') {
      this._handleEnterKey();
    }
  };

  private _handleInput = (evt): void => {
    this._inputValue = evt.target.value;
    this.value = evt.target.value;
    this._userDidManipulateInputValue = true;
    this._showAutocompleteList();
  };

  private _showAutocompleteList = (): void => {
    const items = itemsDataHelper(this.items);

    // ... if we don't have any autocomplete items.
    if (items.length < 1) {
      this._isVisible = false;

      return;
    }

    // ... if we don't have an input value, but minChars set to 0.
    if (!this._inputValue && this.minChars < 1) {
      this._isVisible = true;

      return;
    }

    // ... if we don't have a value or input is smaller than minChars.
    if (!this._inputValue || this._inputValue.length < this.minChars) {
      this._isVisible = false;

      return;
    }

    this._isVisible = true;
  };

  /**
   * ---------
   * User interaction
   * ---------
   */

  private _handleFocus = (): void => {
    this._showAutocompleteList();
  };

  private _handleBlur = (): void => {
    this._isVisible = false;
    this._initialInputValue = this.value;
    this._userDidManipulateInputValue = false;

    const eventDetail = {
      id: '',
      value: this.value,
    };

    if (this.eventId) {
      eventDetail.id = this.eventId;
    }

    const event = new CustomEvent(events.selected, {
      bubbles: true,
      composed: true,
      detail: eventDetail,
    });

    /**
     * consumers of sbb-autocomplete may listen to this event
     */
    this._element.dispatchEvent(event);
  };

  private _handleListClick = (evt): void => {
    const path = evt.composedPath();

    let firstElement = null;

    if (path.length > 0) {
      [firstElement] = path;
    }

    this.value = firstElement.innerText;
    this._isVisible = false;

    this._userDidManipulateInputValue = false;
  };

  /**
   * ---------
   * Component lifecycle
   * ---------
   */

  public componentDidLoad(): void {
    this._element.addEventListener('focus', this._handleFocus);
    this._element.addEventListener('blur', this._handleBlur);
    this._inputElement.querySelector('input').addEventListener('input', this._handleInput);
    this._inputElement.querySelector('input').addEventListener('keydown', this._handleKeyPress);
    this._list.addEventListener('click', this._handleListClick);

    this._initialInputValue = this.value;
  }

  public disconnectCallback(): void {
    this._element.removeEventListener('focus', this._handleFocus);
    this._element.removeEventListener('blur', this._handleBlur);
    this._inputElement.querySelector('input').removeEventListener('input', this._handleInput);
    this._inputElement.querySelector('input').removeEventListener('keydown', this._handleKeyPress);
    this._list.removeEventListener('click', this._handleListClick);
  }

  /**
   * ---------
   * render helpers
   * ---------
   */

  private _listClasses = (): string => {
    let listClasses = 'autocomplete__list';

    if (this._isVisible) {
      listClasses += ' autocomplete__list--visible';
    }

    return listClasses;
  };

  private _listAttributes = (): any => {
    const listAttributes = {};

    listAttributes['id'] = this._autocompleteId;

    if (!this._isVisible) {
      listAttributes['aria-hidden'] = true;
      listAttributes['role'] = 'presentation';
    }

    return listAttributes;
  };

  private _a11yHelpText = (): string => {
    let a11yHintText = '';
    let a11yArrowKeys = '';

    if (this._isVisible) {
      const a11yResults = i18nXResultsAvailable(this._dataItems.length)[this._currentLanguage];

      if (window.matchMedia('(pointer: fine)').matches) {
        a11yArrowKeys = i18nUseArrowKeysToNavigate[this._currentLanguage];
      }

      a11yHintText = `${a11yResults} ${a11yArrowKeys}`;
    }

    return a11yHintText;
  };

  public render(): JSX.Element {
    this._dataItems = itemsDataHelper(this.items);
    return (
      <div class="autocomplete">
        <sbb-form-field
          {...(this.inputLabelVisible && { label: this.inputLabel })}
          borderless={this.inputBorderless}
          ref={(el): void => {
            this._inputElement = el;
          }}
        >
          <input
            autocomplete="off"
            name={this.inputName}
            type="text"
            placeholder={this.inputPlaceholder}
            aria-expanded={this._isVisible}
            role="combobox"
            aria-autocomplete="list"
            aria-controls={this._autocompleteId}
            value={this.value}
          />
        </sbb-form-field>

        <p class="autocomplete__accessibility-hint" role="status" tabindex="-1">
          {this._a11yHelpText()}
        </p>

        <ul
          class={this._listClasses()}
          role="listbox"
          {...this._listAttributes()}
          ref={(el): void => {
            this._list = el;
          }}
        >
          {this._dataItems.map((item, index) => (
            <sbb-autocomplete-item
              text={item.text}
              highlight={this.value}
              selected={index === this._selectedAutocompleteItemIndex}
              ariaPosinset={index + 1}
              ariaSetsize={this._dataItems.length}
            />
          ))}
        </ul>
      </div>
    );
  }
}
