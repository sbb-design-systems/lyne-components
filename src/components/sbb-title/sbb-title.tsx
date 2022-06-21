import { Component, h, Prop } from '@stencil/core';
import { InterfaceTitleAttributes } from './sbb-title.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-title.default.scss',
    shared: 'styles/sbb-title.shared.scss',
  },
  tag: 'sbb-title',
})
export class SbbTitle {
  /** Text for the title */
  @Prop() public text!: string;

  /** Title level */
  @Prop() public level?: InterfaceTitleAttributes['level'] = '1';

  /**
   * Visual level for the title. If you don't define the visual-level,
   * the value for level will be used.
   */
  @Prop() public visualLevel?: InterfaceTitleAttributes['visualLevel'];

  /**
   * A11y Tip:
   * Sometimes we need to set an id, especially if we want to associate
   * a relationship with another element through the use of aria-labelledby
   * or aria-describedby or just offer an anchor target
   */
  @Prop() public titleId?: '';

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy
   * to the screenreaders while we do not want to let that title appear
   * visually. In this case we set visuallyHidden to true
   */
  @Prop() public visuallyHidden?: false;

  /**
   * Choose the title style variant
   */
  @Prop() public variant: InterfaceTitleAttributes['variant'] = 'positive';

  public render(): JSX.Element {
    const TAGNAME = `h${this.level}`; // eslint-disable-line @typescript-eslint/no-unused-vars

    const visuallyHidden = this.visuallyHidden ? ' title--hidden' : '';

    let { visualLevel } = this;

    if (!this.visualLevel) {
      visualLevel = this.level;
    }

    const className = `title title-${visualLevel}${visuallyHidden} title--${this.variant}`;

    const attrs = {
      class: className,
    };

    if (this.titleId && this.titleId !== '') {
      attrs['id'] = this.titleId;
    }

    return <TAGNAME {...attrs}>{this.text}</TAGNAME>;
  }
}
