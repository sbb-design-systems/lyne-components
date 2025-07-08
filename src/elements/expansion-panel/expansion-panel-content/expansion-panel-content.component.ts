import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.js';

import style from './expansion-panel-content.scss?lit&inline';

/**
 * It can be used as a container for the content of the `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-expansion-panel`.
 */
export
@customElement('sbb-expansion-panel-content')
class SbbExpansionPanelContentElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'region';
  public static override styles: CSSResultGroup = style;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'content';
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-expansion-panel-content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-expansion-panel-content': SbbExpansionPanelContentElement;
  }
}
