import type { CSSResultGroup, PropertyDeclaration, PropertyValues, TemplateResult } from 'lit';
import { html, isServer, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  IS_FOCUSABLE_QUERY,
  isFakeMousedownFromScreenReader,
  SbbFocusTrapController,
  sbbInputModalityDetector,
} from '../core/a11y.ts';
import { SbbOpenCloseBaseElement } from '../core/base-elements.ts';
import { readConfig } from '../core/config.ts';
import {
  SbbEscapableOverlayController,
  SbbLanguageController,
  SbbMediaQueryPointerCoarse,
} from '../core/controllers.ts';
import { forceType, idReference } from '../core/decorators.ts';
import { isZeroAnimationDuration } from '../core/dom.ts';
import { composedPathHasAttribute } from '../core/eventing.ts';
import { i18nClosePopover } from '../core/i18n.ts';
import { SbbHydrationMixin, ɵstateController } from '../core/mixins.ts';
import {
  getElementPosition,
  isEventOnElement,
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../core/overlay.ts';
import { boxSizingStyles } from '../core/styles.ts';

import style from './popover.scss?lit&inline';

import '../button/secondary-button.ts';

const VERTICAL_OFFSET = 16;
const HORIZONTAL_OFFSET = 32;

let nextId = 0;

const popoversRef = new Set<SbbPopoverBaseElement>();
const pointerCoarse = isServer ? false : matchMedia(SbbMediaQueryPointerCoarse).matches;

export abstract class SbbPopoverBaseElement extends SbbHydrationMixin(SbbOpenCloseBaseElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /**
   * The element that will trigger the popover overlay.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLElement | null = null;

  // The element which should receive focus after closing based on where in the backdrop the user clicks.
  private _nextFocusedElement?: HTMLElement;
  private _skipCloseFocus: boolean = false;
  private _popoverCloseElement?: HTMLElement;
  private _isPointerDownEventOnPopover?: boolean;
  private _triggerElement?: HTMLElement | null;
  private _triggerAbortController?: AbortController;
  private _openStateController?: AbortController;
  private _escapableOverlayController = new SbbEscapableOverlayController(this);
  private _focusTrapController = new SbbFocusTrapController(this);
  private _blurTimeout: ReturnType<typeof setTimeout> | null = null;
  protected closeTimeout?: ReturnType<typeof setTimeout>;
  protected overlay?: HTMLDivElement;

  /** Opens the popover on trigger click. */
  public open(): void {
    if (
      (this.state !== 'closed' && this.state !== 'closing') ||
      !this.overlay ||
      !this.dispatchBeforeOpenEvent()
    ) {
      return;
    }

    // Close the other popovers
    for (const popover of popoversRef) {
      if (popover.state === 'opened' || popover.state === 'opening') {
        popover.close();
      }
    }

    this.showPopover?.();
    this.state = 'opening';
    this.inert = true;
    this._setPopoverPosition();
    this._attachWindowEvents();
    this._escapableOverlayController.connect();
    this._triggerElement?.setAttribute('aria-expanded', 'true');
    this._nextFocusedElement = undefined;
    this._skipCloseFocus = false;

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Closes the popover. */
  public close(target?: HTMLElement): void {
    if (this.state !== 'opened' && this.state !== 'opening') {
      return;
    }

    this._popoverCloseElement = target;
    if (!this.dispatchBeforeCloseEvent({ closeTarget: target ?? null })) {
      return;
    }

    this.state = 'closing';
    this.inert = true;
    this._triggerElement?.setAttribute('aria-expanded', 'false');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-popover-animation-duration');
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();

    this.overlay?.firstElementChild?.scrollTo(0, 0);
    this.removeAttribute('tabindex');

    if (!this._skipCloseFocus) {
      const elementToFocus = this._nextFocusedElement || this._triggerElement;

      // To enable focusing other element than the trigger, we need to call focus() a second time.
      elementToFocus?.focus();
    }

    this._escapableOverlayController.disconnect();
    this._openStateController?.abort();
    this._focusTrapController.enabled = false;
    this.dispatchCloseEvent({ closeTarget: this._popoverCloseElement ?? null });
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this.inert = false;
    this._setPopoverFocus();
    this._focusTrapController.enabled = true;
    this.dispatchOpenEvent();
  }

  public override connectedCallback(): void {
    this.popover = 'manual';
    super.connectedCallback();
    this.id ||= `sbb-popover-${++nextId}`;
    this.state = 'closed';
    popoversRef.add(this);
    if (this.hasUpdated) {
      this._configureTrigger();
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);

    // Checking for hoverTrigger is a special case, as only the SbbPopoverElement
    // subclass has this property.
    if (!isServer && (!name || name === 'trigger' || name === 'hoverTrigger') && this.hasUpdated) {
      this._configureTrigger();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._configureTrigger();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._triggerElement = null;
    this._triggerAbortController?.abort();
    this._openStateController?.abort();
    popoversRef.delete(this);
    if (this._blurTimeout) {
      clearTimeout(this._blurTimeout);
    }
  }

  // Check if the trigger is valid and attach click event listeners.
  private _configureTrigger(): void {
    if (isServer) {
      return;
    } else if (this.hydrationRequired) {
      this.hydrationComplete.then(() => this._configureTrigger());
      return;
    }

    this.configureTrigger(this._triggerElement ?? null);
  }

  protected configureTrigger(_oldTrigger: HTMLElement | null): void {
    this._triggerAbortController?.abort();
    removeAriaOverlayTriggerAttributes(this._triggerElement);
    this._triggerElement = this.trigger;

    if (!this._triggerElement) {
      return;
    }

    setAriaOverlayTriggerAttributes(this._triggerElement, 'dialog', this.id, this.state);

    this._triggerAbortController = new AbortController();
    this.registerTriggerListeners(this._triggerAbortController.signal);
  }

  protected registerTriggerListeners(signal: AbortSignal): void {
    this._triggerElement!.addEventListener('click', () => this.open(), { signal });
  }

  private _attachWindowEvents(): void {
    this._openStateController = new AbortController();
    document.addEventListener('scroll', () => this._setPopoverPosition(), {
      passive: true,
      signal: this._openStateController.signal,
      // Without capture, other scroll contexts would not bubble to this event listener.
      // Capture allows us to react to all scroll contexts in this DOM.
      capture: true,
    });
    window.addEventListener('resize', () => this._setPopoverPosition(), {
      passive: true,
      signal: this._openStateController.signal,
    });
    // Close popover on backdrop click
    window.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._openStateController.signal,
    });
    window.addEventListener('pointerup', this._closeOnBackdropClick, {
      signal: this._openStateController.signal,
    });
  }

  // Close the popover on click of any element that has the 'sbb-popover-close' attribute.
  private _closeOnSbbPopoverCloseClick(event: Event): void {
    const closeElement = composedPathHasAttribute(event, 'sbb-popover-close', this);

    if (closeElement && !closeElement.hasAttribute('disabled')) {
      clearTimeout(this.closeTimeout);
      this.close(closeElement);
    }
  }

  // Check if the pointerdown event target is triggered on the popover.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnPopover = isEventOnElement(this.overlay!, event);
  };

  // Close popover on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnPopover && !isEventOnElement(this.overlay!, event)) {
      this._nextFocusedElement = event
        .composedPath()
        .filter((el) => el instanceof window.HTMLElement)
        .find((el) => (el as HTMLElement).matches(IS_FOCUSABLE_QUERY)) as HTMLElement;
      clearTimeout(this.closeTimeout);
      this.close();
    }
  };

  // Set popover position (x, y) to '0' once the popover is closed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the popover is open.
  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onPopoverAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  // Set focus on the first focusable element.
  private _setPopoverFocus(): void {
    const focused = this._focusTrapController.focusInitialElement();

    if (!focused && this._openStateController) {
      this.setAttribute('tabindex', '0');
      this.focus();

      // When a blur occurs, we know that the popover has to be closed,
      // because there are no interactive elements inside the popover.
      // When a window/tab change occurs, a blur event is also fired. However, when the current window/tab
      // becomes active again, it focuses once again the popover.
      // Therefore, we cannot listen to the blur event only once.
      // To prevent accidentally closing the popover, we need to check for the window/tab state.
      // We can achieve this by using visibilityState, which only works with setTimeout().
      this.addEventListener(
        'blur',
        (e: FocusEvent): void => {
          this._blurTimeout = setTimeout(() => {
            if (document.visibilityState !== 'hidden') {
              this.removeAttribute('tabindex');

              // In Safari on iOS it can occur, that a blur event triggers on the popover
              // although the focus remains inside the popover.
              // Therefore, we need to stop the closing if the relatedTarget is contained in the popover.
              if (this.contains(e.relatedTarget as Node)) {
                return;
              }

              if (this.state === 'opened' || this.state === 'opening') {
                this._skipCloseFocus = true;
              }
              this.close();
            }
          });
        },
        {
          signal: this._openStateController.signal,
        },
      );
    }
  }

  private _setPopoverPosition(): void {
    if (!this.overlay || !this._triggerElement) {
      return;
    }

    const popoverPosition = getElementPosition(
      this.overlay,
      this._triggerElement,
      this.shadowRoot!.querySelector('.sbb-popover__container')!,
      {
        verticalOffset: VERTICAL_OFFSET,
        horizontalOffset: HORIZONTAL_OFFSET,
        centered: true,
        responsiveHeight: true,
      },
    );
    const verticalPosition = popoverPosition.alignment.vertical;
    for (const position of ['above', 'below']) {
      this.toggleState(`position-${position}`, position === verticalPosition);
    }

    const arrowXPosition =
      this._triggerElement.getBoundingClientRect().left -
      popoverPosition.left +
      this._triggerElement.clientWidth / 2 -
      8; // half the size of the popover arrow

    this.style.setProperty('--sbb-popover-position-x', `${popoverPosition.left}px`);
    this.style.setProperty('--sbb-popover-position-y', `${popoverPosition.top}px`);
    this.style.setProperty('--sbb-popover-arrow-position-x', `${arrowXPosition}px`);
    this.style.setProperty('--sbb-popover-max-height', popoverPosition.maxHeight);
  }

  protected abstract renderContent(): TemplateResult;

  protected override dispatchBeforeCloseEvent(detail?: {
    closeTarget: HTMLElement | null;
  }): boolean {
    /**
     * @type {CustomEvent<{ closeTarget: HTMLElement | null }>}
     * Emits whenever the component begins the closing transition. Can be canceled.
     */
    return this.dispatchEvent(
      new CustomEvent<{ closeTarget: HTMLElement | null }>('beforeclose', {
        detail,
        cancelable: true,
      }),
    );
  }

  protected override dispatchCloseEvent(detail?: { closeTarget: HTMLElement | null }): boolean {
    /**
     * @type {CustomEvent<{ closeTarget: HTMLElement | null }>}
     * Emits whenever the component is closed.
     */
    return this.dispatchEvent(
      new CustomEvent<{ closeTarget: HTMLElement | null }>('close', { detail }),
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-popover__container">
        <div
          @animationend=${this._onPopoverAnimationEnd}
          class="sbb-popover"
          role="tooltip"
          ${ref((el?: Element) => (this.overlay = el as HTMLDivElement))}
        >
          <div
            @click=${(event: Event) => this._closeOnSbbPopoverCloseClick(event)}
            class="sbb-popover__content"
          >
            ${this.renderContent()}
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * It displays contextual information within a popover.
 *
 * @slot - Use the unnamed slot to add content into the popover.
 * @cssprop [--sbb-popover-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-popover')
class SbbPopoverElement extends SbbPopoverBaseElement {
  /** Whether the close button should be hidden. */
  @forceType()
  @property({ attribute: 'hide-close-button', type: Boolean, reflect: true })
  public accessor hideCloseButton: boolean = false;

  /** Whether the popover should be triggered on hover. */
  @forceType()
  @property({ attribute: 'hover-trigger', type: Boolean })
  public accessor hoverTrigger: boolean = false;

  /**
   * Open the popover after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   *
   * @default 0
   */
  @property({ attribute: 'open-delay', type: Number })
  public set openDelay(value: number) {
    this._openDelay = +value;
  }
  public get openDelay(): number {
    return this._openDelay ?? readConfig().popover?.openDelay ?? 0;
  }
  private _openDelay?: number;

  /**
   * Close the popover after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   *
   * @default 0
   */
  @property({ attribute: 'close-delay', type: Number })
  public set closeDelay(value: number) {
    this._closeDelay = +value;
  }
  public get closeDelay(): number {
    return this._closeDelay ?? readConfig().popover?.closeDelay ?? 0;
  }
  private _closeDelay?: number;

  /** This will be forwarded as aria-label to the close button element. */
  @forceType()
  @property({ attribute: 'accessibility-close-label' })
  public accessor accessibilityCloseLabel: string = '';

  private _hoverTrigger = false;
  private _openTimeout?: ReturnType<typeof setTimeout>;
  private _language = new SbbLanguageController(this);
  private _overlayAbortController: AbortController | null = null;

  protected override configureTrigger(oldTrigger: HTMLElement | null): void {
    // Check whether the trigger can be hovered. Some devices might interpret the media query (hover: hover) differently,
    // and not respect the fallback mechanism on the click. Therefore, the following is preferred to identify
    // all non-touchscreen devices.
    const hoverTrigger = this.hoverTrigger && !pointerCoarse;

    if (this.trigger === oldTrigger && hoverTrigger === this._hoverTrigger) {
      return;
    }

    if (this._hoverTrigger !== hoverTrigger) {
      this._hoverTrigger = hoverTrigger;
      this.toggleState('hover-trigger', this._hoverTrigger);
      this._registerOverlayListeners();
    }

    super.configureTrigger(oldTrigger);
  }

  private _registerOverlayListeners(): void {
    this._overlayAbortController?.abort();

    if (this._hoverTrigger) {
      this._overlayAbortController = new AbortController();
      this.overlay?.addEventListener('mouseenter', () => this._onOverlayMouseEnter(), {
        signal: this._overlayAbortController.signal,
      });
      this.overlay?.addEventListener('mouseleave', () => this._onOverlayMouseLeave(), {
        signal: this._overlayAbortController.signal,
      });
    }
  }

  protected override registerTriggerListeners(signal: AbortSignal): void {
    if (this._hoverTrigger && this.trigger) {
      this.trigger.addEventListener('mouseenter', this._onTriggerMouseEnter, { signal });
      this.trigger.addEventListener('mouseleave', this._onTriggerMouseLeave, { signal });
      this.trigger.addEventListener(
        'keydown',
        (evt: KeyboardEvent) => {
          if (evt.code === 'Space' || evt.code === 'Enter') {
            this.open();
          }
        },
        { signal },
      );
      this.trigger.addEventListener(
        'mousedown',
        (evt: MouseEvent) => {
          // Without this check, NVDA can't open the popover on keyboard interaction.
          if (isFakeMousedownFromScreenReader(evt)) {
            this.open();
          }
        },
        { signal },
      );
    } else {
      super.registerTriggerListeners(signal);
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._registerOverlayListeners();
  }

  public override open(): void {
    super.open();

    if (this.hoverTrigger && this.trigger) {
      ɵstateController(this.trigger).add('force-hover');
    }
  }

  public override close(): void {
    super.close();

    ɵstateController(this.trigger)?.delete('force-hover');
  }

  private _onTriggerMouseEnter = (): void => {
    if (this.state === 'closed' || this.state === 'closing') {
      this._openTimeout = setTimeout(() => {
        // If the trigger is focused by keyboard and hovered with the mouse, the outline would be visible.
        // So we reset the input modality to hide the outline.
        sbbInputModalityDetector.reset();
        this.open();
      }, this.openDelay);
    } else {
      clearTimeout(this.closeTimeout);
    }
  };

  private _onTriggerMouseLeave = (): void => {
    if (this.state === 'opened' || this.state === 'opening') {
      this.closeTimeout = setTimeout(() => this.close(), this.closeDelay);
    } else {
      clearTimeout(this._openTimeout);
    }
  };

  private _onOverlayMouseEnter = (): void => {
    if (this.state !== 'opening') {
      clearTimeout(this.closeTimeout);
    }
  };

  private _onOverlayMouseLeave = (): void => {
    if (this.state !== 'opening') {
      this.closeTimeout = setTimeout(() => this.close(), this.closeDelay);
    }
  };

  protected override renderContent(): TemplateResult {
    const closeButton = html`
      <sbb-secondary-button
        aria-label=${this.accessibilityCloseLabel || i18nClosePopover[this._language.current]}
        size="s"
        type="button"
        icon-name="cross-small"
        sbb-popover-close
      ></sbb-secondary-button>
    `;

    return html`
      ${!this.hideCloseButton && !this._hoverTrigger ? closeButton : nothing}
      <span class="sbb-popover__scrollable-content">
        <slot>No content</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-popover': SbbPopoverElement;
  }
}
