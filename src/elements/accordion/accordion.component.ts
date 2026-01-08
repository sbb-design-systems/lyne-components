import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, handleDistinctChange } from '../core/decorators.ts';
import { isLean } from '../core/dom.ts';
import { isEventPrevented } from '../core/eventing.ts';
import { SbbHydrationMixin, ɵstateController } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';
import type { SbbExpansionPanelElement } from '../expansion-panel.ts';
import type { SbbTitleLevel } from '../title.ts';

import style from './accordion.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add `sbb-expansion-panel` elements.
 */
export
@customElement('sbb-accordion')
class SbbAccordionElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /**
   * Size variant, either l or s; overrides the size on any projected `sbb-expansion-panel`.
   * @default 'l' / 's' (lean)
   */
  @property({ reflect: true })
  public accessor size: 's' | 'l' = isLean() ? 's' : 'l';

  /**
   * The heading level for the sbb-expansion-panel-headers within the component.
   * @controls SbbExpansionPanelElement.titleLevel
   */
  @handleDistinctChange((e: SbbAccordionElement) => e._setTitleLevelOnChildren())
  @property({ attribute: 'title-level' })
  public accessor titleLevel: SbbTitleLevel | null = null;

  /** Whether more than one sbb-expansion-panel can be open at the same time. */
  @forceType()
  @handleDistinctChange(
    (e: SbbAccordionElement, newValue: boolean, oldValue: boolean | undefined) =>
      e._resetExpansionPanels(newValue, !!oldValue),
  )
  @property({ type: Boolean })
  public accessor multi: boolean = false;

  public constructor() {
    super();
    this.addEventListener?.(
      'beforeopen',
      async (e: Event) => {
        if (!(await isEventPrevented(e))) {
          this._closePanels(e);
        }
      },
      {
        // We use capture here, because 'beforeopen' does not bubble.
        capture: true,
      },
    );
  }

  private _expansionPanels(): SbbExpansionPanelElement[] {
    return Array.from(this.querySelectorAll?.('sbb-expansion-panel') ?? []);
  }

  private _closePanels(e: Event): void {
    if ((e.target as HTMLElement)?.localName !== 'sbb-expansion-panel' || this.multi) {
      return;
    }

    this._expansionPanels()
      .filter((panel) => panel !== e.target)
      .forEach((panel) => (panel.expanded = false));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size')) {
      this._expansionPanels().forEach(
        (panel: SbbExpansionPanelElement) => (panel.size = this.size),
      );
    }
  }

  private _resetExpansionPanels(newValue: boolean, oldValue: boolean): void {
    // If it's changing from "multi = true" to "multi = false", open the first panel and close all the others.
    const expansionPanels = this._expansionPanels();
    if (expansionPanels.length > 1 && oldValue && !newValue) {
      expansionPanels[0].expanded = true;
      expansionPanels
        .filter((_, index: number) => index > 0)
        .forEach((panel) => (panel.expanded = false));
    }
  }

  private _setTitleLevelOnChildren(): void {
    this._expansionPanels().forEach(
      (panel: SbbExpansionPanelElement) => (panel.titleLevel = this.titleLevel),
    );
  }

  private _handleSlotchange(): void {
    this._expansionPanels().forEach(
      (panel: SbbExpansionPanelElement, index: number, array: SbbExpansionPanelElement[]) => {
        panel.titleLevel = this.titleLevel;
        panel.size = this.size;
        const controller = ɵstateController(panel);
        controller.toggle('accordion-first', index === 0);
        controller.toggle('accordion-last', index === array.length - 1);
      },
    );
  }

  protected override render(): TemplateResult {
    return html` <slot @slotchange=${this._handleSlotchange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-accordion': SbbAccordionElement;
  }
}
