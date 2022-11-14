import { Component, h, JSX, Prop } from '@stencil/core';

import { InterfaceLogoAttributes } from './sbb-logo.custom';
import sbbLogoSVG from './assets/sbb_logo.svg';

@Component({
  shadow: true,
  styleUrl: 'sbb-logo.scss',
  tag: 'sbb-logo',
})
export class SbbLogo {
  /** Variants of the logo. */
  @Prop({ reflect: true }) public variant?: InterfaceLogoAttributes['variant'] = 'default';

  /** Visual protective room around logo. */
  @Prop({ reflect: true }) public protectiveRoom?: InterfaceLogoAttributes['protectiveRoom'] =
    'ideal';

  public render(): JSX.Element {
    return (
      <span class="sbb-logo">
        <span class="sbb-logo__svg-container" innerHTML={sbbLogoSVG}></span>
      </span>
    );
  }
}
