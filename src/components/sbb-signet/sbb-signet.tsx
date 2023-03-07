import { Component, h, JSX, Prop } from '@stencil/core';

import { InterfaceSignetAttributes } from './sbb-signet.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-signet.scss',
  tag: 'sbb-signet',
})
export class SbbSignet {
  /** Visual protective room around signet. */
  @Prop({ reflect: true }) public protectiveRoom?: InterfaceSignetAttributes['protectiveRoom'] =
    'ideal';

  /** Accessibility label which is forwarded to the inner SVG signet. */
  @Prop() public accessibilityLabel = 'Logo';

  public render(): JSX.Element {
    return (
      <span class="sbb-signet">
        <span class="sbb-signet__svg-container">
          <svg focusable="false" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
            {this.accessibilityLabel && <title>{this.accessibilityLabel}</title>}
            <path
              id="sbb-signet__icon"
              d="M20.0265 40H31.6821L16 24.6154H35.3907V40H44.6093V24.6154H64.106L48.4238 40H60.0795L80 20.0531L60.0795 0H48.4238L64.106 15.3846H44.6093V0H35.3907V15.3846H16L31.6821 0H20.0265L0 20.0531L20.0265 40Z"
            />
          </svg>
        </span>
      </span>
    );
  }
}
