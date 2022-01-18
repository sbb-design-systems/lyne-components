import {
  Component,
  Element,
  h,
  Prop,
  State
} from '@stencil/core';

import events from './lyne-autocomplete.events';
import inputEvents from '../lyne-text-input/lyne-text-input.events';
import listEvents from '../lyne-autocomplete-list/lyne-autocomplete-list.events';
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
  @Prop() public items?: string;

  /**
   * The value to use as default value for the input. The input value or the
   * selected autocomplete value is reflected to this attribute.
   */
  @Prop({
    reflect: true
  }) public value?: string;

  /**
   * Id which is sent as the id in the eventDetail payload when a
   * value is selected
   */
  @Prop() public eventId?: string;

  /**
   * Autocomplete id. If you use multiple instances on a page,
   * you should set individual id's to each of them.
   */
  @Prop() public autocompleteId? = 'autocomplete-list';

  /**
   * Define if borderless variant of autocomplete input should be used. See
   * documentation of lyne-text-input for details.
   */
  @Prop() public inputBorderless?: boolean;

  /**
   * Debounce timeout to use for the input. See documentation of
   * lyne-text-input for details.
   */
  @Prop() public inputDebounceTimeout? = 200;

  /**
   * Name attribute for the input element. See lyne-text-input for details.
   */
  @Prop() public inputName!: string;

  /**
   * Label attribute for the input element. See lyne-text-input for details.
   */
  @Prop() public inputLabel!: string;

  /**
   * Placeholder attribute for the input element. See lyne-text-input for
   * details.
   */
  @Prop() public inputPlaceholder?: string;

  /**
   * Determine if the input label should be visible.
   * See lyne-text-input for
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

  @Element() private _element: HTMLElement;

  private _inputElement!: HTMLLyneTextInputElement;
  private _list!: HTMLLyneAutocompleteListElement;

  private _handleKeyPress = (evt): void => {
    const {
      key
    } = evt;

    const event = new CustomEvent(events.keypress, {
      bubbles: false,
      composed: false,
      detail: key
    });

    /**
     * lyne-autocomplete-list listens to this event
     */
    this._list.dispatchEvent(event);
  };

  private _selectInputText = (): void => {
    const event = new CustomEvent('select', {
      bubbles: false,
      composed: false
    });

    /**
     * lyne-text-input listens to this event
     */
    this._inputElement.dispatchEvent(event);
  };

  private _focusInputElement = (): void => {
    const event = new CustomEvent('focus', {
      bubbles: false,
      composed: false
    });

    /**
     * lyne-text-input listens to this event
     */
    this._inputElement.dispatchEvent(event);
  };

  private _handleFocus = (): void => {
    this._showAutocompleteList();
    this._selectInputText();
  };

  private _handleInput = (evt): void => {
    this._inputValue = evt.detail.value;
    this.value = evt.detail.value;

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

  private _handleBlur = (): void => {
    this._isVisible = false;

    const eventDetail = {
      id: '',
      value: this.value
    };

    if (this.eventId) {
      eventDetail.id = this.eventId;
    }

    const event = new CustomEvent(events.selected, {
      bubbles: true,
      composed: true,
      detail: eventDetail
    });

    /**
     * consumers of lyne-autocomplete may listen to this event
     */
    this._element.dispatchEvent(event);
  };

  private _handleSelected = (evt): void => {
    const {
      value
    } = evt.detail;

    this.value = value;

    if (evt.detail.hide) {
      this._isVisible = false;
    }

  };

  public componentDidLoad(): void {
    this._element.addEventListener('focus', this._handleFocus);
    this._element.addEventListener('blur', this._handleBlur);

    this._inputElement.addEventListener(inputEvents.input, this._handleInput);
    this._inputElement.addEventListener('keydown', this._handleKeyPress);

    this._list.addEventListener(listEvents.selected, this._handleSelected);
    this._list.addEventListener(listEvents.setInputFocus, this._focusInputElement);
  }

  public disconnectCallback(): void {
    this._element.removeEventListener('focus', this._handleFocus);
    this._element.removeEventListener('blur', this._handleBlur);

    this._inputElement.removeEventListener(inputEvents.input, this._handleInput);
    this._inputElement.removeEventListener('keydown', this._handleKeyPress);

    this._list.removeEventListener(listEvents.selected, this._handleSelected);
    this._list.removeEventListener(listEvents.setInputFocus, this._focusInputElement);
  }

  public render(): JSX.Element {
    return (
      <div class='autocomplete'>

        <lyne-text-input
          inputAutoCompleteValue='off'
          inputName={this.inputName}
          inputType='text'
          label={this.inputLabel}
          inputPlaceholder={this.inputPlaceholder}
          labelVisible={this.inputLabelVisible}
          inputRequired
          debounceInputEvent={this.inputDebounceTimeout}
          borderless={this.inputBorderless}
          inputAriaExpanded={this._isVisible}
          inputRole='combobox'
          inputAriaAutocomplete='list'
          inputAriaControls={this.autocompleteId}
          inputValue={this.value}
          ref={(el): void => {
            this._inputElement = el;
          }}
        ></lyne-text-input>

        <lyne-autocomplete-list
          items={this.items}
          visible={this._isVisible}
          listId={this.autocompleteId}
          highlight={this._inputValue}
          ref={(el): void => {
            this._list = el;
          }}
        />
      </div>
    );
  }
}
