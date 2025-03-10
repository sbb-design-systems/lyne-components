import { type CSSResultGroup, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbLanguageController } from '../../core/controllers.js';
import { forceType, hostAttributes } from '../../core/decorators.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nChipDelete } from '../../core/i18n.js';
import { SbbDisabledMixin, SbbNegativeMixin } from '../../core/mixins.js';

import '../../button/mini-button.js';

import style from './chip.scss?lit&inline';

/**
 * It displays a chip. Usually used in combination with `sbb-chip-group`.
 *
 * @slot - Use the unnamed slot to add the display value. If not provided, the 'value' will be used.
 */
export
@customElement('sbb-chip')
@hostAttributes({
  role: 'row',
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

  /** This will be forwarded as aria-label to the inner label element. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  @state()
  private accessor _slottedLabel = '';

  /** @internal */
  private _requestDelete = new EventEmitter<any>(this, SbbChipElement.events.requestDelete);
  private _language = new SbbLanguageController(this);

  public override click(): void {
    if (this.disabled) {
      return;
    }
    const chipLabel = this._chipLabel();
    chipLabel.click();
    chipLabel.focus();
  }

  public override focus(): void {
    if (this.disabled) {
      return;
    }
    this._chipLabel().focus();
  }

  /**
   * Return the focusable elements of the chip.
   * @internal
   */
  public getFocusSteps(): HTMLElement[] {
    return this.readonly || this.disabled
      ? [this._chipLabel()]
      : [this._chipLabel(), this._deleteButton()];
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    // Remove the delete button from the tab order.
    // SetTimeout is needed to override the button tabindex initialization
    setTimeout(() => (this._deleteButton().tabIndex = -1));
  }

  private _chipLabel(): HTMLElement {
    return this.shadowRoot!.querySelector('.sbb-chip__label-wrapper')!;
  }

  private _deleteButton(): HTMLElement {
    return this.shadowRoot!.querySelector('sbb-mini-button')!;
  }

  private _onSlotChange(): void {
    this._slottedLabel = this.textContent ?? '';
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-chip">
        <div
          class="sbb-chip__label-wrapper"
          role="gridcell"
          tabindex=${!this.disabled ? '-1' : nothing}
          aria-label=${this.accessibilityLabel || nothing}
        >
          <span class="sbb-chip__label">
            <slot @slotchange=${this._onSlotChange}>${this.value}</slot>
          </span>
        </div>
        <div role="gridcell">
          <sbb-mini-button
            tabindex=${!this.disabled ? '-1' : nothing}
            class="sbb-chip__delete"
            icon-name="cross-tiny-small"
            aria-label=${`${i18nChipDelete[this._language.current]} ${this._slottedLabel || this.value}`}
            @click=${() => this._requestDelete.emit()}
          ></sbb-mini-button>
        </div>
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
