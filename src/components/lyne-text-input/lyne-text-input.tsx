import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-text-input.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
import {
  i18nMandatoryField,
  i18nOptional
} from '../../global/i18n';
import { InterfaceLyneTextInputAttributes } from './lyne-text-input.custom.d';
import { guid } from '../../global/guid';
import debounce from '../../global/helpers/debounce';

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

  private _inputElement!: HTMLInputElement;
  private _additionalInputClasses = [];
  private _additionalInputWrapperClasses = [];
  private _addtitionalInputAttributes = {};
  private _currentLanguage = getDocumentLang();
  private _id = '';
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
  @Prop() public inputMaxLength?: number;

  /** Pass on a expected min length. */
  @Prop() public inputMinLength?: number;

  /** Each input should have an individual name. */
  @Prop() public inputName!: string;

  /**
   * If set to true, an input in this field
   * will be required.
   */
  @Prop() public inputRequired?: boolean;

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

  /**
   * Value for the input element.
   */
  @Prop() public inputValue?: string;

  /**
   * Id which is sent as the id in the eventDetail payload
   */
  @Prop() public eventId?: string;

  /**
   * Debounce type for the input change event in ms. If you set this value
   * to e.g. 300, we fire the input event only every 300ms.
   */
  @Prop() public debounceInputEvent? = 0;

  /**
   * If set to true, the input element will have no border, but a drop shadow.
   */
  @Prop() public borderless = false;

  /**
   * The role attribute used for the input element.
   */
  @Prop() public inputRole?: InterfaceLyneTextInputAttributes['inputRole'];

  /**
   * Set aria-expanded on the input element.
   */
  @Prop() public inputAriaExpanded? = false;

  /**
   * The aria-autocomplete attribute for the input element.
   */
  @Prop() public inputAriaAutocomplete?: InterfaceLyneTextInputAttributes['inputAriaAutocomplete'];

  /**
   * The id to use as the aira-controls attribute for the input element.
   */
  @Prop() public inputAriaControls?: string;

  @Element() private _element: HTMLElement;

  private _dispatchEvent = (evt: any): void => {
    evt.stopImmediatePropagation();
    evt.preventDefault();

    const eventDetail = {
      id: '',
      value: this._inputElement.value
    };

    if (this.eventId) {
      eventDetail.id = this.eventId;
    }

    const event = new CustomEvent(events[evt.type], {
      bubbles: true,
      composed: true,
      detail: eventDetail
    });

    this._element.dispatchEvent(event);
  };

  private _getAdditionalStyleClasses(): void {

    this._additionalInputWrapperClasses = [];

    if (!this.labelVisible) {
      this._additionalInputWrapperClasses.push('input-wrapper--label-hidden');
    }

    if (this.icon) {
      this._additionalInputWrapperClasses.push('input-wrapper--with-icon');
    }

    if (this.inputError) {
      this._additionalInputWrapperClasses.push('input-wrapper--error');
    }

    if (this.borderless) {
      this._additionalInputClasses.push('input--no-border');
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
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        'aria-invalid': 'true'
      };
    }

    if (this.inputRole) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        role: this.inputRole
      };
    }

    if (this.inputAriaExpanded) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        'aria-expanded': this.inputAriaExpanded
      };
    }

    if (this.inputAriaAutocomplete) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        'aria-autocomplete': this.inputAriaAutocomplete
      };
    }

    if (this.inputAriaControls) {
      this._addtitionalInputAttributes = {
        ...this._addtitionalInputAttributes,
        'aria-controls': this.inputAriaControls
      };
    }

  }

  /**
   * TODO
   * modify lyne-button to allow for icon toggle
   * and add toggle handling in here.
   */
  private _registerShowPasswordToggle(): void {

    /**
     * if (this.inputAutoCompleteValue !== 'new-password') {
     *  return;
     *}
     */

  }

  /**
   * This will improve the announcement of the label
   * in Voice Over on iOS Safari
   */
  private _prepareAriaLabelOfLabel(): void {

    if (this.inputRequired) {
      this._labelAriaLabel = this.label;
    } else {
      this._labelAriaLabel = `${this.label} ${i18nOptional[this._currentLanguage]}.`;
    }

    if (this.inputError) {
      this._labelAriaLabel += `. ${i18nMandatoryField[this._currentLanguage]}`;
    }
  }

  private _handleNativeSelect = (): void => {
    this._inputElement.select();
  };

  private _handleNativeFocus = (): void => {
    this._inputElement.focus();
  };

  public componentWillLoad(): void {
    if (this.inputId) {
      this._id = this.inputId;
    } else {
      this._id = `input-${guid()}`;
    }
  }

  public componentDidLoad(): void {
    this._element.addEventListener('select', this._handleNativeSelect);
    this._element.addEventListener('focus', this._handleNativeFocus);
  }

  public disconnectCallback(): void {
    this._element.removeEventListener('select', this._handleNativeSelect);
    this._element.removeEventListener('focus', this._handleNativeFocus);
  }

  public render(): JSX.Element {

    this._getAdditionalStyleClasses();
    this._getAdditionalInputAttributes();
    this._registerShowPasswordToggle();
    this._prepareAriaLabelOfLabel();

    /**
     * Adding the aria-hidden attributes here might
     * seem to be a very wrong choice. Since we are
     * including the error message inside of the
     * aria-label value of the label element though,
     * we need to hide some elements from assistive
     * technology here. By doing so, we can improve
     * the user flow through the form, especially
     * on Voice Over on iOS which would otherwise
     * stop at and read all elements individually.
     * This was tested in various Desktop Browsers
     * with JAWS and NVDA as well.
     */

    return (
      <div
        class={`input-wrapper ${this._additionalInputWrapperClasses.join(' ')}`}
      >
        <div class='input-wrapper__inner'>
          {this.icon
            ? <span class='input__icon'><slot name='icon'/></span>
            : ''
          }
          <input
            autocapitalize='off'
            autocomplete={this.inputAutoCompleteValue}
            class={`input ${this._additionalInputClasses.join(' ')}`}
            id={this._id}
            name={this.inputName}
            placeholder={this.inputPlaceholder}
            required={this.inputRequired}
            type={this.inputType}
            onInput={debounce(this._dispatchEvent, this.debounceInputEvent)}
            {...this._addtitionalInputAttributes}
            ref={(el): void => {
              this._inputElement = el;
            }}
            value={this.inputValue || ''}
          />
          <label
            aria-label={this._labelAriaLabel}
            class='input-label'
            htmlFor={this._id}
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
                &nbsp;{i18nOptional[this._currentLanguage]}
              </span>
            }
          </label>
        </div>
        {this.inputError
          ? <lyne-input-error message={i18nMandatoryField[this._currentLanguage]}></lyne-input-error>
          : ''
        }
      </div>
    );
  }
}
