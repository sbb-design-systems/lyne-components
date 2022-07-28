import { Component, h, Prop } from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceLinkAttributes } from './sbb-link.custom';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';

/**
 * @slot icon - Slot used to display the icon, if one is set
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-link.scss',
  tag: 'sbb-link',
})
export class SbbLink implements AccessibilityProperties {
  /**
   * If set to true, the browser will
   * show the download dialog on click (optional).
   */
  @Prop() public download?: boolean;

  /** The href value you want to link to (if its not present link becomes a button)*/
  @Prop() public href?: string;

  /**
   * The icon name we want to use,
   * choose from the small icon variants from
   * the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/ (optional).
   * Inline variant doesn't support icons.
   */
  @Prop() public icon?: string;

  /**
   * Pass in an id, if you need to identify
   * the link element (optional).
   */
  @Prop() public idValue?: string;

  /**
   * Decide whether the icon should get flipped
   * horizontally if the document writing mode
   * is changed from ltr to rtl or vice versa (optional).
   */
  @Prop() public iconFlip?: boolean;

  /**
   * If this is set to true an span element will be used
   * instead of an anchor or a button
   */
  @Prop() public isStatic = false;

  /**
   * The icon can either be place before or after
   * the text.
   */
  @Prop() public iconPlacement: InterfaceLinkAttributes['iconPlacement'] = 'start';

  /**
   * Negative coloring variant flag
   */
  @Prop() public negative: boolean;

  /**
   * Text size, the link should get in the
   * non button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @Prop() public textSize: InterfaceLinkAttributes['textSize'] = 's';

  /**
   * Applies link inline styles (underline, inherit coloring/font-size etc).
   */
  @Prop() public variant: InterfaceLinkAttributes['variant'] = 'block';

  /**
   * Disabled attribute if link is used as button (optional)
   */
  @Prop() public disabled?: boolean;

  /**
   * Name attribute if link is used as button (optional)
   */
  @Prop() public name?: string;

  /**
   * Form attribute if link is used as button (optional)
   */
  @Prop() public form?: string;

  /**
   * Type attribute if link is used as button (optional)
   */
  @Prop() public type?: InterfaceLinkAttributes['buttonType'];

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * Get the attributelist base on the config and the resulting element
   * @private
   * @return <object>
   */
  private get _getAttributeList(): object {
    let ariaLabelText = this.accessibilityLabel;
    const currentLanguage = getDocumentLang();
    const currentWritingMode = getDocumentWritingMode();
    const attributeList: Record<string, string> = {};

    Object.assign(attributeList, {
      dir: currentWritingMode,
      class: this._getClassString,
      'aria-label': ariaLabelText || undefined,
      name: this.name || undefined,
      id: this.idValue || undefined,
    });

    let openInNewWindow = false;

    if (!window.location.href.includes(this.href)) {
      openInNewWindow = true;
    }

    if (openInNewWindow && !this.isStatic && this.href) {
      ariaLabelText += `. ${i18nTargetOpensInNewWindow[currentLanguage]}`;

      Object.assign(attributeList, {
        rel: 'external noopener nofollow',
        target: '_blank',
        'aria-label': ariaLabelText || undefined,
      });
    }

    if (this.isStatic) {
      return attributeList;
    }

    if (this.href) {
      // Anchor case
      Object.assign(attributeList, {
        href: this.href,
        download: this.download ? '' : undefined,
        tabIndex: this.disabled ? '-1' : undefined,
      });
    } else {
      // Button case
      Object.assign(attributeList, {
        type: this.type || undefined,
        form: this.form || undefined,
        disabled: this.disabled ? 'true' : undefined,
      });
    }

    return attributeList;
  }

  private get _getClassString(): string {
    const textSizeClass = this.variant === 'inline' ? '' : ` sbb-link--text-${this.textSize}`;

    let iconPositionClass = '';

    if (this.icon) {
      iconPositionClass =
        this.iconPlacement === 'start'
          ? ' sbb-link--icon-placement-start'
          : ' sbb-link--icon-placement-end';
    }

    let iconFlipClass = '';

    if (this.icon && this.iconFlip) {
      iconFlipClass = ' sbb-link--icon-flip';
    }

    const inlineClass = this.variant === 'inline' ? ' sbb-link--inline' : '';
    const negativeClass = this.negative ? ' sbb-link--negative' : '';

    return `sbb-link${textSizeClass}${iconPositionClass}${iconFlipClass}${inlineClass}${negativeClass}`;
  }

  /**
   * Render element
   */
  public render(): JSX.Element {
    let TAG_NAME;
    if (this.isStatic) {
      TAG_NAME = 'span';
    } else if (this.href) {
      TAG_NAME = 'a';
    } else {
      TAG_NAME = 'button';
    }

    return (
      <TAG_NAME {...this._getAttributeList}>
        {this.variant !== 'inline' && (
          <slot name="icon">
            <sbb-icon name={this.icon}></sbb-icon>
          </slot>
        )}
        <slot />
      </TAG_NAME>
    );
  }
}
