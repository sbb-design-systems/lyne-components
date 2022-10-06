import { Component, Element, h, JSX, Listen, Prop, Watch } from '@stencil/core';
import { InterfaceTeaserAttributes } from './sbb-teaser.custom';
import {
  forwardHostClick,
  getLinkAttributeList,
  getLinkButtonBaseAttributeList,
  LinkProperties,
  LinkTargetType,
} from '../../global/interfaces/link-button-properties';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';

/**
 * @slot image - Slot used to render the image
 * @slot title - Slot used to render the title
 * @slot description - Slot used to render the description
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-teaser.scss',
  tag: 'sbb-teaser',
})

/**
 * Generalized Teaser - for displaying an image, title and paragraph
 */
export class SbbTeaser implements LinkProperties {
  /**
   * Teaser variant -
   * when this is true the text-content will be under the image
   * otherwise it will be displayed next to the image.
   */
  @Prop({ reflect: true }) public isStacked: boolean;

  /**
   * Heading level of the sbb-title element (e.g. h1-h6).
   */
  @Prop() public titleLevel: InterfaceTeaserAttributes['titleLevel'] = '5';

  /** The href value you want to link to. */
  @Prop() public href!: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /**
   * The text which gets exposed to screen reader users. The text should
   * reflect all the information
   *
   * Example text: Connection from X to Y, via Z, on date X.
   * Ticket price starts at X.
   */
  @Prop() public accessibilityLabel!: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  @Element() private _element!: HTMLElement;

  /**
   * Check if accessibilityLabel is provided since it is a required prop,
   * otherwise throw an error.
   */
  @Watch('accessibilityLabel')
  private _validateAccessibilityLabel(newValue: string): void {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) {
      throw new Error('accessibilityLabel: required');
    }
  }

  @Listen('click')
  public handleClick(event: Event): void {
    forwardHostClick(
      event,
      this._element,
      this._element.shadowRoot.firstElementChild as HTMLElement // Anchor element
    );
  }

  public componentWillLoad(): void {
    // Validate props
    this._validateAccessibilityLabel(this.accessibilityLabel);
  }

  private _resolveRenderVariables(): {
    screenReaderNewWindowInfo?: boolean;
    attributes: Record<string, string>;
    tagName: 'a' | 'span';
  } {
    if (this.href) {
      return {
        tagName: 'a',
        attributes: getLinkAttributeList(this),
        screenReaderNewWindowInfo: !this.accessibilityLabel && this.target === '_blank',
      };
    }
    return { tagName: 'span', attributes: getLinkButtonBaseAttributeList(this) };
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      screenReaderNewWindowInfo,
    } = this._resolveRenderVariables();

    return (
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
            {screenReaderNewWindowInfo && (
              <span class="sbb-teaser__opens-in-new-window">
                . {i18nTargetOpensInNewWindow[getDocumentLang()]}
              </span>
            )}
          </span>
        </span>
      </TAG_NAME>
    );
  }
}
