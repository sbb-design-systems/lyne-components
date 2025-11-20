import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.ts';
import { SbbDisabledMixin, SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import type { SbbToggleElement } from '../toggle.ts';

import style from './toggle-option.scss?lit&inline';

/**
 * It displays a toggle option within a `sbb-toggle`.
 *
 * @slot - Use the unnamed slot to add content to the label of the toggle option.
 * @slot icon - Slot used to render the `sbb-icon`.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-toggle-option')
class SbbToggleOptionElement<T = string> extends SbbDisabledMixin(
  SbbIconNameMixin(SbbElementInternalsMixin(LitElement)),
) {
  public static override readonly role = 'radio';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Whether the toggle-option is checked. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor checked: boolean = false;

  /** Value of toggle-option. */
  @property()
  public accessor value: T | null = null;

  private _toggle: SbbToggleElement | null = null;

  public constructor() {
    super();
    // We need to listen input event on host as with keyboard navigation
    // the Input Event is triggered from sbb-toggle.
    this.addEventListener?.('input', () => this._handleInput());
    this.addEventListener?.('click', () => {
      if (!this.disabled && !this.checked) {
        this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      }
    });

    this.addController(
      new ResizeController(this, {
        skipInitial: true,
        callback: () => this._toggle?.updatePillPosition?.(true),
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // We can use closest here, as we expect the parent sbb-toggle to be in light DOM.
    this._toggle = this.closest?.('sbb-toggle') ?? null;
    this._verifyTabindex();
    this._toggle?.updatePillPosition?.(true);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._toggle = null;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._toggle?.updatePillPosition?.(true);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.internals.ariaChecked = `${this.checked}`;
      this._verifyTabindex();
      if (this.checked) {
        this._uncheckOtherOptions();
      }
    }
    if (changedProperties.has('disabled')) {
      this._handleDisabledChange();
    }
  }

  private _uncheckOtherOptions(): void {
    this._toggle?.options.filter((o) => o !== this).forEach((o) => (o.checked = false));
    this._toggle?.statusChanged();
  }

  private _handleDisabledChange(): void {
    this.internals.ariaDisabled = this.disabled ? 'true' : null;
    this._verifyTabindex();
  }

  private _handleInput(): void {
    if (this.disabled) {
      return;
    }
    this.checked = true;
    this._uncheckOtherOptions();
  }

  private _verifyTabindex(): void {
    this.tabIndex = this.checked && !this.disabled ? 0 : -1;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-toggle-option">
        ${this.renderIconSlot()}
        <span class="sbb-toggle-option__label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-option': SbbToggleOptionElement;
  }
}
