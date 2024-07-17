import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { LinkTargetType } from '../../core/base-elements.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nCloseAlert, i18nFindOutMore } from '../../core/i18n.js';
import type { SbbOpenedClosedState } from '../../core/interfaces.js';
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
 * @event {CustomEvent<void>} dismissalRequested - Emits when dismissal of an alert was requested.
 */
@customElement('sbb-alert')
export class SbbAlertElement extends SbbIconNameMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
    dismissalRequested: 'dismissalRequested',
  } as const;

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @property({ reflect: true, type: Boolean }) public readonly = false;

  /** You can choose between `s`, `m` or `l` size. */
  @property({ reflect: true }) public size: 's' | 'm' | 'l' = 'm';

  /**
   * Name of the icon which will be forward to the nested `sbb-icon`.
   * Choose the icons from https://icons.app.sbb.ch.
   * Styling is optimized for icons of type HIM-CUS.
   */
  @property({ attribute: 'icon-name' }) public override iconName: string = 'info';

  /** Content of title. */
  @property({ attribute: 'title-content' }) public titleContent?: string;

  /** Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public titleLevel: SbbTitleLevel = '3';

  /** Content of the link. */
  @property({ attribute: 'link-content' }) public linkContent?: string;

  /** The href value you want to link to. */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel: string | undefined;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /** The enabled animations. */
  @property({ reflect: true }) public animation: 'open' | 'close' | 'all' | 'none' = 'all';

  /** The state of the alert. */
  private set _state(value: SbbOpenedClosedState) {
    this.setAttribute('data-state', value);
  }
  private get _state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  /** Emits when the fade in animation starts. */
  private _willOpen: EventEmitter<void> = new EventEmitter(this, SbbAlertElement.events.willOpen);

  /** Emits when the fade in animation ends and the button is displayed. */
  private _didOpen: EventEmitter<void> = new EventEmitter(this, SbbAlertElement.events.didOpen);

  /** Emits whenever the `sbb-notification` begins the closing transition. */
  private _willClose: EventEmitter<void> = new EventEmitter(this, SbbAlertElement.events.willClose);

  /** Emits whenever the `sbb-notification` is closed. */
  private _didClose: EventEmitter<void> = new EventEmitter(this, SbbAlertElement.events.didClose);

  /**
   * @deprecated
   * Emits when dismissal of an alert was requested.
   */
  private _dismissalRequested: EventEmitter<void> = new EventEmitter(
    this,
    SbbAlertElement.events.dismissalRequested,
  );

  private _language = new SbbLanguageController(this);

  protected override async firstUpdated(changedProperties: PropertyValues<this>): Promise<void> {
    super.firstUpdated(changedProperties);

    this._open();
  }

  /** Requests dismissal of the alert.
   * @deprecated in favour of 'willClose' and 'didClose' events
   */
  public requestDismissal(): void {
    this._dismissalRequested.emit();
  }

  /** Close the alert. */
  public close(): void {
    if (this._willClose.emit()) {
      this._state = 'closing';
    }
  }

  /** Open the alert. */
  private _open(): void {
    this._willOpen.emit();
    this._state = 'opening';
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (this._state === 'opening' && event.animationName === 'open-opacity') {
      this._handleOpening();
    }

    if (this._state === 'closing' && event.animationName === 'close') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this._didOpen.emit();
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this._didClose.emit();
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
                    size=${this.size === 'l' ? 'm' : this.size}
                    icon-name="cross-small"
                    @click=${() => this.requestDismissal()}
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
