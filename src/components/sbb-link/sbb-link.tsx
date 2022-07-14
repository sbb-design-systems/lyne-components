import { Component, h, Prop } from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceLinkAttributes } from './sbb-link.custom';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';

/**
 * @slot icon - Slot used to display the icon, if one is set
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-link.scss',
  tag: 'sbb-link',
})
export class SbbLink {
  /**
   * If set to true, the browser will
   * show the download dialog on click.
   */
  @Prop() public download?: boolean;

  /** The href value you want to link to */
  @Prop() public hrefValue!: string;

  /**
   * The icon name we want to use,
   * choose from the small icon variants from
   * the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   * Inline variant doesn't support icons.
   */
  @Prop() public icon?: string;

  /**
   * Pass in an id, if you need to identify
   * the link element.
   */
  @Prop() public idValue?: string;

  /**
   * Decide whether the icon should get flipped
   * horizontally if the document writing mode
   * is changed from ltr to rtl or vice versa.
   */
  @Prop() public iconFlip?: boolean;

  /**
   * If this is set to true an span element will be used
   * instead of a anchor or a button
   */
  @Prop() public staticSpan?: boolean;

  /**
   * The icon can either be place before or after
   * the text.
   */
  @Prop() public iconPlacement: InterfaceLinkAttributes['iconPlacement'] = 'start';

  /** The link text we want to visually show. */
  @Prop() public ariaText?: string;

  /**
   * Text size, the link should get in the
   * non button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @Prop() public textSize: InterfaceLinkAttributes['textSize'] = 's';

  /**
   * Choose the link style variant.
   */
  @Prop() public variant: InterfaceLinkAttributes['variant'] = 'block';

  /**
   * Disabled attribute if link is used as button
   */
  @Prop() public disabled?: boolean;

  /**
   * Name attribute if link is used as button
   */
  @Prop() public buttonName?: string;

  /**
   * Form attribute if link is used as button
   */
  @Prop() public formId?: string;

  /**
   * Type attribute if link is used as button
   */
  @Prop() public buttonType?: InterfaceLinkAttributes['buttonType'];

  private get _inlineVariant(): boolean {
    return this.variant === 'inline' || this.variant === 'inline-negative';
  }

  /**
   * Get the constructed class string for the given config of the element
   * @private
   * @return <string>
   */
  private get _getClassString(): string {
    const textSizeClass = this._inlineVariant ? '' : ` sbb-link--text-${this.textSize}`;

    let iconPositionClass = '';

    if (this.icon) {
      iconPositionClass = ` sbb-link--icon-placement-${this.iconPlacement}`;
    }

    let iconFlipClass = '';

    if (this.icon && this.iconFlip) {
      iconFlipClass = ' sbb-link--icon-flip';
    }

    const variantClass = ` sbb-link--${this.variant}`;

    return `sbb-link${textSizeClass}${iconPositionClass}${iconFlipClass}${variantClass}`;
  }

  /**
   * Get the attributelist base on the config and the resulting element
   * @private
   * @return <object>
   */
  private get _getAttributeList(): object {
    let ariaLabelText = this.ariaText;
    const currentLanguage = getDocumentLang();
    const currentWritingMode = getDocumentWritingMode();

    let attributeList = {};

    attributeList = {
      ...attributeList,
      dir: currentWritingMode,
      'aria-label': ariaLabelText,
      class: this._getClassString,
    };

    if (this.idValue) {
      attributeList = {
        ...attributeList,
        id: this.idValue,
      };
    }

    let openInNewWindow = false;

    if (!window.location.href.includes(this.hrefValue)) {
      openInNewWindow = true;
    }

    // Anchor specific attributes
    if (this.hrefValue && !this.staticSpan) {
      attributeList = {
        ...attributeList,
        href: this.hrefValue,
      };

      if (openInNewWindow) {
        ariaLabelText += `. ${i18nTargetOpensInNewWindow[currentLanguage]}`;
        attributeList = {
          ...attributeList,
          rel: 'external noopener nofollow',
          target: '_blank',
          'aria-label': ariaLabelText,
        };
      }

      if (this.download) {
        attributeList = {
          ...attributeList,
          download: '',
        };
      }

      if (this.disabled) {
        attributeList = {
          ...attributeList,
          tabIndex: '-1',
        };
      }
    }

    // Button specific attributes
    if (!this.hrefValue && !this.staticSpan) {
      if (this.disabled) {
        attributeList = {
          ...attributeList,
          disabled: '',
        };
      }

      if (this.buttonType) {
        attributeList = {
          ...attributeList,
          type: this.buttonType,
        };
      }

      if (this.buttonName) {
        attributeList = {
          ...attributeList,
          name: this.buttonName,
        };
      }

      if (this.formId) {
        attributeList = {
          ...attributeList,
          form: this.buttonName,
        };
      }
    }

    return attributeList;
  }

  /**
   * Render element
   */
  public render(): JSX.Element {
    let TAG_NAME;
    if (!this.hrefValue && !this.staticSpan) {
      TAG_NAME = 'button';
    } else if (!this.hrefValue && this.staticSpan) {
      TAG_NAME = 'span';
    } else {
      TAG_NAME = 'a';
    }

    return (
      <TAG_NAME {...this._getAttributeList}>
        {this.icon && !this._inlineVariant ? (
          <span class="sbb-link__icon">
            <slot name="icon" />
          </span>
        ) : (
          ''
        )}
        <slot />
      </TAG_NAME>
    );
  }
}


refactor: 1239 sbb-link refactor

- change content-text from property to slot
- add button condition if no href is present and corresponding attribute support
- add staic-span condition/config

BREAKING CHANGE:
- the text is now set via slot (default slot)
- the aria-label has its own property instead of the former text property
