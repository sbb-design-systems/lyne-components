import { Component, ComponentInterface, Element, h, JSX, Listen, Prop, State } from '@stencil/core';
import {
  actionElement,
  focusActionElement,
  forwardHostEvent,
  LinkProperties,
  LinkTargetType,
  resolveLinkRenderVariables,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';

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
  /** This will be forwarded as aria-label to anchor tag. */
  @Prop() public accessibilityLabel: string | undefined;

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

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Listen('click')
  public handleClick(event: Event): void {
    if (this.href) {
      forwardHostEvent(event, this._element, actionElement(this._element));
    }
  }

  public connectedCallback(): void {
    // Forward focus call to action element
    this._element.focus = focusActionElement;
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      screenReaderNewWindowInfo,
    } = resolveLinkRenderVariables(this, this._currentLanguage);

    return (
      <TAG_NAME class="sbb-teaser-hero" {...attributes}>
        <span class="sbb-teaser-hero__panel">
          <span class="sbb-teaser-hero__panel-text">
            <slot />
          </span>
          {this.href && (
            <sbb-link
              class="sbb-teaser-hero__panel-link"
              icon-name="chevron-small-right-small"
              icon-placement="end"
              text-size="m"
              negative
            >
              <slot name="link-content">{this.linkContent}</slot>
            </sbb-link>
          )}
        </span>
        <slot name="image">
          {this.imageSrc && <sbb-image image-src={this.imageSrc} alt={this.imageAlt}></sbb-image>}
        </slot>
        {screenReaderNewWindowInfo && (
          <span class="sbb-teaser-hero__opens-in-new-window">
            . {i18nTargetOpensInNewWindow[this._currentLanguage]}
          </span>
        )}
      </TAG_NAME>
    );
  }
}
