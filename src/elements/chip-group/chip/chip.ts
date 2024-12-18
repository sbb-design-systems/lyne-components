import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import { SbbDisabledMixin } from '../../core/mixins.js';

import '../../button/mini-button.js';

import style from './chip.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add the display value. If not provided, the 'value' will be used.
 */
export
@customElement('sbb-chip')
class SbbChipElement extends SbbDisabledMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    requestDelete: 'requestDelete',
  } as const;

  /** The value of chip. Will be used as label. */
  @forceType() @property() public accessor value: string = '';

  /** @internal */
  private _requestDelete = new EventEmitter<any>(this, SbbChipElement.events.requestDelete);

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-chip">
        <span class="sbb-chip__label">
          <slot>${this.value}</slot>
        </span>
        <sbb-mini-button
          class="sbb-chip__delete"
          icon-name="cross-tiny-medium"
          ?disabled=${this.disabled}
          @click=${() => this._requestDelete.emit()}
        ></sbb-mini-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip': SbbChipElement;
  }
}
