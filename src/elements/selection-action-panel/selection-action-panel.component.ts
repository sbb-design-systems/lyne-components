import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbHydrationMixin, SbbSelectionPanelMixin } from '../core/mixins.js';

import style from './selection-action-panel.scss?lit&inline';

import '../divider.js';

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
  public static override styles: CSSResultGroup = style;

  public constructor() {
    super();
    this.addEventListener?.('statechange', (e) => this.onInputStateChange(e));
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this.toggleState(
      'with-expansion-panel',
      this.parentElement?.localName === 'sbb-selection-expansion-panel',
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-selection-action-panel__wrapper">
        <div class="sbb-selection-action-panel__badge">
          <slot name="badge"></slot>
        </div>
        <div class="sbb-selection-action-panel">
          <slot></slot>
        </div>
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
