import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
 * @event {CustomEvent<void>} beforeopen - Emits whenever the `sbb-dialog` starts the opening transition. Can be canceled.
 * @event {CustomEvent<void>} open - Emits whenever the `sbb-dialog` is opened.
 * @event {CustomEvent<void>} beforeclose - Emits whenever the `sbb-dialog` begins the closing transition. Can be canceled.
 * @event {CustomEvent<SbbOverlayCloseEventDetails>} close - Emits whenever the `sbb-dialog` is closed.
 * @cssprop [--sbb-dialog-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
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
    callback: () => setTimeout(() => this._onContentResize()),
  });

  private _dialogContentElement?: HTMLElement;
  private _dialogElement?: HTMLElement;
  private _isPointerDownEventOnDialog: boolean = false;
  protected closeAttribute: string = 'sbb-dialog-close';

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
    this.closeEmitter.emit({
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
    setTimeout(() =>
      this.setAriaLiveRefContent(
        this.accessibilityLabel || this.querySelector('sbb-dialog-title')?.innerText.trim(),
      ),
    );
    this.focusTrapController.enabled = true;
    if (this._dialogContentElement) {
      this._dialogContentResizeObserver.observe(this._dialogContentElement);
    }
    this.openEmitter.emit();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._syncNegative();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._syncNegative();
    }
  }

  private _syncNegative(): void {
    const dialogTitle = this.querySelector?.('sbb-dialog-title');

    if (dialogTitle) {
      dialogTitle.negative = this.negative;
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

  private _onContentResize(): void {
    this.toggleState(
      'overflows',
      this._dialogContentElement
        ? this._dialogContentElement.scrollHeight > this._dialogContentElement.clientHeight
        : false,
    );
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
            <div
              class="sbb-dialog-content-container"
              ${ref((el?: Element) => (this._dialogContentElement = el as HTMLDivElement))}
            >
              <slot @slotchange=${() => this._syncNegative()}></slot>
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
