import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  isServer,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  getElementPosition,
  idReference,
  IS_FOCUSABLE_QUERY,
  isEventOnElement,
  isZeroAnimationDuration,
  popoverResetStyles,
  removeAriaOverlayTriggerProperties,
  SbbEscapableOverlayController,
  SbbFocusTrapController,
  SbbOpenCloseBaseElement,
  setAriaOverlayTriggerProperties,
} from '../../core.ts';

import style from './popover-base.scss?inline';

const VERTICAL_OFFSET = 16;
const HORIZONTAL_OFFSET = 32;

const popoversRef = new Set<SbbPopoverBaseElement>();

export class SbbPopoverCloseEvent extends Event {
  private readonly _closeTarget: HTMLElement | null;

  public get closeTarget(): HTMLElement | null {
    return this._closeTarget;
  }

  public constructor(
    type: string,
    { closeTarget, cancelable }: Pick<Event, 'cancelable'> & { closeTarget: HTMLElement | null },
  ) {
    super(type, { cancelable });
    this._closeTarget = closeTarget;
  }
}

export abstract class SbbPopoverBaseElement extends SbbOpenCloseBaseElement {
  public static override styles: CSSResultGroup = [popoverResetStyles, unsafeCSS(style)];

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
  private _resizeController = new ResizeController(this, {
    target: null,
    callback: () => this._setPopoverPosition(),
  });
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
    this._nextFocusedElement = undefined;
    this._skipCloseFocus = false;
    if (this._triggerElement) {
      this._triggerElement.ariaExpanded = 'true';
    }

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
    if (this._triggerElement) {
      this._triggerElement.ariaExpanded = 'false';
    }

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
    if (this.overlay) {
      this._resizeController.unobserve(this.overlay);
      this.overlay.firstElementChild?.scrollTo(0, 0);
    }

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
    if (this.overlay) {
      this._resizeController.observe(this.overlay);
    }
    this.dispatchOpenEvent();
  }

  public override connectedCallback(): void {
    this.popover = 'manual';
    super.connectedCallback();
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

    removeAriaOverlayTriggerProperties(this._triggerElement);
    this._triggerElement = this.trigger;

    if (!this._triggerElement) {
      return;
    }

    setAriaOverlayTriggerProperties(this, this._triggerElement, 'dialog', this.state);

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
    const closeElement = event
      .composedPath()
      .find(
        (el, i, a): el is HTMLElement =>
          el instanceof HTMLElement &&
          i < a.indexOf(this) &&
          (el.hasAttribute('sbb-popover-close') || el.localName === 'sbb-popover-close-button') &&
          !el.hasAttribute('disabled'),
      );
    if (closeElement) {
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
    const composedPath = event.composedPath();
    if (
      !this._isPointerDownEventOnPopover &&
      !isEventOnElement(this.overlay!, event) &&
      (!this.trigger || !composedPath.includes(this.trigger))
    ) {
      this._nextFocusedElement = composedPath
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

      // As the popover is in a fixed container, the browser would scroll to the page top if not preventing scroll.
      this.focus({ preventScroll: true });

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
              // Therefore, we need to stop the closing if the relatedTarget is contained in the popover or it is the trigger.
              if (this.contains(e.relatedTarget as Node) || e.relatedTarget === this.trigger) {
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

    this.style.setProperty('--_sbb-popover-position-x', `${popoverPosition.left}px`);
    this.style.setProperty('--_sbb-popover-position-y', `${popoverPosition.top}px`);
    this.style.setProperty('--_sbb-popover-arrow-position-x', `${arrowXPosition}px`);
    this.style.setProperty('--_sbb-popover-max-height', popoverPosition.maxHeight);
  }

  protected abstract renderContent(): TemplateResult;

  protected override dispatchBeforeCloseEvent(detail?: {
    closeTarget: HTMLElement | null;
  }): boolean {
    const closeTarget = detail?.closeTarget ?? null;
    /**
     * @type {SbbPopoverCloseEvent}
     * Emits whenever the component begins the closing transition. Can be canceled.
     */
    return this.dispatchEvent(
      new SbbPopoverCloseEvent('beforeclose', { closeTarget, cancelable: true }),
    );
  }

  protected override dispatchCloseEvent(detail?: { closeTarget: HTMLElement | null }): boolean {
    const closeTarget = detail?.closeTarget ?? null;
    /**
     * @type {SbbPopoverCloseEvent}
     * Emits whenever the component is closed.
     */
    return this.dispatchEvent(
      new SbbPopoverCloseEvent('close', { closeTarget, cancelable: false }),
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
