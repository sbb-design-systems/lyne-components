import { Component, ComponentInterface, h, Host, JSX, Listen, Prop, State } from '@stencil/core';
import {
  dispatchClickEventWhenEnterKeypress,
  handleLinkButtonClick,
  LinkProperties,
  LinkTargetType,
  resolveLinkOrStaticRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

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

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Listen('click')
  public handleClick(event: Event): void {
    handleLinkButtonClick(event);
  }

  @Listen('keypress')
  public handleKeypress(event: KeyboardEvent): void {
    dispatchClickEventWhenEnterKeypress(event);
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
              <span class="sbb-teaser__description">
                <slot name="description" />
              </span>
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
