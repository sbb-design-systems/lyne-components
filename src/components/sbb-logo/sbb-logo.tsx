import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceLogoAttributes } from './lyne-sbb-logo.custom.d';
import sbbLogoSVG from './assets/sbb_logo.svg';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-sbb-logo.default.scss',
    shared: 'styles/lyne-sbb-logo.shared.scss'
  },
  tag: 'lyne-sbb-logo'
})

export class LyneSbbLogo {

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
      <span class={`sbb-logo sbb-logo--${this.variant} sbb-logo--protective-room-${this.protectiveRoom}`}>
        <span class='sbb-logo__svg' innerHTML={sbbLogoSVG}></span>
      </span>
    );
  }

}
