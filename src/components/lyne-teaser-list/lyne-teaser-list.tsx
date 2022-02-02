import {
  Component, h, Prop
} from '@stencil/core';

/**
 * @slot unnamed - Place lyne-teaser-item elements in the slot
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-teaser-list.default.scss',
    shared: 'styles/lyne-teaser-list.shared.scss'
  },
  tag: 'lyne-teaser-list'
})

export class LyneTeaserList {

  /**
   * Property for lyne-panel. See lyne-panel for additional info
   */
  @Prop() public personalised: boolean;

  public render(): JSX.Element {

    const direction = this.personalised
      ? 'personalised'
      : 'non-personalised';

    const attrs = {
      class: `teaserlist ${direction}`
    };

    return (
      <div {...attrs} role='list'>
        <slot/>
      </div>
    );
  }
}
