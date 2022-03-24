import {
  Component,
  h,
  Host,
  Prop
} from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-label.default.scss',
    shared: 'styles/lyne-tab-label.shared.scss'
  },
  tag: 'lyne-tab-label'
})

export class LyneTabLabel {

  /** Active tab  */
  @Prop() public active = false;
  @Prop() public icon = false;

  public render(): JSX.Element {
    return (
      <Host slot='lyne-tab-label'>
        <span part='label-text' class='tab-label'><slot></slot></span> <span class='tab-label-icon'><slot name='icon' /></span>
      </Host>
    );
  }
}
