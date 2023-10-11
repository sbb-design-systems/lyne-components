import {
  Component,
  ComponentInterface,
  Element,
  Listen,
  h,
  Host,
  JSX,
  State,
  Prop,
} from '@stencil/core';
import { ButtonProperties, resolveButtonRenderVariables } from '../../global/interfaces';
import { hostContext, isValidAttribute } from '../../global/dom';
import {
  HandlerRepository,
  actionElementHandlerAspect,
  documentLanguage,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { i18nClearInput } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrl: 'sbb-form-field-clear.scss',
  tag: 'sbb-form-field-clear',
})
export class SbbFormFieldClear implements ComponentInterface {
  /** Negative coloring variant flag. */
  @Prop({ reflect: true, mutable: true }) public negative = false;

  @Element() private _element!: HTMLElement;

  @State() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );
  private _formField: HTMLSbbFormFieldElement;

  @Listen('click')
  public async handleClick(): Promise<void> {
    const input = await this._formField.getInputElement();
    if (!input || input.tagName !== 'INPUT') {
      return;
    }
    await this._formField.clear();
    input.focus();
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._formField =
      (hostContext('sbb-form-field', this._element) as HTMLSbbFormFieldElement) ??
      (hostContext('[data-form-field]', this._element) as HTMLSbbFormFieldElement);

    if (this._formField) {
      this.negative = isValidAttribute(this._formField, 'negative');
    }
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const { hostAttributes } = resolveButtonRenderVariables(this as ButtonProperties);

    return (
      <Host {...hostAttributes} slot="suffix" aria-label={i18nClearInput[this._currentLanguage]}>
        <span class="sbb-form-field-clear">
          <sbb-icon name="cross-small" />
        </span>
      </Host>
    );
  }
}
