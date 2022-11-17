import { Component, h, JSX, Prop } from '@stencil/core';

import { InterfaceSignetAttributes } from './sbb-signet.custom';
import sbbSignetSVG from './assets/sbb_signet.svg';

@Component({
  shadow: true,
  styleUrl: 'sbb-signet.scss',
  tag: 'sbb-signet',
})
export class SbbSignet {
  /** Visual protective room around signet. */
  @Prop({ reflect: true }) public protectiveRoom?: InterfaceSignetAttributes['protectiveRoom'] =
    'ideal';

  public render(): JSX.Element {
    return (
      <span class="sbb-signet">
        <span class="sbb-signet__svg-container" innerHTML={sbbSignetSVG}></span>
      </span>
    );
  }
}
