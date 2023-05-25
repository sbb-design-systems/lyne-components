import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { InterfaceTitleAttributes } from './sbb-title.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-title.scss',
  tag: 'sbb-title',
})
export class SbbTitle {
  /** Title level */
  @Prop({ reflect: true }) public level?: InterfaceTitleAttributes['level'] = '1';

  /** Visual level for the title. Optional, if not set, the value of level will be used. */
  @Prop({ reflect: true }) public visualLevel?: InterfaceTitleAttributes['visualLevel'];

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy
   * to the screen readers while we do not want to let that title appear
   * visually. In this case we set visuallyHidden to true
   */
  @Prop({ reflect: true }) public visuallyHidden?: false;

  /** Choose negative variant */
  @Prop({ reflect: true }) public negative?: boolean = false;

  public render(): JSX.Element {
    const TAGNAME = `h${this.level}`;

    return (
      <Host role="heading" aria-level={this.level}>
        <TAGNAME class="sbb-title" role="presentation">
          <slot />
        </TAGNAME>
      </Host>
    );
  }
}
