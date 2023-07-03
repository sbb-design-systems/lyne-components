import { Component, ComponentInterface, Element, h, JSX, Listen, Prop } from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

/**
 * @slot unnamed - Use this to add one or more sbb-expansion-panel.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-accordion.scss',
  tag: 'sbb-accordion',
})
export class SbbAccordion implements ComponentInterface {
  /**  */
  @Prop() public level?: InterfaceTitleAttributes['level'];

  /**  */
  @Prop() public multi = false;

  @Listen('will-open')
  public closePanels(e): void {
    // TODO filter event
    if (!this.multi) {
      const toClose: HTMLSbbExpansionPanelElement[] = this._expansionPanels.filter(
        (panel) => panel !== e.target
      );
      toClose.forEach((panel) => (panel.expanded = false));
    }
  }

  private get _expansionPanels(): HTMLSbbExpansionPanelElement[] {
    return Array.from(this._element.querySelectorAll('sbb-expansion-panel'));
  }

  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
    this._setChildrenParameters();
  }

  private _onSlotChange(): void {
    this._setChildrenParameters();
  }

  private _setChildrenParameters(): void {
    this._expansionPanels.forEach(
      (panel: HTMLSbbExpansionPanelElement) => (panel.level = this.level)
    );
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-accordion">
        <slot onSlotchange={() => this._onSlotChange()}></slot>
      </div>
    );
  }
}
