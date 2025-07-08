import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { type CSSResultGroup, html, isServer, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.js';

import style from './header-environment.scss?lit&inline';

/**
 * It displays a ribbon inside the header to indicate the current environment.
 *
 * @slot - Use the unnamed slot to add the environment.
 *
 * @cssprop [--sbb-header-environment-color=var(sbb-color-red)] - Can be used change the ribbon color.
 * @cssprop [--sbb-header-environment-text-color=var(sbb-color-white)] - Can be used change the text color.
 */
export
@customElement('sbb-header-environment')
class SbbHeaderEnvironmentElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  public constructor() {
    super();
    if (!isServer) {
      this.addController(
        new MutationController(this, {
          config: { characterData: true, subtree: true },
          callback: () => {
            this._slottedTextChange();
          },
        }),
      );
    }
  }

  private _slottedTextChange(): void {
    const env = this.textContent?.trim();
    this.internals.states.clear();
    if (env) {
      this.toggleState(`env-${env}`, true);
    }
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
