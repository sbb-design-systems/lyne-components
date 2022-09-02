import { Component, h, JSX, Host, Prop } from '@stencil/core';
import { InterfaceSbbDividerAttributes } from './sbb-divider.custom.d';

@Component({
  shadow: true,
  styleUrl: 'sbb-divider.scss',
  tag: 'sbb-divider',
})
export class SbbDivider {
  /** Appearance property for displaying the component in dark mode */
  @Prop() public negative?: boolean = false;

  /** Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal. */
  @Prop() public orientation?: InterfaceSbbDividerAttributes['orientation'] = 'horizontal';

  public render(): JSX.Element {
    return (
      <Host
        class={{
          'sbb-divider': true,
          [`sbb-divider--${this.orientation}`]: true,
          'sbb-divider--negative': this.negative,
        }}
        role="separator"
        aria-orientation={this.orientation}
      />
    );
  }
}
