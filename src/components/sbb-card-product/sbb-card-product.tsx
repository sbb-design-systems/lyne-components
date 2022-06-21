import { Component, Element, h, Prop, Watch } from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import events from './sbb-card-product.events';
import { InterfaceCardProductAttributes } from './sbb-card-product.custom';

/**
 * @slot icon - Slot used to render the product icon
 * @slot category - Slot used to render the product category
 * @slot title - Slot used to render the title
 * @slot lead - Slot used to render the lead text
 * @slot text - Slot used to render product contents — only inline HTML
 * elements are allowed
 * @slot details - Slot used to render the details
 * @slot card-badge - Slot used to render the optional card badge e.g. discounts
 * @slot action - Slot used to render the link-button
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-card-product.default.scss',
    shared: 'styles/sbb-card-product.shared.scss',
  },
  tag: 'sbb-card-product',
})

/**
 * Generalized product card — merge of ticket and subscription
 */
export class SbbCardProduct {
  /** CardProduct appearance */
  @Prop() public appearance?: InterfaceCardProductAttributes['appearance'] = 'primary';

  /** CardProduct layout */
  @Prop() public layout?: InterfaceCardProductAttributes['layout'] = 'standard';

  /** The ID value you want to reference */
  @Prop() public idValue?: string;

  /**
   * The text which gets exposed to screen reader users. The text should
   * reflect all the information which gets passed into the component's slots
   * and which is visible in the card, either through text or iconography.
   *
   * Example text: Connection from X to Y, via Z, on date X.
   * Ticket price starts at X.
   */
  @Prop() public accessibilityLabel!: string;

  /**
   * Check if accessibilityLabel is provided since it is a required prop,
   * otherwise throw an error.
   */
  /* eslint-disable */
  @Watch('accessibilityLabel')
  validateAccessibilityLabel(newValue: string) {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) {
      throw new Error('accessibilityLabel: required');
    }
  }
  /* eslint-enable */

  /**
   * Link attributes
   * ----------------------------------------------------------------
   */

  /** The href value you want to link to */
  @Prop() public hrefValue?: string;

  /**
   * Button attributes
   * ----------------------------------------------------------------
   */

  /**
   * Defines if the card behaves like a HTML button. Needs to be set true
   * if the card does not point to a URL.
   */
  @Prop() public isButton?: boolean;

  /** Set to true to get a disabled button */
  @Prop() public isDisabled? = false;

  /** Id which is sent in the click event payload */
  @Prop() public eventId?: string;

  /** The type attribute to use for the button */
  @Prop() public type?: InterfaceCardProductAttributes['type'] = 'button';

  /** The name attribute to use for the button */
  @Prop() public name?: string;

  /** The value attribute to use for the button */
  @Prop() public value?: string;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public ariaHaspopup?: InterfaceCardProductAttributes['popup'];

  /**
   * ----------------------------------------------------------------
   */

  /** Host element */
  @Element() private _hostElement: HTMLElement;

  /** Defines click event handler if product card is served as a button */
  private _buttonClick = (): void => {
    let eventDetail;

    if (this.eventId) {
      eventDetail = this.eventId;
    }

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: eventDetail,
    });

    this._hostElement.dispatchEvent(event);
  };

  private _hasIconSlot: boolean;
  private _hasCategorySlot: boolean;
  private _hasTitleSlot: boolean;
  private _hasLeadSlot: boolean;
  private _hasTextSlot: boolean;
  private _hasDetailsSlot: boolean;
  private _hasCardBadgeSlot: boolean;
  private _hasActionSlot: boolean;

  public componentWillLoad(): void {
    // Validate props
    this.validateAccessibilityLabel(this.accessibilityLabel);
    // Check slots
    this._hasIconSlot = Boolean(this._hostElement.querySelector('[slot="icon"]'));
    this._hasCategorySlot = Boolean(this._hostElement.querySelector('[slot="category"]'));
    this._hasTitleSlot = Boolean(this._hostElement.querySelector('[slot="title"]'));
    this._hasLeadSlot = Boolean(this._hostElement.querySelector('[slot="lead"]'));
    this._hasTextSlot = Boolean(this._hostElement.querySelector('[slot="text"]'));
    this._hasDetailsSlot = Boolean(this._hostElement.querySelector('[slot="details"]'));
    this._hasCardBadgeSlot = Boolean(this._hostElement.querySelector('[slot="card-badge"]'));
    this._hasActionSlot = Boolean(this._hostElement.querySelector('[slot="action"]'));
  }

  public render(): JSX.Element {
    const currentLanguage = getDocumentLang();
    let TAGNAME;

    /**
     * Add additional CSS classes
     * ----------------------------------------------------------------
     */
    let cardSizeClass = '';

    if (this._hasCardBadgeSlot) {
      cardSizeClass = ' card-product--tall';
    }

    /**
     * Add generic additional attributes
     * ----------------------------------------------------------------
     */
    let additionalCardAttributes = {};
    let ariaLabel = this.accessibilityLabel;

    if (this.idValue) {
      additionalCardAttributes = {
        ...additionalCardAttributes,
        id: this.idValue,
      };
    }

    // Check if hrefValue or isButton is set
    if (!this.isButton && !this.hrefValue) {
      // security exit, if no hrefValue nor isButton is provided
      return <p>Provide a hrefValue or define isButton</p>;
    }

    if (this.isButton) {
      /**
       * Product card behaves like a button
       * ----------------------------------------------------------------
       * #Todo: Within a button, non-phrasing content like a h2 (rendered as
       * slots) are not allowed.
       * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
       */

      TAGNAME = 'button';

      /**
       * Add button specific additional attributes
       * ----------------------------------------------------------------
       */

      if (this.isDisabled) {
        additionalCardAttributes = {
          ...additionalCardAttributes,
          disabled: 'disabled',
        };
      }

      additionalCardAttributes = {
        ...additionalCardAttributes,
        'aria-haspopup': this.ariaHaspopup,
        name: this.name,
        onClick: this._buttonClick,
        type: this.type,
        value: this.value,
      };
    } else {
      /**
       * Product card behaves like a link (a)
       * ----------------------------------------------------------------
       */

      // security exit, if no hrefValue is provided via props
      if (!this.hrefValue) {
        return <p>Config error: if card should behave like a link, hrefValue is required</p>;
      }

      TAGNAME = 'a';

      /**
       * Add link (a) specific additional attributes
       * ----------------------------------------------------------------
       */

      let openInNewWindow = false;

      if (!window.location.href.includes(this.hrefValue)) {
        openInNewWindow = true;
      }

      if (openInNewWindow) {
        additionalCardAttributes = {
          ...additionalCardAttributes,
          rel: 'external noopener nofollow',
          target: '_blank',
        };
        ariaLabel += `. ${i18nTargetOpensInNewWindow[currentLanguage]}`;
      }

      if (this.hrefValue) {
        additionalCardAttributes = {
          ...additionalCardAttributes,
          href: this.hrefValue,
        };
      }
    }

    return (
      <TAGNAME
        aria-label={ariaLabel}
        class={`card-product card-product--${this.appearance} card-product--${this.layout}
          ${cardSizeClass}`}
        {...additionalCardAttributes}
      >
        <div class="card-product__content">
          {this._hasIconSlot ? (
            <span class="card-product__icon">
              <slot name="icon" />
            </span>
          ) : (
            ''
          )}
          <div class="card-product__inner">
            {this._hasCategorySlot ? (
              <div class="card-product__category">
                <slot name="category" />
              </div>
            ) : (
              ''
            )}
            {this._hasTitleSlot ? (
              <div class="card-product__title">
                <slot name="title" />
              </div>
            ) : (
              ''
            )}
            {this._hasLeadSlot ? (
              <div class="card-product__lead">
                <slot name="lead" />
              </div>
            ) : (
              ''
            )}
            {this._hasTextSlot ? (
              <p class="card-product__text">
                <slot name="text" />
              </p>
            ) : (
              ''
            )}
            {this._hasDetailsSlot ? (
              <div class="card-product__details">
                <slot name="details" />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        {this._hasCardBadgeSlot ? (
          <div class="card-product__card-badge">
            <slot name="card-badge" />
          </div>
        ) : (
          ''
        )}
        {this._hasActionSlot ? (
          <div class="card-product__action">
            <slot name="action" />
          </div>
        ) : (
          ''
        )}
      </TAGNAME>
    );
  }
}
