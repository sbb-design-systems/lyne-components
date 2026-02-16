import { type CSSResultGroup, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbOpenCloseBaseElement } from '../../core/base-elements.ts';
import { SbbDarkModeController, SbbLanguageController } from '../../core/controllers.ts';
import { isLean, isZeroAnimationDuration } from '../../core/dom.ts';
import { i18nCloseAlert } from '../../core/i18n.ts';
import { SbbReadonlyMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import type { SbbLinkElement } from '../../link.ts';
import type { SbbTitleElement } from '../../title.ts';

import style from './alert.scss?lit&inline';

import '../../button/transparent-button.ts';
import '../../divider.ts';

/**
 * It displays messages which require user's attention.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-alert`. At a minimum an `sbb-title` element and a descriptive text should be used.
 * @slot icon - Should be a `sbb-icon` which is displayed next to the title. Styling is optimized for icons of type HIM-CUS.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 */
export
@customElement('sbb-alert')
class SbbAlertElement extends SbbIconNameMixin(SbbReadonlyMixin(SbbOpenCloseBaseElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static override readonly events = {
    beforeopen: 'beforeopen',
    open: 'open',
    beforeclose: 'beforeclose',
    close: 'close',
  } as const;

  /**
   * You can choose between `s`, `m` or `l` size.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' | 'l' = isLean() ? 's' : 'm';

  /** The enabled animations. */
  @property({ reflect: true }) public accessor animation: 'open' | 'close' | 'all' | 'none' = 'all';

  private _language = new SbbLanguageController(this);
  private _darkModeController = new SbbDarkModeController(this, () => {
    this._syncLinks();
    this._configureTitle();
    this.requestUpdate();
  });

  /** Open the alert. */
  public open(): void {
    this.state = 'opening';

    if (!this.dispatchBeforeOpenEvent()) {
      return;
    }

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Close the alert. */
  public close(): void {
    if (this.state === 'opened' && this.dispatchBeforeCloseEvent()) {
      this.state = 'closing';

      // If the animation duration is zero, the animationend event is not always fired reliably.
      // In this case we directly set the `closed` state.
      if (this._isZeroAnimationDuration()) {
        this._handleClosing();
      }
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this.open();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size')) {
      this._configureTitle();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-alert-animation-duration');
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (this.state === 'opening' && event.animationName === 'open-opacity') {
      this._handleOpening();
    } else if (this.state === 'closing' && event.animationName === 'close') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this.dispatchOpenEvent();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.dispatchCloseEvent();
    setTimeout(() => this.remove());
  }

  private _handleSlotchange(): void {
    this._syncLinks();

    const title = Array.from(this.children).find((el) => el.localName === 'sbb-title');
    if (title) {
      title.slot = 'title';
    }
  }

  private _syncLinks(): void {
    Array.from(this.querySelectorAll?.<SbbLinkElement>('sbb-link') ?? []).forEach((link) => {
      customElements.upgrade(link);
      link.negative = this._isLightMode();
    });
  }

  private _configureTitle(): void {
    const title = this.querySelector?.<SbbTitleElement>('sbb-title');
    if (title) {
      customElements.upgrade(title);
      title.negative = this._isLightMode();
      title.visualLevel = this.size === 'l' ? '3' : '5';
    }
  }

  private _isLightMode(): boolean {
    return !this._darkModeController.matches();
  }

  protected override renderIconName(): string {
    return super.renderIconName() || 'info';
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-alert__transition-wrapper" @animationend=${this._onAnimationEnd}>
        <!-- sub wrapper needed to properly support fade in animation -->
        <div class="sbb-alert__transition-sub-wrapper">
          <div class="sbb-alert">
            <span class="sbb-alert__icon"> ${this.renderIconSlot()} </span>
            <span class="sbb-alert__content">
              <slot name="title" @slotchange=${this._configureTitle}></slot>
              <p class="sbb-alert__content-slot">
                <slot @slotchange=${this._handleSlotchange}></slot>
              </p>
            </span>
            ${!this.readOnly
              ? html`<span class="sbb-alert__close-button-wrapper">
                  <sbb-divider
                    orientation="vertical"
                    ?negative=${this._isLightMode()}
                    class="sbb-alert__close-button-divider"
                  ></sbb-divider>
                  <sbb-transparent-button
                    ?negative=${this._isLightMode()}
                    size=${this.size === 'l' ? 'm' : this.size}
                    icon-name="cross-small"
                    @click=${() => this.close()}
                    aria-label=${i18nCloseAlert[this._language.current]}
                    class="sbb-alert__close-button"
                  ></sbb-transparent-button>
                </span>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-alert': SbbAlertElement;
  }
}
