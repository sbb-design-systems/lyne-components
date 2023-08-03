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
    this._setChildrenParameters(event);
  }

  @Element() private _element!: HTMLElement;

  private get _expansionPanels(): HTMLSbbExpansionPanelElement[] {
    return Array.from(this._element.querySelectorAll('sbb-expansion-panel'));
  }

  public connectedCallback(): void {
    this._setChildrenParameters(event);
  }

  private _accordionElements: Element[];

  private _setChildrenParameters(event): void {
    this._expansionPanels.forEach(
      (panel: HTMLSbbExpansionPanelElement) => (panel.titleLevel = this.titleLevel),
    );

    // Add attribute "first-panel" or "last-panel" for styling, even if the group is interrupted by non-panel elements
    // Retrieve every element inside accordion container
    this._accordionElements = (event.target as HTMLSlotElement).assignedElements();
    for (let i = 0; i < this._accordionElements.length; i++) {
      if (this._accordionElements[i].tagName == 'SBB-EXPANSION-PANEL') {
        // Set as first panel
        if (i === 0 || this._accordionElements[i - 1].tagName !== 'SBB-EXPANSION-PANEL') {
          this._accordionElements[i].setAttribute('first-panel', 'true');
        }
        // Set as last panel
        if (
          i === this._accordionElements.length - 1 ||
          this._accordionElements[i + 1].tagName !== 'SBB-EXPANSION-PANEL'
        ) {
          this._accordionElements[i].setAttribute('last-panel', 'true');
        }
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-accordion">
        <slot onSlotchange={(event) => this._setChildrenParameters(event)}></slot>
      </div>
    );
  }
}
