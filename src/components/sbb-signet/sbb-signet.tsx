import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceSignetAttributes } from './sbb-signet.custom';
import sbbSignetSVG from './assets/sbb_signet.svg';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-signet.default.scss',
    shared: 'styles/sbb-signet.shared.scss'
  },
  tag: 'sbb-signet'
})

export class SbbSignet {

  /**
   * According to the Corporate Design Guidelines the signet
   * can be used in these variants
   */
  @Prop() public variant?: InterfaceSignetAttributes['variant'] = 'default';

  /**
   * The Signet needs to have a certain protective room around it
   */
  @Prop() public protectiveRoom?: InterfaceSignetAttributes['protectiveRoom'] = 'ideal';

  public render(): JSX.Element {
    return (
      <span class={`sbb-signet sbb-signet--${this.variant} sbb-signet--protective-room sbb-signet--protective-room-${this.protectiveRoom}`}>
        <span class='sbb-signet__svg' innerHTML={sbbSignetSVG}></span>
      </span>
    );
  }

}
