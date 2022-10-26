import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceTitleAttributes } from './sbb-title.custom';

let nextId = 0;

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
   * A11y Tip:
   * Sometimes we need to set an id, especially if we want to associate
   * a relationship with another element through the use of aria-labelledby
   * or aria-describedby or just offer an anchor target
   */
  @Prop() public titleId = `sbb-title-${++nextId}`;

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
      <TAGNAME class="sbb-title" id={this.titleId}>
        <slot />
      </TAGNAME>
    );
  }
}
