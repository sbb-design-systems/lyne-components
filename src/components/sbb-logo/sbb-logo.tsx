import { Component, h, JSX, Prop } from '@stencil/core';

import { InterfaceLogoAttributes } from './sbb-logo.custom';
import sbbLogoSVG from './assets/sbb_logo.svg';

@Component({
  shadow: true,
  styleUrl: 'sbb-logo.scss',
  tag: 'sbb-logo',
})
export class SbbLogo {
  /**
   * According to the Corporate Design Guidelines the logo
   * can be used in these variants
   */
  @Prop() public variant?: InterfaceLogoAttributes['variant'] = 'default';

  /**
   * The Logo needs to have a certain protective room around it
   */
  @Prop() public protectiveRoom?: InterfaceLogoAttributes['protectiveRoom'] = 'ideal';

  public render(): JSX.Element {
    return (
      <span
        class={`sbb-logo sbb-logo--${this.variant} sbb-logo--protective-room-${this.protectiveRoom}`}
      >
        <span class="sbb-logo__svg" innerHTML={sbbLogoSVG}></span>
      </span>
    );
  }
}
