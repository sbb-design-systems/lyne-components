import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './header-environment.scss?lit&inline';

/**
 * It displays a header section for the page.
 *
 * @slot - Use the unnamed slot to add actions, content and logo to the header.
 * @cssprop [--sbb-header-z-index=10] - Can be used to modify the z-index of the header.
 * @cssprop [--sbb-header-height=zero-small:var(--sbb-spacing-fixed-14x);medium-ultra:var(--sbb-spacing-fixed-24x)] - Can be used to modify height of the header.
 */
export
@customElement('sbb-header-environment')
class SbbHeaderEnvironmentElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  public constructor() {
    super();
    const observer = new MutationObserver(() => this._onSlotChange());
    observer.observe(this, { characterData: true, subtree: true });
  }

  private _onSlotChange(): void {
    console.log('eee');
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-header-environment__ribbon"></div>
      <span class="sbb-header-environment__text">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-environment': SbbHeaderEnvironmentElement;
  }
}
