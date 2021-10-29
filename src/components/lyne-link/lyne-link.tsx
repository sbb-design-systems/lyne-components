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

  /** The link text we want to visually show */
  @Prop() public text!: string;

  /**
   * Text size, the link should get in the
   * non button variation.
   */
  @Prop() public textSize: InterfaceLinkAttributes['textSize'] = 'm';

  public render(): JSX.Element {

    let openInNewWindow = false;
    let addtitionalLinkAttributes = {}

    const textSizeClass = ` link--text-${this.textSize}`;

    if (!this.hrefValue.includes('sbb.ch')) {
      openInNewWindow = true;
    };

    if (openInNewWindow) {
      addtitionalLinkAttributes = {
        target: '_blank',
        rel: 'external noopener nofollow'
      };
    }

    return (
      <a
        class={`link${textSizeClass}`}
        href={this.hrefValue}
        {...addtitionalLinkAttributes}
      >

        {this.icon
          ? <span class='link__text_icon'><slot name='icon'/></span>
          : ''
        }

        <span class='link__text'>
          {this.text}
          {
            openInNewWindow ?
              <span class='link__text_hidden'>{i18n['modules'].link.targetOpensInNewWindow.de}</span>
              :
              ''
          }
        </span>
      </a>
    );
  }
}
