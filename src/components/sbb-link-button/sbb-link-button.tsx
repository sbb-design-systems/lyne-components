import {
  Component,
  h,
  Prop
} from '@stencil/core';

import getDocumentLang from '../../global/helpers/get-document-lang';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { InterfaceLinkButtonAttributes } from './sbb-link-button.custom';

/**
 * @slot icon - Slot used to display the icon, if one is set
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-link-button.default.scss',
    shared: 'styles/sbb-link-button.shared.scss'
  },
  tag: 'sbb-link-button'
})

export class SbbLinkButton {

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
   * https://lyne.sbb.ch/tokens/icons/
   */
  @Prop() public icon?: string;

  /**
   * Decide whether the icon should get flipped
   * horizontally if the document writing mode
   * is changed from ltr to rtl or vice versa.
   */
  @Prop() public iconFlip?: boolean;

  /**
   * The icon can either be place before or after
   * the text
   */
  @Prop() public iconPlacement: InterfaceLinkButtonAttributes['iconPlacement'] = 'start';

  /**
   * Pass in an id, if you need to identify
   * the link element.
   */
  @Prop() public idValue?: string;

  /** The link text we want to visually show */
  @Prop() public text!: string;

  /**
   * Choose the link button style variant
   */
  @Prop() public variant: InterfaceLinkButtonAttributes['variant'] = 'primary';

  public render(): JSX.Element {

    const currentLanguage = getDocumentLang();
    const currentWritingMode = getDocumentWritingMode();

    let openInNewWindow = false;

    if (!window.location.href.includes(this.hrefValue)) {
      openInNewWindow = true;
    }

    /**
     * Add additional CSS classes
     * ----------------------------------------------------------------
     */
    let iconPositionClass = '';

    if (this.icon) {
      iconPositionClass = ` link-button--icon-placement-${this.iconPlacement}`;
    }

    let iconFlipClass = '';

    if (this.icon && this.iconFlip) {
      iconFlipClass = ' link-button--icon-flip';
    }

    const variantClass = ` link-button--${this.variant}`;

    /**
     * Add additional attributes
     * ----------------------------------------------------------------
     */
    let addtitionalLinkAttributes = {};
    let ariaLabel = this.text;

    if (openInNewWindow) {
      addtitionalLinkAttributes = {
        rel: 'external noopener nofollow',
        target: '_blank'
      };
      ariaLabel += `. ${i18nTargetOpensInNewWindow[currentLanguage]}`;
    }

    if (this.idValue) {
      addtitionalLinkAttributes = {
        ...addtitionalLinkAttributes,
        id: this.idValue
      };
    }

    return (
      <a
        aria-label={ariaLabel}
        class={
          `link-button
          ${iconPositionClass}
          ${iconFlipClass}
          ${variantClass}`
        }
        download={this.download}
        dir={currentWritingMode}
        href={this.hrefValue}
        {...addtitionalLinkAttributes}
      >

        {this.icon
          ? <span class='link-button__icon'><slot name='icon'/></span>
          : ''
        }

        <span class='link-button__text'>
          {this.text}
        </span>
      </a>
    );
  }
}
