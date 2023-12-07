import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { toggleDatasetEntry } from '../core/dom';
import { ConnectedAbortController } from '../core/eventing';
import { SbbExpansionPanelElement } from '../expansion-panel';
import type { TitleLevel } from '../title';

import style from './accordion.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add `sbb-expansion-panel` elements.
 */
@customElement('sbb-accordion')
export class SbbAccordionElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The heading level for the sbb-expansion-panel-headers within the component. */
  @property({ attribute: 'title-level' })
  public set titleLevel(value: TitleLevel | null) {
    this._titleLevel = value;
    this._setTitleLevelOnChildren();
  }
  public get titleLevel(): TitleLevel | null {
    return this._titleLevel;
  }
  private _titleLevel: TitleLevel | null = null;

  /** Whether the animation should be disabled. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  /** Whether more than one sbb-expansion-panel can be open at the same time. */
  @property({ type: Boolean })
  public set multi(value: boolean) {
    const oldValue = this._multi;
    this._multi = value;
    this._resetExpansionPanels(this._multi, oldValue);
  }
  public get multi(): boolean {
    return this._multi;
  }
  private _multi: boolean = false;

  private _abort = new ConnectedAbortController(this);

  private _closePanels(e: CustomEvent): void {
    if ((e.target as HTMLElement)?.tagName !== 'SBB-EXPANSION-PANEL' || this.multi) {
      return;
    }

    this._expansionPanels
      .filter((panel) => panel !== e.target)
      .forEach((panel) => (panel.expanded = false));
  }

  private _resetExpansionPanels(newValue: boolean, oldValue: boolean): void {
    // If it's changing from "multi = true" to "multi = false", open the first panel and close all the others.
    const expansionPanels = this._expansionPanels;
    if (expansionPanels.length > 1 && oldValue && !newValue) {
      expansionPanels[0].expanded = true;
      expansionPanels
        .filter((_, index: number) => index > 0)
        .forEach((panel) => (panel.expanded = false));
    }
  }

  private _setTitleLevelOnChildren(): void {
    this._expansionPanels.forEach((panel) => (panel.titleLevel = this.titleLevel));
  }

  private get _expansionPanels(): SbbExpansionPanelElement[] {
    return Array.from(this.querySelectorAll?.('sbb-expansion-panel') ?? []);
  }

  private _setChildrenParameters(): void {
    const expansionPanels = this._expansionPanels;
    if (!expansionPanels || !(expansionPanels.length > 0)) {
      return;
    }

    expansionPanels.forEach((panel: SbbExpansionPanelElement) => {
      panel.titleLevel = this.titleLevel;
      panel.disableAnimation = this.disableAnimation;
      toggleDatasetEntry(panel, 'accordionFirst', false);
      toggleDatasetEntry(panel, 'accordionLast', false);
    });
    toggleDatasetEntry(expansionPanels[0], 'accordionFirst', true);
    toggleDatasetEntry(expansionPanels[expansionPanels.length - 1], 'accordionLast', true);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener(
      SbbExpansionPanelElement.events.willOpen,
      (e: CustomEvent) => this._closePanels(e),
      { signal },
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-accordion">
        <slot @slotchange=${() => this._setChildrenParameters()}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-accordion': SbbAccordionElement;
  }
}
