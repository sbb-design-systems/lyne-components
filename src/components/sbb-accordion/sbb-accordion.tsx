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
  /** The level for the sbb-expansion-panel-header. */
  @Prop() public level?: InterfaceTitleAttributes['level'];

  /** Whether more than one sbb-expansion-panel can be open at the same time. */
  @Prop() public multi = false;

  @Listen('will-open')
  public closePanels(e): void {
    if (e.target?.tagName !== 'SBB-EXPANSION-PANEL' || this.multi) {
      return;
    }

    this._expansionPanels
      .filter((panel: HTMLSbbExpansionPanelElement) => panel !== e.target)
      .forEach((panel: HTMLSbbExpansionPanelElement) => (panel.expanded = false));
  }

  @Element() private _element!: HTMLElement;

  private get _expansionPanels(): HTMLSbbExpansionPanelElement[] {
    return Array.from(this._element.querySelectorAll('sbb-expansion-panel'));
  }

  public connectedCallback(): void {
    this._setChildrenParameters();
  }

  private _onSlotChange(): void {
    this._setChildrenParameters();
  }

  private _setChildrenParameters(): void {
    this._expansionPanels.forEach(
      (panel: HTMLSbbExpansionPanelElement) => (panel.level = this.level),
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
