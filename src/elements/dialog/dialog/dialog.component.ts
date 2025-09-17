import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html } from 'lit/static-html.js';

import { isZeroAnimationDuration } from '../../core/dom.js';
import { overlayRefs, SbbOverlayBaseElement } from '../../overlay.js';

import style from './dialog.scss?lit&inline';

import '../../screen-reader-only.js';

let nextId = 0;

/**
 * It displays an interactive overlay element.
 *
 * @slot actions - This slot is used for the actions, the slot is automatically assigned to the `sbb-dialog-actions` element.
 * @slot - Use the unnamed slot to provide a `sbb-dialog-title`, `sbb-dialog-content` and an optional `sbb-dialog-actions`.
 * @cssprop [--sbb-dialog-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 * @csspart scroll-container - Can be used to change styles of the scroll container of the content.
 */
export
@customElement('sbb-dialog')
class SbbDialogElement extends SbbOverlayBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Backdrop click action. */
  @property({ attribute: 'backdrop-action' }) public accessor backdropAction: 'close' | 'none' =
    'close';

  /** Backdrop density. */
  @property({ attribute: 'backdrop', reflect: true }) public accessor backdrop:
    | 'opaque'
    | 'translucent' = 'opaque';

  // We use a timeout as a workaround to the "ResizeObserver loop completed with undelivered notifications" error.
  // For more details:
  // - https://github.com/WICG/resize-observer/issues/38#issuecomment-422126006
  // - https://github.com/juggle/resize-observer/issues/103#issuecomment-1711148285
  private _dialogContentResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => setTimeout(() => this._updateOverflowState()),
  });

  private _dialogContentElement?: HTMLElement;
  private _dialogElement?: HTMLElement;
  private _isPointerDownEventOnDialog: boolean = false;
  protected closeAttribute: string = 'sbb-dialog-close';
  protected override closeTag: string = 'sbb-dialog-close-button';

  public constructor() {
    super();
    // Close dialog on backdrop click
    this.addEventListener?.('pointerdown', this._pointerDownListener);
    this.addEventListener?.('pointerup', this._closeOnBackdropClick);
  }

  public override connectedCallback(): void {
    this.id ||= `sbb-dialog-${nextId++}`;
    super.connectedCallback();
  }

  /** Announce the accessibility label or dialog title for screen readers. */
  public announceTitle(): void {
    this.setAriaLiveRefContent(
      this.accessibilityLabel || this.querySelector('sbb-dialog-title')?.innerText.trim(),
    );
  }

  protected isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-dialog-animation-duration');
  }

  protected handleClosing(): void {
    this._dialogContentElement?.scrollTo(0, 0);
    this.state = 'closed';
    this.hidePopover?.();

    this.inertController.deactivate();
    if (!this.skipFocusRestoration) {
      // Manually focus last focused element
      this.lastFocusedElement?.focus();
    }
    this.openOverlayController?.abort();
    this.focusTrapController.enabled = false;
    if (this._dialogContentElement) {
      this._dialogContentResizeObserver.unobserve(this._dialogContentElement);
    }
    this.removeInstanceFromGlobalCollection();
    // Enable scrolling for content below the dialog if no dialog is open
    if (!overlayRefs.length) {
      this.scrollHandler.enableScroll();
    }
    this.escapableOverlayController.disconnect();
    this.dispatchCloseEvent({
      returnValue: this.returnValue,
      closeTarget: this.overlayCloseElement,
    });
  }

  protected handleOpening(): void {
    this.state = 'opened';
    this.inertController.activate();
    this.escapableOverlayController.connect();
    this.attachOpenOverlayEvents();
    this.focusTrapController.focusInitialElement();
    // Use timeout to read label after focused element
    setTimeout(() => this.announceTitle());
    this.focusTrapController.enabled = true;
    if (this._dialogContentElement) {
      this._dialogContentResizeObserver.observe(this._dialogContentElement);
    }
    this.dispatchOpenEvent();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._syncTitleNegative();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._syncTitleNegative();
    }
  }

  private _syncTitleNegative(): void {
    const dialogTitle = this.querySelector?.('sbb-dialog-title');
    const closeButton = this.querySelector?.('sbb-dialog-close-button');

    if (dialogTitle) {
      dialogTitle.negative = this.negative;
    }

    if (closeButton) {
      closeButton.negative = this.negative;
    }
  }

  /** Check if the pointerdown event target is triggered on the dialog. */
  private _pointerDownListener = (event: PointerEvent): void => {
    if (this.backdropAction !== 'close') {
      return;
    }

    this._isPointerDownEventOnDialog =
      !!this._dialogElement && event.composedPath().includes(this._dialogElement);
  };

  /** Close dialog on backdrop click. */
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (
      this.backdropAction === 'close' &&
      !this._isPointerDownEventOnDialog &&
      this._dialogElement &&
      !event.composedPath().includes(this._dialogElement)
    ) {
      this.close();
    }
  };

  private _updateOverflowState(): void {
    this.toggleState(
      'overflows',
      (this._dialogContentElement?.scrollTop ?? 0) +
        (this._dialogContentElement?.offsetHeight ?? 0) <
        (this._dialogContentElement?.scrollHeight ?? 0),
    );
  }

  @eventOptions({ passive: true })
  private _detectScrolledState(): void {
    this.toggleState('scrolled', (this._dialogContentElement?.scrollTop ?? 0) > 0);
    this._updateOverflowState();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-dialog__container">
        <div
          @animationend=${this.onOverlayAnimationEnd}
          class="sbb-dialog"
          ${ref((el?: Element) => (this._dialogElement = el as HTMLDivElement))}
        >
          <div
            @click=${(event: Event) => this.closeOnSbbOverlayCloseClick(event)}
            class="sbb-dialog__wrapper"
          >
            <div class="sbb-dialog-title-section">
              <slot name="title-section" @slotchange=${() => this._syncTitleNegative()}></slot>
            </div>
            <div
              class="sbb-dialog-content-container"
              part="scroll-container"
              @scroll=${() => this._detectScrolledState()}
              ${ref((el?: Element) => (this._dialogContentElement = el as HTMLDivElement))}
            >
              <slot></slot>
            </div>
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
      <sbb-screen-reader-only aria-live="polite"></sbb-screen-reader-only>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog': SbbDialogElement;
  }
}
