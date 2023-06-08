import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  LinkProperties,
  LinkTargetType,
  resolveLinkOrStaticRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  linkHandlerAspect,
} from '../../global/helpers';

/**
 * Generalized Teaser - for displaying an image, title and paragraph
 * @slot image - Slot used to render the image
 * @slot title - Slot used to render the title
 * @slot description - Slot used to render the description
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-teaser.scss',
  tag: 'sbb-teaser',
})
export class SbbTeaser implements ComponentInterface, LinkProperties {
  /**
   * Teaser variant -
   * when this is true the text-content will be under the image
   * otherwise it will be displayed next to the image.
   */
  @Prop({ reflect: true }) public isStacked: boolean;

  /**
   * Heading level of the sbb-title element (e.g. h1-h6).
   */
  @Prop() public titleLevel: InterfaceTitleAttributes['level'] = '5';

  /** The href value you want to link to. */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLSbbTeaserElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    linkHandlerAspect,
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
      attributes,
      hostAttributes,
    } = resolveLinkOrStaticRenderVariables(this);

    return (
      <Host {...hostAttributes}>
        <TAG_NAME class="sbb-teaser" {...attributes}>
          <span class="sbb-teaser__container">
            <span class="sbb-teaser__image-wrapper">
              <slot name="image" />
            </span>
            <span class="sbb-teaser__text">
              <sbb-title level={this.titleLevel} visualLevel="5" class="sbb-teaser__lead">
                <slot name="title" />
              </sbb-title>
              <p class="sbb-teaser__description">
                <slot name="description" />
              </p>
              {targetsNewWindow(this) && (
                <span class="sbb-teaser__opens-in-new-window">
                  . {i18nTargetOpensInNewWindow[this._currentLanguage]}
                </span>
              )}
            </span>
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
