import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
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

  public override focus(): void {
    this.shadowRoot!.querySelector<HTMLElement>('.sbb-chip__label')!.focus();
  }

  /**
   * Return the two focusable elements of the chip.
   * @internal
   */
  public getFocusSteps(): HTMLElement[] {
    return [this._chipLabel(), this._deleteButton()];
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    // Remove the delete button from the tab order.
    // SetTimeout is needed to override the button tabindex initialization
    setTimeout(() => (this._deleteButton().tabIndex = -1));
  }

  private _chipLabel(): HTMLElement {
    return this.shadowRoot!.querySelector('.sbb-chip__label')!;
  }

  private _deleteButton(): HTMLElement {
    return this.shadowRoot!.querySelector('sbb-mini-button')!;
  }

  // TODO handle aria-label
  protected override render(): TemplateResult {
    return html`
      <div class="sbb-chip" role="row">
        <span class="sbb-chip__label" tabindex="-1" role="gridcell">
          <slot>${this.value}</slot>
        </span>
        <sbb-mini-button
          tabindex="-1"
          class="sbb-chip__delete"
          icon-name="cross-tiny-medium"
          role="gridcell"
          ?disabled=${this.disabled}
          aria-label="Remove ${this.value}"
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
