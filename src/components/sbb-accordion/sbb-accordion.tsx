import { Component, ComponentInterface, Element, h, JSX, Listen, Prop, Watch } from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import { toggleDatasetEntry } from '../../global/dom';

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

  /** Whether the animation should be disabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

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
    const expansionPanels = this._expansionPanels;
    if (expansionPanels.length > 1 && oldValue && !newValue) {
      expansionPanels[0].expanded = true;
      expansionPanels
        .filter((_: HTMLSbbExpansionPanelElement, index: number) => index > 0)
        .forEach((panel: HTMLSbbExpansionPanelElement) => (panel.expanded = false));
    }
  }

  @Watch('titleLevel')
  public setTitleLevelOnChildren(): void {
    this._expansionPanels.forEach(
      (panel: HTMLSbbExpansionPanelElement) => (panel.titleLevel = this.titleLevel),
    );
  }

  @Element() private _element!: HTMLElement;

  private get _expansionPanels(): HTMLSbbExpansionPanelElement[] {
    return Array.from(this._element.querySelectorAll('sbb-expansion-panel'));
  }

  private _setChildrenParameters(): void {
    const expansionPanels = this._expansionPanels;
    if (!expansionPanels) {
      return;
    }

    expansionPanels.forEach((panel: HTMLSbbExpansionPanelElement) => {
      panel.titleLevel = this.titleLevel;

      toggleDatasetEntry(panel, 'accordionFirst', false);
      toggleDatasetEntry(panel, 'accordionLast', false);

      if (this.disableAnimation) {
        panel.setAttribute('disable-animation', 'true');
      } else {
        panel.removeAttribute('disable-animation');
      }
    });
    toggleDatasetEntry(expansionPanels[0], 'accordionFirst', true);
    toggleDatasetEntry(expansionPanels[expansionPanels.length - 1], 'accordionLast', true);
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-accordion">
        <slot onSlotchange={() => this._setChildrenParameters()}></slot>
      </div>
    );
  }
}
