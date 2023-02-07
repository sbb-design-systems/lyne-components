import {
  Component,
  ComponentInterface,
  Element,
  h,
  JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
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
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

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

  /**
   * The text which gets exposed to screen reader users. The text should
   * reflect all the information
   *
   * Example text: Connection from X to Y, via Z, on date X.
   * Ticket price starts at X.
   */
  @Prop() public accessibilityLabel!: string;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

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
    if (this.href) {
      forwardHostEvent(event, this._element, actionElement(this._element));
    }
  }

  public connectedCallback(): void {
    // Forward focus call to action element
    this._element.focus = focusActionElement;
  }

  public componentWillLoad(): void {
    // Validate props
    this._validateAccessibilityLabel(this.accessibilityLabel);
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      screenReaderNewWindowInfo,
    } = resolveLinkRenderVariables(this, this._currentLanguage);

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
                . {i18nTargetOpensInNewWindow[this._currentLanguage]}
              </span>
            )}
          </span>
        </span>
      </TAG_NAME>
    );
  }
}
