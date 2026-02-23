import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { IS_FOCUSABLE_QUERY } from '../../core/a11y.ts';
import { SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './flip-card-details.scss?lit&inline';

/**
 * Combined with a `sbb-flip-card`, it displays its content when the card is flipped.
 *
 * @slot - Use the unnamed slot to provide any kind of content.
 */
export
@customElement('sbb-flip-card-details')
class SbbFlipCardDetailsElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  public constructor() {
    super();

    this.addController(
      new MutationController(this, {
        config: {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['href', 'tabindex', 'disabled', 'inert'],
        },
        callback: () => this._checkForSlottedActions(),
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'details';
  }

  private _checkForSlottedActions(): void {
    // We intentionally use toggle here, as add causes a MutationObserver loop.
    Array.from(this.querySelectorAll?.(IS_FOCUSABLE_QUERY) ?? []).forEach((el: Element) =>
      el.classList.toggle('sbb-action', true),
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card-details">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card-details': SbbFlipCardDetailsElement;
  }
}
