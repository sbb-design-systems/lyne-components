import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './header-environment.scss?lit&inline';

/**
 * It displays a ribbon inside the header to indicate the current environment.
 *
 * @slot - Use the unnamed slot to add the environment.
 *
 * @cssprop [--sbb-header-environment-background-color=var(sbb-color-granite)] - Can be used change the ribbon color.
 * @cssprop [--sbb-header-environment-color=var(sbb-color-white)] - Can be used change the text color.
 */
export
@customElement('sbb-header-environment')
class SbbHeaderEnvironmentElement extends SbbElementInternalsMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  private _env: string | null = null;

  public constructor() {
    super();
    this.addController(
      new MutationController(this, {
        config: { characterData: true, subtree: true },
        callback: () => {
          this._slottedTextChange();
        },
      }),
    );
  }

  private _slottedTextChange(): void {
    if (this._env) {
      this.internals.states.delete(`env-${this._env}`);
    }
    this._env = this.textContent?.trim() ?? '';
    if (this._env) {
      this.internals.states.add(`env-${this._env}`);
    }
  }

  protected override render(): TemplateResult {
    return html`
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
