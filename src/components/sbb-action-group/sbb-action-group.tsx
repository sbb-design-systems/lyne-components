import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core';
import { InterfaceButtonAttributes } from '../sbb-button/sbb-button.custom';
import { InterfaceLinkAttributes } from '../sbb-link/sbb-link.custom';
import { InterfaceSbbActionGroupAttributes } from './sbb-action-group.custom';

/**
 * @slot unnamed - Slot to render the content inside the container.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-action-group.scss',
  tag: 'sbb-action-group',
})
export class SbbActionGroup {
  /**
   * Set the slotted `<sbb-action-group>` children's alignment.
   */
  @Prop({ reflect: true }) public alignGroup: InterfaceSbbActionGroupAttributes['alignGroup'] =
    'start';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @Prop({ reflect: true })
  public horizontalFrom?: InterfaceSbbActionGroupAttributes['horizontalFrom'] = 'medium';

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @Prop({ reflect: true }) public orientation: InterfaceSbbActionGroupAttributes['orientation'] =
    'horizontal';

  /**
   * Size of the nested sbb-button instances. This will overwrite the size attribute of nested
   * sbb-button instances.
   */
  @Prop({ reflect: true }) public buttonSize?: InterfaceButtonAttributes['size'] = 'l';

  /**
   * Size of the nested sbb-link instances. This will overwrite the size attribute of nested
   * sbb-link instances.
   */
  @Prop({ reflect: true }) public linkSize?: InterfaceLinkAttributes['size'] = 'm';

  @Element() private _element!: HTMLElement;

  @Watch('buttonSize')
  public syncButtons(): void {
    this._element.querySelectorAll('sbb-button').forEach((b) => (b.size = this.buttonSize));
  }

  @Watch('linkSize')
  public syncLinks(): void {
    this._element.querySelectorAll('sbb-link').forEach((link) => {
      link.variant = 'block';
      link.size = this.linkSize;
    });
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-action-group">
        <slot
          onSlotchange={() => {
            this.syncButtons();
            this.syncLinks();
          }}
        />
      </div>
    );
  }
}
