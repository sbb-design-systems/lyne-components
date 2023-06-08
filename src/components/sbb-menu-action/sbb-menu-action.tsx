import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  actionElementHandlerAspect,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

/**
 * @slot unnamed - Use this slot to provide the menu action label.
 * @slot icon - Use this slot to provide an icon. If `icon` is set, an sbb-icon will be used.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-menu-action.scss',
  tag: 'sbb-menu-action',
})
export class SbbMenuAction implements ComponentInterface, LinkButtonProperties {
  /**
   * The name of the icon, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Prop() public iconName?: string | undefined;

  /** Value shown as badge at component end. */
  @Prop() public amount?: string | undefined;

  /** The href value you want to link to (if it is not present menu action becomes a button). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** The type attribute to use for the button. */
  @Prop() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** The name attribute to use for the button. */
  @Prop({ reflect: true }) public name: string | undefined;

  /** The value attribute to use for the button. */
  @Prop() public value?: string;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l))
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      hostAttributes,
      attributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    return (
      <Host {...hostAttributes}>
        <TAG_NAME class="sbb-menu-action" {...attributes}>
          <span class="sbb-menu-action__content">
            <span class="sbb-menu-action__icon">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </span>
            <span class="sbb-menu-action__label">
              <slot />
            </span>
            {this.amount && !this.disabled && (
              <span class="sbb-menu-action__amount">{this.amount}</span>
            )}
          </span>
          {targetsNewWindow(this) && (
            <span class="sbb-menu-action__opens-in-new-window">
              . {i18nTargetOpensInNewWindow[this._currentLanguage]}
            </span>
          )}
        </TAG_NAME>
      </Host>
    );
  }
}
