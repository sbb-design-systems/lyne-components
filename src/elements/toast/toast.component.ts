import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbTransparentButtonElement, SbbTransparentButtonLinkElement } from '../button.ts';
import { SbbOpenCloseBaseElement } from '../core/base-elements.ts';
import { SbbDarkModeController, SbbLanguageController } from '../core/controllers.ts';
import { forceType } from '../core/decorators.ts';
import { isLean, isZeroAnimationDuration } from '../core/dom.ts';
import { composedPathHasAttribute } from '../core/eventing.ts';
import { i18nCloseAlert } from '../core/i18n.ts';
import { SbbHydrationMixin, SbbReadonlyMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';
import { SbbIconNameMixin } from '../icon.ts';
import type { SbbLinkButtonElement, SbbLinkElement, SbbLinkStaticElement } from '../link.ts';

import style from './toast.scss?lit&inline';

import '../button/transparent-button.ts';
import '../divider.ts';

type SbbToastPositionVertical = 'top' | 'bottom';
type SbbToastPositionHorizontal = 'left' | 'start' | 'center' | 'right' | 'end';
export type SbbToastPosition = `${SbbToastPositionVertical}-${SbbToastPositionHorizontal}`;

// A global collection of existing toasts
const toastRefs = new Set<SbbToastElement>();

/**
 * It displays a toast notification.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-toast`.
 * @slot icon - Assign a custom icon via slot.
 * @slot action - Provide a custom action for this toast.
 * @cssprop [--sbb-toast-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-toast')
class SbbToastElement extends SbbIconNameMixin(
  SbbHydrationMixin(SbbReadonlyMixin(SbbOpenCloseBaseElement)),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /**
   * The length of time in milliseconds to wait before automatically dismissing the toast.
   * If 0 (default), it stays open indefinitely.
   * From accessibility perspective, it is recommended to set a timeout of at least 20 seconds.
   */
  @forceType()
  @property({ type: Number })
  public accessor timeout: number = 0;

  /** The position where to place the toast. */
  @property({ reflect: true }) public accessor position: SbbToastPosition = 'bottom-center';

  /**
   * The ARIA politeness level.
   * Check https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions for further info
   */
  @property() public accessor politeness: 'polite' | 'assertive' | 'off' = 'polite';

  private _closeTimeout?: ReturnType<typeof setTimeout>;
  private _language = new SbbLanguageController(this);
  private _darkModeController = new SbbDarkModeController(this, () => {
    this._syncSlottedElements();
    this.requestUpdate();
  });

  public constructor() {
    super();
    this.addEventListener?.('click', (e) => this._onClick(e));
  }

  public override connectedCallback(): void {
    this.popover = 'manual';
    super.connectedCallback();

    // Add this toast to the global collection
    toastRefs.add(this);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._closeTimeout);

    // Remove this instance
    toastRefs.delete(this);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('politeness')) {
      this.internals.ariaLive = this.politeness;
    }
  }

  /**
   * Open the toast.
   * If there are other opened toasts in the page, close them first.
   */
  public open(): void {
    if (this.state !== 'closed' || !this.dispatchBeforeOpenEvent()) {
      return;
    }

    this._closeOtherToasts();
    this.showPopover?.();
    this.state = 'opening';

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /**
   * Close the toast.
   */
  public close(): void {
    if (this.state !== 'opened' || !this.dispatchBeforeCloseEvent()) {
      return;
    }

    clearTimeout(this._closeTimeout);
    this.state = 'closing';

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();
    this.dispatchCloseEvent();
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this.dispatchOpenEvent();

    // Start the countdown to close it
    if (this.timeout) {
      // Workaround for https://github.com/sbb-design-systems/lyne-angular/issues/190
      // If zone.js is loaded, setTimeout is wrapped and tracked which will mark
      // anything in Angular as unstable as long as setTimeout is not finished.
      // This only needs to be fixed in places where we actually want to wait a
      // specific amount of time without an interaction (e.g. for this case).
      const global = globalThis as any;
      const setTimeout: typeof globalThis.setTimeout =
        global[global.Zone?.__symbol__?.('setTimeout') as string] ?? global.setTimeout;

      this._closeTimeout = setTimeout(() => this.close(), this.timeout);
    }
  }

  // Close the toast on click of any element that has the 'sbb-toast-close' attribute.
  private _onClick(event: Event): void {
    const closeElement = composedPathHasAttribute(event, 'sbb-toast-close', this);

    if (closeElement && !closeElement.hasAttribute('disabled')) {
      this.close();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-toast-animation-duration');
  }

  /**
   * Slotted text nodes are not read correctly by screen readers on Chrome.
   * To address the problem, if there is at least a root text node,
   * we wrap the whole content in a <span> tag
   */
  private _onContentSlotChange(event: Event): void {
    const slotNodes = (event.target as HTMLSlotElement).assignedNodes();

    if (slotNodes.some((el) => el.nodeType === Node.TEXT_NODE)) {
      const span = document.createElement('span');
      this.prepend(span);
      span.append(...slotNodes);
    }
    this._syncSlottedElements();
  }

  private _syncSlottedElements(): void {
    // Force the visual state on slotted buttons
    this.querySelectorAll<SbbTransparentButtonElement | SbbTransparentButtonLinkElement>(
      'sbb-transparent-button, sbb-transparent-button-link',
    ).forEach((btn) => {
      btn.negative = this._isLightMode();
      btn.size = isLean() ? 's' : 'm';
    });

    // Force negative on slotted links
    this.querySelectorAll<SbbLinkElement | SbbLinkButtonElement | SbbLinkStaticElement>(
      'sbb-link, sbb-link-button, sbb-link-static',
    ).forEach((link) => {
      link.negative = this._isLightMode();
    });
  }

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onToastAnimationEnd(event: AnimationEvent): void {
    // On toast opened
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  /**
   * Since we do not stack toasts, we force the closing on other existing opened ones
   */
  private _closeOtherToasts(): void {
    toastRefs.forEach((t) => {
      if (t.isOpen) {
        t.close();
      }
    });
  }

  private _isLightMode(): boolean {
    return !this._darkModeController.matches();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-toast__overlay-container">
        <div class="sbb-toast" @animationend=${this._onToastAnimationEnd}>
          <div class="sbb-toast-wrapper">
            ${this.renderIconSlot()}
            <div class="sbb-toast__content">
              <slot @slotchange=${this._onContentSlotChange}></slot>
            </div>
            <slot name="action" @slotchange=${this._syncSlottedElements}></slot>
          </div>
          <div class="sbb-toast__close">
            <sbb-divider
              class="sbb-toast__close-divider"
              orientation="vertical"
              ?negative=${this._isLightMode()}
            ></sbb-divider>
            ${!this.readOnly
              ? html`<sbb-transparent-button
                  class="sbb-toast__close-button"
                  icon-name="cross-small"
                  ?negative=${this._isLightMode()}
                  size="m"
                  aria-label=${i18nCloseAlert[this._language.current]}
                  sbb-toast-close
                ></sbb-transparent-button>`
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
    'sbb-toast': SbbToastElement;
  }
}
