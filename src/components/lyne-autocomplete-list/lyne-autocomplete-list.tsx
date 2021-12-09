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

import events from './lyne-autocomplete-list.events';
import autocompleteEvents from '../lyne-autocomplete/lyne-autocomplete.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
import itemsDataHelper from './lyne-autocomplete-list.helper';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-autocomplete-list.default.scss',
    shared: 'styles/lyne-autocomplete-list.shared.scss'
  },
  tag: 'lyne-autocomplete-list'
})

export class LyneAutocompleteList {

  /**
   * Items to show in the autocomplete interface. You should pass a stringified
   * array of objects, containing the `text` key for each object with an
   * appropriate value.
   */
  @Prop() public items? = '[{"text": "pre ipsum item1 post lorem"},{"text": "pre ipsum item2 post lorem"},{"text": "pre ipsum item3 post lorem"},{"text": "pre ipsum item4 post lorem"},{"text": "pre ipsum item5 post lorem"},{"text": "pre ipsum item6 post lorem"},{"text": "pre ipsum item7 post lorem"},{"text": "pre ipsum item8 post lorem"},{"text": "pre ipsum item9 post lorem"},{"text": "pre ipsum item10 post lorem"}]';

  /**
   * Determine if the list should be visible or not.
   */
  @Prop({
    reflect: true
  }) public visible = false;

  /**
   * Id to use for the list.
   */
  @Prop() public listId?: string;

  /**
   * The string to search for as highlight in the list items.
   */
  @Prop() public highlight?: string;

  /**
   * The index of the list item which should be currently selected.
   */
  @Prop() public selectedIndex?: number;

  @State() private _selectedAutocompleteItemIndex = -1;

  @Element() private _element: HTMLElement;

  private _list!: HTMLUListElement;
  private _currentLanguage = getDocumentLang();
  private _dataItems!: [any];

  /**
   * ---------
   * key handling
   * ---------
   */
  private _handleArrowKeys = (key): void => {
    this.visible = true;

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

    const selectedElement = this._list.children[this._selectedAutocompleteItemIndex];

    selectedElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

  };

  private _handleEscapeKey = (): void => {
    this.visible = false;
  };

  private _handleEnterKey = (): void => {
    const value = this._dataItems[this._selectedAutocompleteItemIndex].text;

    this._propagateSelection(value);
    this.visible = false;

  };

  private _handleKeyPress = (evt: CustomEvent): void => {
    const key = evt.detail;

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

  /**
   * ---------
   * outside communication
   * ---------
   */
  private _propagateSelection = (value: string): void => {
    const event = new CustomEvent(events.selected, {
      bubbles: false,
      composed: true,
      detail: value
    });

    this._list.dispatchEvent(event);
  };

  private _setInputFocus = (): void => {
    const event = new CustomEvent(events.setInputFocus, {
      bubbles: false,
      composed: true
    });

    this._list.dispatchEvent(event);
  };

  /**
   * ---------
   * other interactions
   * ---------
   */
  private _handleListClick = (evt): void => {
    const {
      path
    } = evt;

    let firstElement = null;

    if (path.length > 0) {
      [firstElement] = path;
    }

    const value = firstElement.innerText;

    this._propagateSelection(value);
    this.visible = false;

    this._setInputFocus();
  };

  /**
   * ---------
   * render helpers
   * ---------
   */

  private _listClasses = (): string => {
    let listClasses = 'autocomplete-list__list';

    if (this.visible) {
      listClasses += ' autocomplete-list__list--visible';
    }

    return listClasses;
  };

  private _listAttributes = (): any => {
    const listAttributes = {};

    if (this.listId) {
      listAttributes['id'] = this.listId;
    }

    if (!this.visible) {
      listAttributes['aria-hidden'] = true;
      listAttributes['role'] = 'presentation';
    }

    return listAttributes;
  };

  private _a11yHelpText = (): string => {
    let a11yHintText = '';

    if (this.visible) {
      const a11yResults = i18nXResultsAvailable(this._dataItems.length)[this._currentLanguage];
      const a11yArrowKeys = i18nUseArrowKeysToNavigate[this._currentLanguage];

      a11yHintText = `${a11yResults} ${a11yArrowKeys}`;
    }

    return a11yHintText;
  };

  /**
   * ---------
   * lifecycle
   * ---------
   */
  public componentDidLoad(): void {
    this._element.addEventListener(autocompleteEvents.keypress, this._handleKeyPress);
    this._list.addEventListener('click', this._handleListClick);
  }

  public disconnectCallback(): void {
    this._element.removeEventListener(autocompleteEvents.keypress, this._handleKeyPress);
    this._list.removeEventListener('click', this._handleListClick);
  }

  public render(): JSX.Element {
    this._dataItems = itemsDataHelper(this.items);

    return (
      <div class='autocomplete-list'>
        <ul
          class={this._listClasses()}
          role='listbox'
          {...this._listAttributes()}
          ref={(el): void => {
            this._list = el;
          }}
        >

          {this._dataItems.map((item, index) => (
            <lyne-autocomplete-item
              text={item.text}
              highlight={this.highlight}
              selected={index === this._selectedAutocompleteItemIndex}
              ariaPosinset={index + 1}
              ariaSetsize={this._dataItems.length}
            />
          ))}
        </ul>

        <p
          class='autocomplete-list__accessibility-hint'
          role='status'
          aria-live='polite'
          aria-atomic='true'
        >{this._a11yHelpText()}</p>
      </div>
    );
  }
}
