import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { InterfaceSbbDividerAttributes } from './sbb-divider.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-divider.scss',
  tag: 'sbb-divider',
})
export class SbbDivider {
  /** Negative coloring variant flag */
  @Prop({ reflect: true }) public negative?: boolean = false;

  /** Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal. */
  @Prop({ reflect: true }) public orientation?: InterfaceSbbDividerAttributes['orientation'] =
    'horizontal';

  public render(): JSX.Element {
    return (
      <Host role="separator" aria-orientation={this.orientation}>
        <div class="sbb-divider"></div>
      </Host>
    );
  }
}
