import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';
import { InterfaceDialogAttributes } from './sbb-dialog.custom';
import { isEventOnElement } from '../../global/helpers/position';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { IS_FOCUSABLE_QUERY, trapFocus } from '../../global/helpers/focus';

/**
 * @slot unnamed - Use this slot to provide the dialog content.
 * @slot title - Use this slot to provide a title.
 * @slot action-group - Use this slot to display an action group in the footer.
 */

let nextId = 0;

@Component({
  shadow: true,
  styleUrl: 'sbb-dialog.scss',
  tag: 'sbb-dialog',
})
export class SbbDialog implements AccessibilityProperties {
  /**
   * This id will be forwarded to the relevant inner element.
   */
  @Prop() public titleId = `sbb-dialog-title-${++nextId}`;

  /**
   * Dialog title
   */
  @Prop() public titleContent: string;

  /**
   * This level will correspond to the heading tag generated in the title.
   * Use this property to generate the appropriate header tag, taking SEO into consideration.
   */
  @Prop() public titleLevel: InterfaceDialogAttributes['level'] = '1';

  /**
   * Whether a back button is displayed next to the title.
   */
  @Prop() public titleBackButton = false;

  /**
   * Negative coloring variant flag.
   */
  @Prop({ reflect: true }) public negative = false;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * Whether the dialog is presented.
   */
  @State() private _presented = false;

  /**
   * Whether the dialog is presenting.
   */
  @State() private _isPresenting = false;

  /**
   * Whether the dialog is closing.
   */
  @State() private _isDismissing = false;

  /**
   * Whether the dialog content has a visible scrollbar.
   */
  @State() private _overflows = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('title', 'action-group');

  /**
   * Emits whenever the dialog starts the presenting transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-dialog_will-present',
  })
  public willPresent: EventEmitter<void>;

  /**
   * Emits whenever the dialog is presented.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-dialog_did-present',
  })
  public didPresent: EventEmitter<void>;

  /**
   * Emits whenever the dialog begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-dialog_will-dismiss',
  })
  public willDismiss: EventEmitter<any>;

  /**
   * Emits whenever the dialog is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-dialog_did-dismiss',
  })
  public didDismiss: EventEmitter<any>;

  /**
   * Emits whenever the back button is clicked.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-dialog_request-back-action',
  })
  public backClick: EventEmitter<void>;

  private _dialog: HTMLDialogElement;
  private _dialogWrapperElement: HTMLElement;
  private _dialogContentElement: HTMLElement;
  private _firstFocusable: HTMLElement;
  private _lastFocusable: HTMLElement;
  private _dialogController: AbortController;
  private _windowEventsController: AbortController;
  private _returnValue: any;
  private _isPointerDownEventOnDialog: boolean;
  private _hasTitle = false;
  private _hasActionGroup = false;
  private _openedByKeyboard = false;

  @Element() private _element!: HTMLSbbDialogElement;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleNamedSlotChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  /**
   * Opens the dialog element.
   */
  @Method()
  public async present(event?: PointerEvent): Promise<void> {
    if (this._isDismissing || !this._dialog) {
      return;
    }

    this._openedByKeyboard = event?.detail === 0;
    this.willPresent.emit();
    this._isPresenting = true;
    this._dialog.show();
    this._overflows = this._hasScrollbar();
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the dialog element.
   */
  @Method()
  public async dismiss(result?: any): Promise<any> {
    if (this._isPresenting) {
      return;
    }

    this._returnValue = result;
    this.willDismiss.emit(this._returnValue);
    this._isDismissing = true;
    this._presented = false;
    this._openedByKeyboard = false;
  }

  // Dismisses the dialog on "Esc" key pressed and traps focus within the dialog.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (!this._presented) {
      return;
    }

    if (event.key === 'Escape') {
      this.dismiss();
      return;
    }

    trapFocus(event, this._element, this._firstFocusable, this._lastFocusable);
  }

  public connectedCallback(): void {
    this._dialogController = new AbortController();
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);

    this._hasTitle = !!this.titleContent || this._namedSlots['title'];
    this._hasActionGroup = this._namedSlots['action-group'] && this._hasTitle;

    // Dismiss dialog on backdrop click
    this._element.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._dialogController.signal,
    });
    this._element.addEventListener('pointerup', this._dismissOnBackdropClick, {
      signal: this._dialogController.signal,
    });
  }

  public disconnectedCallback(): void {
    this._dialogController?.abort();
    this._windowEventsController?.abort();
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });
    window.addEventListener('resize', () => (this._overflows = this._hasScrollbar()), {
      passive: true,
      signal: this._windowEventsController.signal,
    });
  }

  // Check if the pointerdown event target is triggered on the dialog.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnDialog = isEventOnElement(this._dialog, event);
  };

  // Close dialog on backdrop click.
  private _dismissOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnDialog && !isEventOnElement(this._dialog, event)) {
      this.dismiss();
    }
  };

  // Wait for dialog transition to complete.
  private _onDialogAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'show') {
      this._isPresenting = false;
      this._presented = true;
      this.didPresent.emit();
      this._setDialogFocus();
      this._attachWindowEvents();
    } else if (event.animationName === 'hide') {
      this._isDismissing = false;
      this._presented = false;
      this._dialogWrapperElement.querySelector('.sbb-dialog__content').scrollTo(0, 0);
      this._dialog.close();
      this.didDismiss.emit(this._returnValue);
      this._windowEventsController?.abort();
      document.body.style.overflow = 'auto';
    }
  }

  // Set focus on the first focusable element.
  private _setDialogFocus(): void {
    const focusableElements = Array.from(
      this._element.shadowRoot.querySelectorAll(IS_FOCUSABLE_QUERY)
    );
    this._firstFocusable = focusableElements[0] as HTMLElement;
    this._lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const slottedFocusableElements = Array.from(
      this._element.querySelectorAll(
        `${IS_FOCUSABLE_QUERY}${
          !this._hasActionGroup ? ':not(sbb-action-group, sbb-action-group *)' : ''
        }`
      )
    );
    this._lastFocusable =
      (slottedFocusableElements[slottedFocusableElements.length - 1] as HTMLElement) ||
      this._lastFocusable;

    if (this._openedByKeyboard) {
      this._firstFocusable.focus();
    } else {
      // Focusing sbb-dialog__wrapper in order to provide a consistent behavior in Safari where else
      // the focus-visible styles would be incorrectly applied
      this._dialogWrapperElement.tabIndex = 0;
      this._dialogWrapperElement.focus();

      this._element.addEventListener(
        'blur',
        () => this._dialogWrapperElement.removeAttribute('tabindex'),
        {
          once: true,
        }
      );
    }
  }

  private _hasScrollbar(): boolean {
    return this._dialogContentElement.scrollHeight > this._dialogContentElement.clientHeight;
  }

  public render(): JSX.Element {
    let dialogHeader = null,
      dialogFooter = null;

    const closeButton = (
      <sbb-button
        class="sbb-dialog__dismiss"
        accessibility-label="Close"
        variant={this.negative ? 'transparent' : 'secondary'}
        negative={this.negative}
        size="m"
        type="button"
        iconName="cross-small"
        onClick={() => this.dismiss()}
      ></sbb-button>
    );

    const backButton = (
      <sbb-button
        class="sbb-dialog__back"
        accessibility-label="Back"
        variant={this.negative ? 'transparent' : 'secondary'}
        negative={this.negative}
        size="m"
        type="button"
        iconName="chevron-small-left-small"
        onClick={() => this.backClick.emit()}
      ></sbb-button>
    );

    dialogHeader = (
      <div class="sbb-dialog__header">
        {this.titleBackButton && backButton}
        {this._hasTitle && (
          <sbb-title
            class="sbb-dialog__title"
            level={this.titleLevel}
            visual-level="3"
            negative={this.negative}
            title-id={this.titleId}
          >
            <slot name="title">{this.titleContent}</slot>
          </sbb-title>
        )}
        {closeButton}
      </div>
    );

    if (this._hasActionGroup) {
      dialogFooter = (
        <div class="sbb-dialog__footer">
          <slot name="action-group" />
        </div>
      );
    }

    return (
      <Host
        class={{
          'sbb-dialog--presented': this._presented,
          'sbb-dialog--presenting': this._isPresenting,
          'sbb-dialog--full-screen': !this._hasTitle,
        }}
      >
        <dialog
          ref={(dialogRef) => (this._dialog = dialogRef)}
          aria-label={this.accessibilityLabel}
          aria-describedby={this.accessibilityDescribedby}
          aria-labelledby={this.accessibilityLabelledby || this.titleId}
          onAnimationEnd={(event: AnimationEvent) => this._onDialogAnimationEnd(event)}
          class={{
            'sbb-dialog': true,
            'sbb-dialog--dismissing': this._isDismissing,
          }}
        >
          <div
            class={{
              'sbb-dialog__wrapper': true,
              'sbb-dialog__has-scrollbar': this._overflows,
            }}
            ref={(dialogWrapperRef) => (this._dialogWrapperElement = dialogWrapperRef)}
          >
            {dialogHeader}
            <div
              class="sbb-dialog__content"
              ref={(dialogContent) => (this._dialogContentElement = dialogContent)}
            >
              <slot />
            </div>
            {dialogFooter}
          </div>
        </dialog>
      </Host>
    );
  }
}
