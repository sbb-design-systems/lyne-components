import { type CSSResultGroup, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { type LinkTargetType, SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { forceType } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { i18nCloseAlert, i18nFindOutMore } from '../../core/i18n.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbTitleLevel } from '../../title.js';

import style from './alert.scss?lit&inline';

import '../../button/transparent-button.js';
import '../../divider.js';
import '../../link.js';
import '../../title.js';

/**
 * It displays messages which require user's attention.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-alert`.
 * @slot icon - Should be a `sbb-icon` which is displayed next to the title. Styling is optimized for icons of type HIM-CUS.
 * @slot title - Title content.
 * @event {CustomEvent<void>} willOpen - Emits when the opening animation starts.
 * @event {CustomEvent<void>} didOpen - Emits when the opening animation ends.
 * @event {CustomEvent<void>} willClose - Emits when the closing animation starts. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits when the closing animation ends.
 */
export
@customElement('sbb-alert')
class SbbAlertElement extends SbbIconNameMixin(SbbOpenCloseBaseElement) {
  public static override styles: CSSResultGroup = style;
  public static override readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor readonly: boolean = false;

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

  /** Content of title. */
  @forceType()
  @property({ attribute: 'title-content' })
  public accessor titleContent: string = '';

  /** Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public accessor titleLevel: SbbTitleLevel = '3';

  /** Content of the link. */
  @forceType()
  @property({ attribute: 'link-content' })
  public accessor linkContent: string = '';

  /** The href value you want to link to. */
  @forceType()
  @property()
  public accessor href: string = '';

  /** Where to display the linked URL. */
  @forceType()
  @property()
  public accessor target: LinkTargetType | string = '';

  /** The relationship of the linked URL as space-separated link types. */
  @forceType()
  @property()
  public accessor rel: string = '';

  /** This will be forwarded as aria-label to the relevant nested element. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /** The enabled animations. */
  @property({ reflect: true }) public accessor animation: 'open' | 'close' | 'all' | 'none' = 'all';

  private _language = new SbbLanguageController(this);

  /** Open the alert. */
  public open(): void {
    this.willOpen.emit();
    this.state = 'opening';
  }

  /** Close the alert. */
  public close(): void {
    if (this.state === 'opened' && this.willClose.emit()) {
      this.state = 'closing';
    }
  }

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);

    this.open();
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

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-alert__transition-wrapper" @animationend=${this._onAnimationEnd}>
        <!-- sub wrapper needed to properly support fade in animation -->
        <div class="sbb-alert__transition-sub-wrapper">
          <div class="sbb-alert">
            <span class="sbb-alert__icon"> ${this.renderIconSlot()} </span>
            <span class="sbb-alert__content">
              <sbb-title
                class="sbb-alert__title"
                level=${this.titleLevel}
                visual-level=${this.size === 'l' ? '3' : '5'}
                negative
              >
                <slot name="title">${this.titleContent}</slot>
              </sbb-title>
              <p class="sbb-alert__content-slot">
                <slot></slot>
              </p>
              ${this.href
                ? html` <sbb-link
                    accessibility-label=${this.accessibilityLabel ?? nothing}
                    href=${this.href ?? nothing}
                    target=${this.target ?? nothing}
                    rel=${this.rel ?? nothing}
                    negative
                  >
                    ${this.linkContent ? this.linkContent : i18nFindOutMore[this._language.current]}
                  </sbb-link>`
                : nothing}
            </span>
            ${!this.readonly
              ? html`<span class="sbb-alert__close-button-wrapper">
                  <sbb-divider
                    orientation="vertical"
                    negative
                    class="sbb-alert__close-button-divider"
                  ></sbb-divider>
                  <sbb-transparent-button
                    negative
                    size=${isLean() ? 's' : this.size === 'l' ? 'm' : this.size}
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
