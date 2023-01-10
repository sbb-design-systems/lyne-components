import { Component, h, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Slot used to render the actions on the left side.
 * @slot logo - Slot used to render the logo on the right side (sbb-logo as default).
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header.scss',
  tag: 'sbb-header',
})
export class SbbHeader {
  /** Used to display a box-shadow below the component on y-axis scroll whether set to true. */
  @Prop({ reflect: true }) public shadow = false;

  /**
   * Whether to allow the header content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @Prop({ reflect: true }) public expanded = false;

  /** Whether the header should hide and show on scroll. */
  @Prop({ reflect: true }) public hideonscroll = false;

  public componentDidLoad(): void {
    document.addEventListener('scroll', () => {
      console.log(this.hideonscroll);
      if (this.hideonscroll = true) {
        console.log('inside');
      }
    });
  }

  public render(): JSX.Element {
    return (
      <header class="sbb-header">
        <div class="sbb-header__wrapper">
          <slot />
          <div class="sbb-header__logo">
            <slot name="logo">
              <sbb-logo protective-room="none" />
            </slot>
          </div>
        </div>
      </header>
    );
  }
}
