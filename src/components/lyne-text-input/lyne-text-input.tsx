/* eslint-disable */

import {
  Component,
  h,
  Prop
} from '@stencil/core';
// import events from './lyne-text-input.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nOptional } from '../../global/i18n';
import { InterfaceLyneTextInputAttributes } from './lyne-text-input.custom.d';
import { guid } from '../../global/guid';

/**
 * @slot icon - Slot used to display the icon, if one is set
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-text-input.default.scss',
    shared: 'styles/lyne-text-input.shared.scss'
  },
  tag: 'lyne-text-input'
})

export class LyneTextInput {

  /**
   * The icon name we want to use,
   * choose from the small icon variants from
   * the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public icon?: string;

  /**
   * Choose either on, off or one of the existing
   * autocomplete values. Read more about them
   * here: https://mzl.la/3wpfaDV
   */
  @Prop() public inputAutoCompleteValue?: InterfaceLyneTextInputAttributes['inputAutoCompleteValue'] = 'off';

  /**
   * If set to true, the input field will
   * be disabled.
   * */
  @Prop() public inputDisabled?: boolean;

  /** Each input should have an individual id. */
  @Prop() public inputId?: string;

  /** Each input should have an individual name. */
  @Prop() public inputName!: string;

  /**
   * If set to true, an input in this field
   * will be required.
   */
  @Prop() public inputRequired!: boolean;

  /** Add a placeholder to show what kind of input
   * is expected. */
  @Prop() public inputPlaceholder?: string;

  /**
   * Define which input type you would like
   * to use. Read more about the individual
   * advantages here, most of the are related
   * to show the user the most convienient
   * keyboard: https://bit.ly/3wuQE47
   */
  @Prop() public inputType!: string;

  /**
   * Each input element needs to have a label
   * associated with it.
   */
  @Prop() public label!: string;

  @Prop() public requiredValue?: false;

  /* @Element() private _element: HTMLElement;

  private _clickHandler = (): void => {

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: 'some event detail'
    });

    this._element.dispatchEvent(event);
  }; */


  public componentWillLoad(): void {
    if (!this.inputId) {
      this.inputId = `input-` + guid();
    }
  }

  public render(): JSX.Element {

    const currentLanguage = getDocumentLang();

    /**
     * Add additional attributes
     * ----------------------------------------------------------------
     */
    let addtitionalInputAttributes = {};

    if (this.inputDisabled) {
      addtitionalInputAttributes = {
        ...addtitionalInputAttributes,
        disabled: true
      };
    }

    return (
      <div
        class='input-wrapper'
        role='none'
      >
        <input
          autocomplete={this.inputAutoCompleteValue}
          class='input'
          id={this.inputId}
          name={this.inputName}
          placeholder={this.inputPlaceholder}
          required={this.requiredValue}
          type={this.inputType}
          {...addtitionalInputAttributes}
        />
        <label
          class='input-label'
          htmlFor={this.inputId}
        >
          {this.icon
            ? <span class='link__icon'><slot name='icon'/></span>
            : ''
          }
          {this.label}
          {this.inputRequired
            ? ''
            : ` ${i18nOptional[currentLanguage]}`
          }
        </label>
      </div>
    );
  }
}
