import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbLanguageController } from '../../core/controllers.ts';
import { i18nChipDelete } from '../../core/i18n.ts';
import {
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbNegativeMixin,
  SbbReadonlyMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import '../../button/mini-button.ts';
import '../../screen-reader-only.ts';

import style from './chip.scss?lit&inline';

/**
 * It displays a chip. Usually used in combination with `sbb-chip-group`.
 *
 * @slot - Use the unnamed slot to add the display value. If not provided, the 'value' will be used.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-chip')
class SbbChipElement<T = string> extends SbbNegativeMixin(
  SbbDisabledMixin(SbbReadonlyMixin(SbbElementInternalsMixin(LitElement))),
) {
  public static override readonly role = 'option';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    requestdelete: 'requestdelete',
  } as const;

  /** The value of chip. Will be used as label if nothing is slotted. */
  @property() public accessor value: T | null = null;

  private _language = new SbbLanguageController(this);

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
    setTimeout(() => this._deleteButton().removeAttribute('tabindex'));
  }

  private _deleteButton(): HTMLElement {
    return this.shadowRoot!.querySelector('sbb-mini-button')!;
  }

  private _handleDeleteButtonClick(): void {
    /** @internal */
    this.dispatchEvent(new Event('requestdelete', { bubbles: true, composed: true }));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-chip__label-wrapper">
        <span class="sbb-chip__label">
          <slot>${this.value ?? ''}</slot>
        </span>
      </div>
      <sbb-mini-button
        aria-hidden="true"
        class="sbb-chip__delete"
        icon-name="cross-tiny-small"
        @click=${this._handleDeleteButtonClick}
      >
      </sbb-mini-button>
      <sbb-screen-reader-only>, ${i18nChipDelete[this._language.current]}</sbb-screen-reader-only>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip': SbbChipElement;
  }
}
