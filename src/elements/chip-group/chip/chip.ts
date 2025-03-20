import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import { SbbDisabledMixin, SbbNegativeMixin } from '../../core/mixins.js';

import '../../button/mini-button.js';
import '../../screen-reader-only/screen-reader-only.js';

import style from './chip.scss?lit&inline';

/**
 * It displays a chip. Usually used in combination with `sbb-chip-group`.
 *
 * @slot - Use the unnamed slot to add the display value. If not provided, the 'value' will be used.
 */
export
@customElement('sbb-chip')
@hostAttributes({
  role: 'option',
})
class SbbChipElement extends SbbNegativeMixin(SbbDisabledMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    requestDelete: 'requestDelete',
  } as const;

  /** The value of chip. Will be used as label if nothing is slotted. */
  @forceType() @property() public accessor value: string = '';

  /** Whether the component is readonly */
  @forceType()
  @property({ type: Boolean, reflect: true })
  public accessor readonly: boolean = false;

  /** @internal */
  private _requestDelete = new EventEmitter<any>(this, SbbChipElement.events.requestDelete);

  public override click(): void {
    if (this.disabled) {
      return;
    }
    this.focus();
    super.click();
  }

  public override focus(): void {
    if (this.disabled) {
      return;
    }
    super.focus();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.removeAttribute('tabindex');
      } else {
        this.setAttribute('tabindex', '-1');
      }
    }
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    // Remove the delete button from the tab order.
    // SetTimeout is needed to override the button tabindex initialization
    setTimeout(() => (this._deleteButton().tabIndex = -1));
  }

  private _deleteButton(): HTMLElement {
    return this.shadowRoot!.querySelector('sbb-mini-button')!;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-chip">
        <div class="sbb-chip__label-wrapper">
          <span class="sbb-chip__label">
            <slot>${this.value}</slot>
          </span>
        </div>
        <sbb-mini-button
          class="sbb-chip__delete"
          icon-name="cross-tiny-small"
          @click=${() => this._requestDelete.emit()}
        >
        </sbb-mini-button>
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
