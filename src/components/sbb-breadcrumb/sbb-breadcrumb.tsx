import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  LinkProperties,
  LinkTargetType,
  resolveLinkOrStaticRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  actionElementHandlerAspect,
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';

/**
 * @slot unnamed - Use this for the breadcrumb's text.
 * @slot icon - Slot used to display a breadcrumb icon.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-breadcrumb.scss',
  tag: 'sbb-breadcrumb',
})
export class SbbBreadcrumb implements ComponentInterface, LinkProperties {
  /** The href value you want to link to. */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   * Inline variant doesn't support icons.
   */
  @Prop() public iconName?: string;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
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
      attributes,
      hostAttributes,
    } = resolveLinkOrStaticRenderVariables(this);

    return (
      <Host {...hostAttributes}>
        <TAG_NAME class="sbb-breadcrumb" {...attributes}>
          {(this.iconName || this._namedSlots.icon) && (
            <span class="sbb-breadcrumb__icon">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </span>
          )}
          <span class="sbb-breadcrumb__label">
            <slot />
            {targetsNewWindow(this) && (
              <span class="sbb-breadcrumb__label--opens-in-new-window">
                . {i18nTargetOpensInNewWindow[this._currentLanguage]}
              </span>
            )}
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
