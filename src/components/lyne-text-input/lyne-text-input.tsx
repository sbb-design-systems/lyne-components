import {
  Component,
  h,
  Prop
} from '@stencil/core';
// import events from './lyne-text-input.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nMandatoryField } from '../../global/i18n';
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

  private _additionalInputClasses = [];
  private _addtitionalInputAttributes = {}
  private _errorMessageId = '';
  private _labelAriaLabel = '';

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
  @Prop() public inputAutoCompleteValue?: InterfaceLyneTextInputAttributes['inputAutoCompleteValue'];

  /**
   * If set to true, the input field will
   * be disabled.
   */
  @Prop() public inputDisabled?: boolean;

  /**
   * If set to true, we will set an
   * an error message for the current
   * input field.
   */
  @Prop({
    reflect: true
  }) public inputError?: boolean;

  /**
   * Each input needs to have an individual id.
   * If no id is provided, the component will
   * create a unique id by itself.
   */
  @Prop() public inputId?: string;

  /** Pass on a expected max length. */
  @Prop() public inputMaxLength!: number;

  /** Pass on a expected min length. */
  @Prop() public inputMinLength!: number;

  /** Each input should have an individual name. */
  @Prop() public inputName!: string;

  /**
   * If set to true, an input in this field
   * will be required.
   */
  @Prop() public inputRequired!: boolean;

  /**
   * Add a validation pattern (regex) the input
   * should follow.
   * Read more here: https://mzl.la/3C3HTiG
   */
  @Prop() public inputPattern?: string;

  /**
   * Add a placeholder to show what kind of input
   * is expected.
   */
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

  /**
   * If set to true, the label will be visually
   * hidden but still be in the markup to provide
   * proper semantics
   */
  @Prop() public labelVisible?: true;

  private _getAdditionalStyleClasses(): void {

    this._additionalInputClasses = [];

    if (!this.labelVisible) {
      this._additionalInputClasses.push('input-wrapper--label-hidden');
    }

    if (this.icon) {
      this._additionalInputClasses.push('input-wrapper--with-icon');
    }

    if (this.inputError) {
      this._additionalInputClasses.push('input-wrapper--error');
    }

  }

  private _getAdditionalInputAttributes(): void {

    this._addtitionalInputAttributes = {};

    if (this.inputDisabled) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        disabled: true
      };
    }

    if (this.inputPattern) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        pattern: this.inputPattern
      };
    }

    if (this.inputMaxLength) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        maxlength: this.inputMaxLength
      };
    }

    if (this.inputMinLength) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        minlength: this.inputMinLength
      };
    }

    if (this.inputError) {
      this._errorMessageId = `error-${this.inputId}`;

      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        'aria-describedby': this._errorMessageId,
        'aria-invalid': 'true'
      };
    }

  }

  public componentWillLoad(): void {
    if (!this.inputId) {
      this.inputId = `input-${guid()}`;
    }
  }

  public render(): JSX.Element {

    const currentLanguage = getDocumentLang();

    this._getAdditionalStyleClasses();
    this._getAdditionalInputAttributes();

    /**
     * This will improve the announcement of the label
     * in Voice Over on iOS Safari
     */
    if (this.inputRequired) {
      this._labelAriaLabel = this.label
    } else {
      this._labelAriaLabel = `${this.label} ${i18nOptional[currentLanguage]}.`
    }

    return (
      <div
        class={`input-wrapper ${this._additionalInputClasses.join(' ')}`}
      >
        <div class='input-wrapper__inner'>
          {this.icon
            ? <span class='link__icon'><slot name='icon'/></span>
            : ''
          }
          <input
            autocomplete={this.inputAutoCompleteValue}
            class='input'
            id={this.inputId}
            name={this.inputName}
            placeholder={this.inputPlaceholder}
            required={this.inputRequired}
            type={this.inputType}
            {...this._addtitionalInputAttributes}
          />
          <label
            aria-label={this._labelAriaLabel}
            class='input-label'
            htmlFor={this.inputId}
          >
            <span
              aria-hidden='true'
              class='input-label--text'
            >
              {this.label}
            </span>
            {this.inputRequired
              ? ''
              : <span
                  aria-hidden='true'
                  class='input-label--optional'
                >
                  &nbsp;{i18nOptional[currentLanguage]}
                </span>
            }
          </label>
        </div>
        {this.inputError
          ? <lyne-input-error message-id={this._errorMessageId} message={i18nMandatoryField[currentLanguage]}></lyne-input-error>
          : ''
        }
      </div>
    );
  }
}
