import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbLanguageController } from '../core/controllers.ts';
import { isLean, isZeroAnimationDuration } from '../core/dom.ts';
import { i18nCloseNotification } from '../core/i18n.ts';
import type { SbbOpenedClosedState } from '../core/interfaces.ts';
import { SbbElementInternalsMixin, SbbReadonlyMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';
import { SbbIconNameMixin } from '../icon.ts';
import type { SbbTitleElement } from '../title.ts';

import style from './notification.scss?lit&inline';

import '../button/secondary-button.ts';
import '../divider.ts';

const notificationTypes = new Map([
  ['info', 'circle-information-small'],
  ['note', 'circle-information-small'],
  ['success', 'circle-tick-small'],
  ['warn', 'circle-exclamation-point-small'],
  ['error', 'circle-cross-small'],
]);

const DEBOUNCE_TIME = 150;

/**
 * It displays messages which require a user's attention without interrupting its tasks.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-notification`. Content should consist of an optional `sbb-title` element and text content.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @slot icon - Use this slot to display a custom icon by providing an `sbb-icon` component.
 * @cssprop [--sbb-notification-margin=0] - Can be used to modify the margin in order to get a smoother animation.
 * See style section for more information.
 */
export
@customElement('sbb-notification')
class SbbNotificationElement extends SbbIconNameMixin(
  SbbReadonlyMixin(SbbElementInternalsMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    beforeopen: 'beforeopen',
    open: 'open',
    beforeclose: 'beforeclose',
    close: 'close',
  } as const;

  /** The type of the notification. */
  @property({ reflect: true }) public accessor type:
    | 'info'
    | 'note'
    | 'success'
    | 'warn'
    | 'error' = 'info';

  /**
   * Size variant, either s or m.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' = isLean() ? 's' : 'm';

  /** The enabled animations. */
  @property({ reflect: true }) public accessor animation: 'open' | 'close' | 'all' | 'none' = 'all';

  /** The state of the component. */
  private set _state(state: SbbOpenedClosedState) {
    if (this._stateInternal) {
      this.internals.states.delete(`state-${this._stateInternal}`);
    }
    this._stateInternal = state;
    if (this._stateInternal) {
      this.internals.states.add(`state-${this._stateInternal}`);
    }
  }
  private get _state(): SbbOpenedClosedState {
    return this._stateInternal;
  }
  private _stateInternal!: SbbOpenedClosedState;

  private _notificationElement!: HTMLElement;
  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;
  private _language = new SbbLanguageController(this);
  private _notificationResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._onNotificationResize(),
  });

  public constructor() {
    super();
    this._state = 'closed';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('size')) {
      this._configureTitle();
    }
  }

  private _open(): void {
    if (this._state === 'closed') {
      this._state = 'opening';
      /** Emits when the opening animation starts. */
      this.dispatchEvent(new Event('beforeopen'));

      // If the animation duration is zero, the animationend event is not always fired reliably.
      // In this case we directly set the `opened` state.
      if (this._isZeroAnimationDuration()) {
        this._handleOpening();
      }
    }
  }

  public close(): void {
    if (this._state === 'opened' && this._dispatchBeforeCloseEvent()) {
      this._state = 'closing';

      // If the animation duration is zero, the animationend event is not always fired reliably.
      // In this case we directly set the `closed` state.
      if (this._isZeroAnimationDuration()) {
        this._handleClosing();
      }
    }
  }

  private _dispatchBeforeCloseEvent(): boolean {
    /** Emits when the closing animation starts. Can be canceled to prevent the component from closing. */
    return this.dispatchEvent(new Event('beforeclose', { cancelable: true }));
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._notificationElement = this.shadowRoot?.querySelector(
      '.sbb-notification__wrapper',
    ) as HTMLElement;
    // We need to wait for the component's `updateComplete` in order to set the correct
    // height to the notification element.
    this.updateComplete.then(() => {
      this._setNotificationHeight();
      this._open();
    });
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-notification-animation-duration');
  }

  private _setNotificationHeight(): void {
    if (!this._notificationElement?.scrollHeight) {
      return;
    }
    const notificationHeight = `${this._notificationElement.scrollHeight}px`;
    this.style.setProperty('--sbb-notification-height', notificationHeight);
  }

  private _onNotificationResize(): void {
    if (this._state !== 'opened') {
      return;
    }

    if (this._resizeObserverTimeout) {
      clearTimeout(this._resizeObserverTimeout);
    }

    // Disable the animation when resizing the notification to avoid strange height transition effects.
    this.internals.states.add('resize-disable-animation');
    this._resizeObserverTimeout = setTimeout(
      () => this.internals.states.delete('resize-disable-animation'),
      DEBOUNCE_TIME,
    );

    // To avoid ResizeObserver loops, we set the height a tick later.
    setTimeout(() => this._setNotificationHeight());
  }

  private _onNotificationAnimationEnd(event: AnimationEvent): void {
    if (this._state === 'opening' && event.animationName === 'open') {
      this._handleOpening();
    }

    if (this._state === 'closing' && event.animationName === 'close-height') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this._notificationResizeObserver.observe(this._notificationElement);
    /** Emits when the opening animation ends. */
    this.dispatchEvent(new Event('open'));
  }

  private _handleClosing(): void {
    this._state = 'closed';
    /** Emits when the closing animation ends. */
    this.dispatchEvent(new Event('close'));
    this._notificationResizeObserver.unobserve(this._notificationElement);
    setTimeout(() => this.remove());
  }

  private _handleSlotchange(): void {
    const title = Array.from(this.children).find((el) => el.localName === 'sbb-title');
    if (title) {
      title.slot = 'title';
    }
  }

  private _configureTitle(): void {
    const title = this.querySelector?.<SbbTitleElement>('sbb-title');
    if (title) {
      customElements.upgrade(title);
      title.visualLevel = this.size === 'm' ? '5' : '6';
    }
  }

  protected override renderIconName(): string {
    return super.renderIconName() || notificationTypes.get(this.type)!;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-notification__wrapper" @animationend=${this._onNotificationAnimationEnd}>
        <div class="sbb-notification">
          ${this.renderIconSlot('sbb-notification__icon')}
          <span class="sbb-notification__content">
            <slot name="title" @slotchange=${this._configureTitle}></slot>
            <p class="sbb-notification__text">
              <slot @slotchange=${this._handleSlotchange}></slot>
            </p>
          </span>

          ${!this.readOnly
            ? html`<span class="sbb-notification__close-wrapper">
                <sbb-divider class="sbb-notification__divider" orientation="vertical"></sbb-divider>
                <sbb-secondary-button
                  size=${this.size}
                  icon-name="cross-small"
                  @click=${() => this.close()}
                  aria-label=${i18nCloseNotification[this._language.current]}
                  class="sbb-notification__close"
                ></sbb-secondary-button>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-notification': SbbNotificationElement;
  }
}
