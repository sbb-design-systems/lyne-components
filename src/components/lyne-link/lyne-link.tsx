import {
  Component,
  h,
  Prop
} from '@stencil/core';

import i18n from '../../global/i18n';
import { InterfaceLinkAttributes } from './lyne-link.custom.d';

/**
 * @slot icon - Slot used to display the icon, if one is set
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-link.default.scss',
    shared: 'styles/lyne-link.shared.scss'
  },
  tag: 'lyne-link'
})

export class LyneLink {

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
   * The icon can either be place before or after
   * the text
   */
  @Prop() public iconPlacement: InterfaceLinkAttributes['iconPlacement'] = 'left';

  /** The link text we want to visually show */
  @Prop() public text!: string;

  /**
   * Text size, the link should get in the
   * non button variation.
   */
  @Prop() public textSize: InterfaceLinkAttributes['textSize'] = 'm';

  /**
   * Choose the link style variant
   */
  @Prop() public variant: InterfaceLinkAttributes['variant'] = 'positive';

  public render(): JSX.Element {

    const textSizeClass = ` link--text-${this.textSize}`;

    let openInNewWindow = false;

    if (!this.hrefValue.includes('sbb.ch')) {
      openInNewWindow = true;
    };

    let iconPositionClass = '';

    if (this.icon) {
      iconPositionClass = ` link--icon-placement-${this.iconPlacement}`
    }

    let addtitionalLinkAttributes = {};
    let ariaLabel = this.text;

    if (openInNewWindow) {
      addtitionalLinkAttributes = {
        target: '_blank',
        rel: 'external noopener nofollow'
      };
      ariaLabel += i18n['modules'].link.targetOpensInNewWindow.de;
    }

    const variantClass = ` link--${this.variant}`;

    return (
      <a
        class={`link${textSizeClass}${iconPositionClass}${variantClass}`}
        href={this.hrefValue}
        aria-label={ariaLabel}
        {...addtitionalLinkAttributes}
      >

        {this.icon
          ? <span class='link__text_icon'><slot name='icon'/></span>
          : ''
        }

        <span class='link__text'>
          {this.text}
        </span>
      </a>
    );
  }
}
