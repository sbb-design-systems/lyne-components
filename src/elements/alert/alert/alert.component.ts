import { type CSSResultGroup, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { forceType } from '../../core/decorators.js';
import { isLean, isZeroAnimationDuration } from '../../core/dom.js';
import { i18nCloseAlert } from '../../core/i18n.js';
import { SbbReadonlyMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbLinkElement } from '../../link.js';
import type { SbbTitleElement } from '../../title.js';

import style from './alert.scss?lit&inline';

import '../../button/transparent-button.js';
import '../../divider.js';

/**
 * It displays messages which require user's attention.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-alert`. Content should consist at minimum of an `sbb-title` element and a `p` element.
 * @slot icon - Should be a `sbb-icon` which is displayed next to the title. Styling is optimized for icons of type HIM-CUS.
 * @event {CustomEvent<void>} willOpen - Emits when the opening animation starts.
 * @event {CustomEvent<void>} didOpen - Emits when the opening animation ends.
 * @event {CustomEvent<void>} willClose - Emits when the closing animation starts. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits when the closing animation ends.
 */
export
@customElement('sbb-alert')
class SbbAlertElement extends SbbIconNameMixin(SbbReadonlyMixin(SbbOpenCloseBaseElement)) {
  public static override styles: CSSResultGroup = style;
  public static override readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /**
   * You can choose between `s`, `m` or `l` size.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' | 'l' = isLean() ? 's' : 'm';

  /**
   * Name of the icon which will be forward to the nested `sbb-icon`.
   * Choose the icons from https://icons.app.sbb.ch.
   * Styling is optimized for icons of type HIM-CUS.
   */
  @forceType()
  @property({ attribute: 'icon-name' })
  public override accessor iconName: string = 'info';

  /** The enabled animations. */
  @property({ reflect: true }) public accessor animation: 'open' | 'close' | 'all' | 'none' = 'all';

  private _language = new SbbLanguageController(this);

  /** Open the alert. */
  public open(): void {
    this.state = 'opening';
    this.willOpen.emit();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Close the alert. */
  public close(): void {
    if (this.state === 'opened' && this.willClose.emit()) {
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
    this.didOpen.emit();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.didClose.emit();
    setTimeout(() => this.remove());
  }

  private _handleSlotchange(): void {
    this._syncLinks();
    this._configureTitle();
  }

  private _syncLinks(): void {
    Array.from(this.querySelectorAll?.<SbbLinkElement>('sbb-link') ?? []).forEach((link) => {
      customElements.upgrade(link);
      link.negative = true;
    });
  }

  private _configureTitle(): void {
    const title = this.querySelector?.<SbbTitleElement>('sbb-title');
    if (title) {
      customElements.upgrade(title);
      title.negative = true;
      title.visualLevel = this.size === 'l' ? '3' : '5';
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-alert__transition-wrapper" @animationend=${this._onAnimationEnd}>
        <!-- sub wrapper needed to properly support fade in animation -->
        <div class="sbb-alert__transition-sub-wrapper">
          <div class="sbb-alert">
            <span class="sbb-alert__icon"> ${this.renderIconSlot()} </span>
            <span class="sbb-alert__content">
              <slot @slotchange=${this._handleSlotchange}></slot>
            </span>
            ${!this.readOnly
              ? html`<span class="sbb-alert__close-button-wrapper">
                  <sbb-divider
                    orientation="vertical"
                    negative
                    class="sbb-alert__close-button-divider"
                  ></sbb-divider>
                  <sbb-transparent-button
                    negative
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
