import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import { SbbMiniButtonElement } from '../../button.pure.ts';
import {
  boxSizingStyles,
  i18nChipDelete,
  SbbDisabledMixin,
  SbbElement,
  type SbbElementType,
  SbbLanguageController,
  SbbNegativeMixin,
  SbbReadonlyMixin,
  screenReaderOnlyStyles,
} from '../../core.ts';

import style from './chip.scss?inline';

/**
 * It displays a chip. Usually used in combination with `sbb-chip-group`.
 *
 * @slot - Use the unnamed slot to add the display value. If not provided, the 'value' will be used.
 * @overrideType value - (T = string) | null
 */
export class SbbChipElement<T = string> extends SbbNegativeMixin(
  SbbDisabledMixin(SbbReadonlyMixin(SbbElement)),
) {
  public static override readonly elementName: string = 'sbb-chip';
  public static override elementDependencies: SbbElementType[] = [SbbMiniButtonElement];
  public static override readonly role = 'option';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    screenReaderOnlyStyles,
    unsafeCSS(style),
  ];
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
      <span class="sbb-screen-reader-only">, ${i18nChipDelete[this._language.current]}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-chip': SbbChipElement;
  }
}
