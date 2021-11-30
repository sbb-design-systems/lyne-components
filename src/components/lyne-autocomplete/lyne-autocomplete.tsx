import {
  Component,
  Element,
  h,
  Prop,
  State
} from '@stencil/core';
import itemEvents from '../lyne-text-input/lyne-text-input.events';
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
  @Prop() public items? = '[{"text": "pre ipsum item1 post lorem"},{"text": "pre ipsum item2 post lorem"}]';

  /**
   * Set if the autocomplete interface should be shown or hidden.
   */
  @Prop() public visible = true;

  @State() private _inputValue: string;
  @Element() private _element: HTMLElement;

  /*
   * private _handleFocus = (evt): void => {
   *   console.log('focus', evt.detail.value);
   * };
   * private _handleBlur = (evt): void => {
   *   console.log('blur', evt.detail.value);
   * };
   */

  private _handleInput = (evt): void => {
    console.log('input', evt.detail.value);
    this._inputValue = evt.detail.value;
  };

  public componentWillLoad(): void {
    // this._element.addEventListener(itemEvents.focus, this._handleFocus);

    // this._element.addEventListener(itemEvents.blur, this._handleBlur);

    this._element.addEventListener(itemEvents.input, this._handleInput);
  }

  public disconnectCallback(): void {

    // this._element.removeEventListener(itemEvents.focus, this._handleFocus);

    // this._element.removeEventListener(itemEvents.blur, this._handleBlur);

    this._element.removeEventListener(itemEvents.input, this._handleInput);
  }

  public render(): JSX.Element {

    const dataCheck = itemsDataHelper(this.items);
    let autocompleteClasses = 'autocomplete__list';

    if (this.visible) {
      autocompleteClasses += ' autocomplete__list--visible';
    }

    return (
      <div>

        <lyne-text-input
          inputName='textfield'
          inputType='text'
          label='Von'
          inputPlaceholder='z.B. Bern'
          labelVisible
          inputRequired
          eventId='sampleId'
          debounceInputEvent={200}
        ></lyne-text-input>

        <ul class={autocompleteClasses}>
          {dataCheck.map((item) => (
            <div>
              <lyne-autocomplete-item
                text={item.text}
                highlight={this._inputValue}
              >
              </lyne-autocomplete-item>
            </div>
          ))}
        </ul>

      </div>
    );
  }
}
