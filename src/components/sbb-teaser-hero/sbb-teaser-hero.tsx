import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  LinkProperties,
  LinkTargetType,
  resolveLinkOrStaticRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  linkHandlerAspect,
} from '../../global/helpers';

/**
 * @slot unnamed - text content of panel
 * @slot link-content - link content of the panel
 * @slot image - the background image, can be a `sbb-image`
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-teaser-hero.scss',
  tag: 'sbb-teaser-hero',
})
export class SbbTeaserHero implements ComponentInterface, LinkProperties {
  /** The href value you want to link to. */
  @Prop() public href: string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** Panel link text. */
  @Prop() public linkContent?: string;

  /** Image src will be passed to `sbb-image`. */
  @Prop() public imageSrc?: string;

  /** Image alt text will be passed to `sbb-image`. */
  @Prop() public imageAlt?: string;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    linkHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
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
        <TAG_NAME class="sbb-teaser-hero" {...attributes}>
          <span class="sbb-teaser-hero__panel">
            <p class="sbb-teaser-hero__panel-text">
              <slot />
            </p>
            {this.href && (
              <sbb-link
                class="sbb-teaser-hero__panel-link"
                icon-name="chevron-small-right-small"
                icon-placement="end"
                size="m"
                negative
              >
                <slot name="link-content">{this.linkContent}</slot>
              </sbb-link>
            )}
          </span>
          <slot name="image">
            {this.imageSrc && <sbb-image image-src={this.imageSrc} alt={this.imageAlt}></sbb-image>}
          </slot>
          {targetsNewWindow(this) && (
            <span class="sbb-teaser-hero__opens-in-new-window">
              . {i18nTargetOpensInNewWindow[this._currentLanguage]}
            </span>
          )}
        </TAG_NAME>
      </Host>
    );
  }
}
