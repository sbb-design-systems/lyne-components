import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbCardBadgeElement } from '../card.ts';
import type { SbbCheckboxPanelElement } from '../checkbox/checkbox-panel.ts';
import { SbbHydrationMixin, SbbSelectionPanelMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';
import type { SbbRadioButtonPanelElement } from '../radio-button/radio-button-panel.ts';

import style from './selection-action-panel.scss?lit&inline';

/**
 * It displays a panel connected to a `sbb-checkbox` or to a `sbb-radio-button`.
 * It can also contain an action element (e.g. an `sbb-button`)
 *
 * @slot - Use this slot to render a `sbb-checkbox-panel` or `sbb-radio-button-panel` element and the action element.
 * @slot badge - Use this slot to render a `sbb-card-badge` component.
 */
export
@customElement('sbb-selection-action-panel')
class SbbSelectionActionPanelElement extends SbbSelectionPanelMixin(SbbHydrationMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  public override connectedCallback(): void {
    super.connectedCallback();

    this.toggleState(
      'with-expansion-panel',
      this.parentElement?.localName === 'sbb-selection-expansion-panel',
    );
  }

  private _handleSlotchange(): void {
    const badgeElements = (this.shadowRoot!.querySelector<HTMLSlotElement>(
      'slot[name="badge"]',
    )?.assignedElements() ?? []) as SbbCardBadgeElement[];
    const panelElements =
      this.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')?.assignedElements({
        flatten: true,
      }) ?? [];
    if (badgeElements.length > 0) {
      const panel = panelElements.find(
        (panel) =>
          panel.localName === 'sbb-radio-button-panel' || panel.localName === 'sbb-checkbox-panel',
      ) as SbbCheckboxPanelElement | SbbRadioButtonPanelElement;
      if (panel && !panel.ariaDescription) {
        panel.ariaDescribedByElements = badgeElements;
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-selection-action-panel__badge">
        <slot name="badge" @slotchange=${this._handleSlotchange}></slot>
      </div>
      <div class="sbb-selection-action-panel">
        <slot @slotchange=${this._handleSlotchange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-selection-action-panel': SbbSelectionActionPanelElement;
  }
}
