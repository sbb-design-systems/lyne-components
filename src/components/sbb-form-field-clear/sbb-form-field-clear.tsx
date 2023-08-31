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
import { hostContext } from '../../global/dom';
import {
  HandlerRepository,
  actionElementHandlerAspect,
  documentLanguage,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { i18nClearInput } from '../../global/i18n';

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

  @Listen('click')
  public async handleClick(): Promise<void> {
    this._formField.clear();
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._formField =
      (hostContext('sbb-form-field', this._element) as HTMLSbbFormFieldElement) ??
      (hostContext('[data-form-field]', this._element) as HTMLSbbFormFieldElement);
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
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
