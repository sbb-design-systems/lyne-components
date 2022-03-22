import {
  Component,
  h,
  Prop
} from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-group.default.scss',
    shared: 'styles/lyne-tab-group.shared.scss'
  },
  tag: 'lyne-tab-group'
})

export class LyneTabGroup {

  /** Tab labels  */
  @Prop() public labelone?: string;
  @Prop() public labeltwo?: string;
  @Prop() public labelthree?: string;

  /** Define if icon should be shown or not */
  @Prop() public icon1? = false;
  @Prop() public icon2? = false;
  @Prop() public icon3? = false;

  /** If you use an icon without a label, you must provide an iconDescription */
  @Prop() public iconDescription1?: string;

  public render(): JSX.Element {
    return (
      <div class="tabs">
        <div class="tab-group">
          <slot />
        </div>
      </div>
    );
  }
}
