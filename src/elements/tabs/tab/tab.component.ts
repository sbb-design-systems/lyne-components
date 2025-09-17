import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.js';

import style from './tab.scss?lit&inline';

let nextId = 0;

/**
 * Combined with a `sbb-tab-group` and `sbb-tab-label`, it displays a tab's content.
 *
 * @slot - Use the unnamed slot to provide content.
 */
export
@customElement('sbb-tab')
class SbbTabElement extends SbbElementInternalsMixin(LitElement) {
  public static override role = 'tabpanel';
  public static override styles: CSSResultGroup = style;

  /**
   * @internal
   * @deprecated
   */
  public configure(): void {}

  public override connectedCallback(): void {
    super.connectedCallback();

    this.id ||= `sbb-tab-${nextId++}`;
    this.tabIndex = 0;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-tab">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab': SbbTabElement;
  }
}
