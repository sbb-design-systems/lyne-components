import { Component, ComponentInterface, Element, h, JSX, Listen, Prop, Watch } from '@stencil/core';
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
  /** The heading level for the sbb-expansion-panel-headers within the component. */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'];

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

  @Watch('multi')
  public resetExpansionPanels(newValue: boolean, oldValue: boolean): void {
    // If it's changing from "multi = true" to "multi = false", open the first panel and close all the others.
    if (this._expansionPanels.length > 1 && oldValue && !newValue) {
      this._expansionPanels[0].expanded = true;
      this._expansionPanels
        .filter((_, index: number) => index > 0)
        .forEach((panel: HTMLSbbExpansionPanelElement) => (panel.expanded = false));
    }
  }

  @Watch('titleLevel')
  public setTitleLevelOnChildren(): void {
    this._setChildrenParameters();
  }

  @Element() private _element!: HTMLElement;

  private get _expansionPanels(): HTMLSbbExpansionPanelElement[] {
    return Array.from(this._element.querySelectorAll('sbb-expansion-panel'));
  }

  public connectedCallback(): void {
    this._setChildrenParameters();
  }

  private _setChildrenParameters(): void {
    this._expansionPanels.forEach(
      (panel: HTMLSbbExpansionPanelElement) => (panel.titleLevel = this.titleLevel),
    );
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-accordion">
        <slot onSlotchange={() => this._setChildrenParameters()}></slot>
      </div>
    );
  }
}
