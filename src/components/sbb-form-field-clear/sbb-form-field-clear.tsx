import {
  Component,
  ComponentInterface,
  Element,
  Listen,
  h,
  Host,
  JSX,
  Prop,
  State,
} from '@stencil/core';
import { ButtonProperties, resolveButtonRenderVariables } from '../../global/interfaces';
import { findInput, hostContext, isValidAttribute, toggleDatasetEntry } from '../../global/dom';
import {
  HandlerRepository,
  actionElementHandlerAspect,
  documentLanguage,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { i18nClearInput } from '../../global/i18n';
import { AgnosticMutationObserver } from '../../global/observers';

/**
 * @slot unnamed - Slot to render the content.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-form-field-clear.scss',
  tag: 'sbb-form-field-clear',
})
export class SbbFormFieldClear implements ComponentInterface, ButtonProperties {
  /**
   * The name attribute to use for the clear button.
   */
  @Prop({ reflect: true }) public name: string | undefined;

  @Element() private _element!: HTMLElement;

  @State() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );
  private _formField: HTMLSbbFormFieldElement;
  private _input: HTMLInputElement | HTMLSelectElement;
  private _formFieldbserver = new AgnosticMutationObserver(() => this._updateClearButton());

  @Listen('click')
  public async handleClick(): Promise<void> {
    this._input.value = '';
    this._input.focus();
    this._input.addEventListener('input', () => this._updateClearButton(), { once: true });
    toggleDatasetEntry(this._element, 'visible', false);
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._formField =
      (hostContext('sbb-form-field', this._element) as HTMLSbbFormFieldElement) ??
      (hostContext('[data-form-field]', this._element) as HTMLSbbFormFieldElement);
    this._formFieldbserver.observe(this._formField, {
      attributeFilter: ['data-disabled', 'data-readonly', 'data-input-empty'],
    });
    this._input = findInput(this._element) ?? this._formField.querySelector('select');
    this._updateClearButton();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._formFieldbserver.disconnect();
  }

  private _updateClearButton(): void {
    toggleDatasetEntry(
      this._element,
      'visible',
      !isValidAttribute(this._formField, 'data-input-empty') &&
        !isValidAttribute(this._formField, 'data-disabled') &&
        !isValidAttribute(this._formField, 'data-readonly'),
    );
    toggleDatasetEntry(
      this._element,
      'disabled',
      !isValidAttribute(this._formField, 'data-disabled'),
    );
  }

  public render(): JSX.Element {
    const { hostAttributes } = resolveButtonRenderVariables(this);

    return (
      <Host {...hostAttributes} slot="suffix" aria-label={i18nClearInput[this._currentLanguage]}>
        <span class="sbb-form-field-clear">
          <sbb-icon name="cross-small" />
        </span>
      </Host>
    );
  }
}
