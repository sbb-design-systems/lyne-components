import { TitleLevel } from '../title';
import { i18nCloseDialog, i18nDialog, i18nGoBack } from '../core/i18n';
import { FocusTrap, IS_FOCUSABLE_QUERY, setModalityOnNextFocus } from '../core/a11y';
import {
  ScrollHandler,
  toggleDatasetEntry,
  isValidAttribute,
  hostContext,
  setAttribute,
} from '../core/dom';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
  EventEmitter,
} from '../core/eventing';
import { AgnosticResizeObserver } from '../core/observers';
import { applyInertMechanism, removeInertMechanism, SbbOverlayState } from '../core/overlay';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import style from './dialog.scss?lit&inline';
import '../button';

// A global collection of existing dialogs
const dialogRefs: SbbDialog[] = [];
let nextId = 0;

/**
 * It displays an interactive overlay element.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-dialog`.
 * @slot title - Use this slot to provide a title.
 * @slot action-group - Use this slot to display a `sbb-action-group` in the footer.
 * @event {CustomEvent<void>} will-open - Emits whenever the `sbb-dialog` starts the opening transition.
 * @event {CustomEvent<void>} did-open - Emits whenever the `sbb-dialog` is opened.
 * @event {CustomEvent<void>} will-close - Emits whenever the `sbb-dialog` begins the closing transition.
 * @event {CustomEvent<void>} did-close - Emits whenever the `sbb-dialog` is closed.
 * @event {CustomEvent<void>} request-back-action - Emits whenever the back button is clicked.
 */
@customElement('sbb-dialog')
export class SbbDialog extends LitElement {
  public static override styles: CSSResult = style;
  public static readonly events = {
    willOpen: 'will-open',
    didOpen: 'did-open',
    willClose: 'will-close',
    didClose: 'did-close',
    backClick: 'request-back-action',
  } as const;

  /**
   * Dialog title.
   */
  @property({ attribute: 'title-content' }) public titleContent: string;

  /**
   * Level of title, will be rendered as heading tag (e.g. h1). Defaults to level 1.
   */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '1';

  /**
   * Whether a back button is displayed next to the title.
   */
  @property({ attribute: 'title-back-button', type: Boolean }) public titleBackButton = false;

  /**
   * Backdrop click action.
   */
  @property({ attribute: 'backdrop-action' }) public backdropAction: 'close' | 'none' = 'close';

  /**
   * Negative coloring variant flag.
   */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-label to the close button element.
   */
  @property({ attribute: 'accessibility-close-label' }) public accessibilityCloseLabel:
    | string
    | undefined;

  /**
   * This will be forwarded as aria-label to the back button element.
   */
  @property({ attribute: 'accessibility-back-label' }) public accessibilityBackLabel:
    | string
    | undefined;

  /**
   * Whether the animation is enabled.
   */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @state() private _namedSlots = createNamedSlotState('title', 'action-group');

  @state() private _currentLanguage = documentLanguage();

  /*
   * The state of the dialog.
   */
  private set _state(state: SbbOverlayState) {
    this.dataset.state = state;
  }
  private get _state(): SbbOverlayState {
    return this.dataset.state as SbbOverlayState;
  }

  private _dialogContentResizeObserver = new AgnosticResizeObserver(() =>
    this._setOverflowAttribute(),
  );

  private _ariaLiveRef: HTMLElement;
  private _ariaLiveRefToggle = false;

  /** Emits whenever the `sbb-dialog` starts the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(this, SbbDialog.events.willOpen);

  /** Emits whenever the `sbb-dialog` is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(this, SbbDialog.events.didOpen);

  /** Emits whenever the `sbb-dialog` begins the closing transition. */
  private _willClose: EventEmitter = new EventEmitter(this, SbbDialog.events.willClose);

  /** Emits whenever the `sbb-dialog` is closed. */
  private _didClose: EventEmitter = new EventEmitter(this, SbbDialog.events.didClose);

  /** Emits whenever the back button is clicked. */
  private _backClick: EventEmitter<void> = new EventEmitter(this, SbbDialog.events.backClick);

  private _dialog: HTMLDivElement;
  private _dialogWrapperElement: HTMLElement;
  private _dialogContentElement: HTMLElement;
  private _dialogCloseElement: HTMLElement;
  private _dialogController: AbortController;
  private _windowEventsController: AbortController;
  private _focusTrap = new FocusTrap();
  private _scrollHandler = new ScrollHandler();
  private _returnValue: any;
  private _isPointerDownEventOnDialog: boolean;
  private _dialogId = `sbb-dialog-${nextId++}`;

  // Last element which had focus before the dialog was opened.
  private _lastFocusedElement?: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /**
   * Opens the dialog element.
   */

  public open(): void {
    if (this._state !== 'closed' || !this._dialog) {
      return;
    }
    this._lastFocusedElement = document.activeElement as HTMLElement;
    this._willOpen.emit();
    this._state = 'opening';
    // Add this dialog to the global collection
    dialogRefs.push(this as SbbDialog);
    this._setOverflowAttribute();
    // Disable scrolling for content below the dialog
    this._scrollHandler.disableScroll();
  }

  /**
   * Closes the dialog element.
   */
  public close(result?: any, target?: HTMLElement): any {
    if (this._state !== 'opened') {
      return;
    }

    this._returnValue = result;
    this._dialogCloseElement = target;
    this._willClose.emit({ returnValue: this._returnValue, closeTarget: this._dialogCloseElement });
    this._state = 'closing';
    this._removeAriaLiveRefContent();
  }

  // Closes the dialog on "Esc" key pressed.
  private _onKeydownEvent(event: KeyboardEvent): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    if (event.key === 'Escape') {
      dialogRefs[dialogRefs.length - 1].close();
      return;
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
    this._state = this._state || 'closed';
    this._dialogController = new AbortController();

    // Close dialog on backdrop click
    this.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._dialogController.signal,
    });
    this.addEventListener('pointerup', this._closeOnBackdropClick, {
      signal: this._dialogController.signal,
    });

    if (this._state === 'opened') {
      applyInertMechanism(this);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
    this._dialogController?.abort();
    this._windowEventsController?.abort();
    this._focusTrap.disconnect();
    this._dialogContentResizeObserver.disconnect();
    this._removeInstanceFromGlobalCollection();
    removeInertMechanism();
  }

  private _removeInstanceFromGlobalCollection(): void {
    dialogRefs.splice(dialogRefs.indexOf(this as SbbDialog), 1);
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    // Remove dialog label as soon as it is not needed anymore to prevent accessing it with browse mode.
    window.addEventListener(
      'keydown',
      async (event: KeyboardEvent) => {
        this._removeAriaLiveRefContent();
        await this._onKeydownEvent(event);
      },
      {
        signal: this._windowEventsController.signal,
      },
    );
    window.addEventListener('click', () => this._removeAriaLiveRefContent(), {
      signal: this._windowEventsController.signal,
    });
  }

  // Check if the pointerdown event target is triggered on the dialog.
  private _pointerDownListener = (event: PointerEvent): void => {
    if (this.backdropAction !== 'close') {
      return;
    }

    this._isPointerDownEventOnDialog = event
      .composedPath()
      .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
      .some((target) => target.tagName === this._dialogId);
  };

  // Close dialog on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): Promise<void> => {
    if (this.backdropAction !== 'close') {
      return;
    }

    if (
      !this._isPointerDownEventOnDialog &&
      !event
        .composedPath()
        .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
        .some((target) => target.id === this._dialogId)
    ) {
      this.close();
    }
  };

  // Close the dialog on click of any element that has the 'sbb-dialog-close' attribute.
  private _closeOnSbbDialogCloseClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.hasAttribute('sbb-dialog-close') && !isValidAttribute(target, 'disabled')) {
      // Check if the target is a submission element within a form and return the form, if present
      const closestForm =
        target.getAttribute('type') === 'submit'
          ? (hostContext('form', target) as HTMLFormElement)
          : undefined;
      this.close(closestForm, target);
    }
  }

  // Wait for dialog transition to complete.
  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onDialogAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._state = 'opened';
      this._didOpen.emit();
      applyInertMechanism(this);
      this._setDialogFocus();
      // Use timeout to read label after focused element
      setTimeout(() => this._setAriaLiveRefContent());
      this._focusTrap.trap(this);
      this._dialogContentResizeObserver.observe(this._dialogContentElement);
      this._attachWindowEvents();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._state = 'closed';
      this._dialogWrapperElement.querySelector('.sbb-dialog__content').scrollTo(0, 0);
      removeInertMechanism();
      setModalityOnNextFocus(this._lastFocusedElement);
      // Manually focus last focused element
      this._lastFocusedElement?.focus();
      this._didClose.emit({
        returnValue: this._returnValue,
        closeTarget: this._dialogCloseElement,
      });
      this._windowEventsController?.abort();
      this._focusTrap.disconnect();
      this._dialogContentResizeObserver.disconnect();
      this._removeInstanceFromGlobalCollection();
      // Enable scrolling for content below the dialog if no dialog is open
      !dialogRefs.length && this._scrollHandler.enableScroll();
    }
  }

  private _setAriaLiveRefContent(): void {
    this._ariaLiveRefToggle = !this._ariaLiveRefToggle;

    // Take accessibility label or current string in title section
    const label =
      this.accessibilityLabel ||
      (this.shadowRoot.querySelector('.sbb-dialog__title') as HTMLElement)?.innerText;

    // If the text content remains the same, on VoiceOver the aria-live region is not announced a second time.
    // In order to support reading on every opening, we toggle an invisible space.
    this._ariaLiveRef.textContent = `${i18nDialog[this._currentLanguage]}${
      label ? `, ${label}` : ''
    }${this._ariaLiveRefToggle ? ' ' : ''}`;
  }

  private _removeAriaLiveRefContent(): void {
    this._ariaLiveRef.textContent = '';
  }

  // Set focus on the first focusable element.
  private _setDialogFocus(): void {
    const firstFocusable = this.shadowRoot.querySelector(IS_FOCUSABLE_QUERY) as HTMLElement;
    setModalityOnNextFocus(firstFocusable);
    firstFocusable.focus();
  }

  private _setOverflowAttribute(): void {
    toggleDatasetEntry(
      this,
      'overflows',
      this._dialogContentElement.scrollHeight > this._dialogContentElement.clientHeight,
    );
  }

  protected override render(): TemplateResult {
    const hasTitle = !!this.titleContent || this._namedSlots['title'];
    const hasActionGroup = this._namedSlots['action-group'] && hasTitle;

    const closeButton = html`
      <sbb-button
        class="sbb-dialog__close"
        aria-label=${this.accessibilityCloseLabel || i18nCloseDialog[this._currentLanguage]}
        variant=${this.negative ? 'transparent' : 'secondary'}
        ?negative=${this.negative}
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-dialog-close
      ></sbb-button>
    `;

    const backButton = html`
      <sbb-button
        class="sbb-dialog__back"
        aria-label=${this.accessibilityBackLabel || i18nGoBack[this._currentLanguage]}
        variant=${this.negative ? 'transparent' : 'secondary'}
        ?negative=${this.negative}
        size="m"
        type="button"
        icon-name="chevron-small-left-small"
        @click=${() => this._backClick.emit()}
      ></sbb-button>
    `;

    const dialogHeader = html`
      <div class="sbb-dialog__header">
        ${this.titleBackButton ? backButton : nothing}
        ${hasTitle
          ? html`<sbb-title
              class="sbb-dialog__title"
              level=${this.titleLevel}
              visual-level="3"
              ?negative=${this.negative}
              id="title"
            >
              <slot name="title">${this.titleContent}</slot>
            </sbb-title>`
          : nothing}
        ${closeButton}
      </div>
    `;

    const dialogFooter = html`
      <div class="sbb-dialog__footer">
        <slot name="action-group"></slot>
      </div>
    `;

    setAttribute(this, 'data-fullscreen', !hasTitle);

    return html`
      <div class="sbb-dialog__container">
        <div
          ${ref((dialogRef) => (this._dialog = dialogRef as HTMLDivElement))}
          @animationend=${(event: AnimationEvent) => this._onDialogAnimationEnd(event)}
          class="sbb-dialog"
          id=${this._dialogId}
        >
          <div
            @click=${(event: Event) => this._closeOnSbbDialogCloseClick(event)}
            ${ref(
              (dialogWrapperRef) => (this._dialogWrapperElement = dialogWrapperRef as HTMLElement),
            )}
            class="sbb-dialog__wrapper"
          >
            ${dialogHeader}
            <div
              class="sbb-dialog__content"
              ${ref((dialogContent) => (this._dialogContentElement = dialogContent as HTMLElement))}
            >
              <slot></slot>
            </div>
            ${hasActionGroup ? dialogFooter : nothing}
          </div>
        </div>
      </div>
      <span
        aria-live="polite"
        class="sbb-screen-reader-only"
        ${ref((el) => (this._ariaLiveRef = el as HTMLElement))}
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog': SbbDialog;
  }
}
