import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { Alignment, getElementPosition, isEventOnElement } from '../../global/helpers/position';
import { IS_FOCUSABLE_QUERY, FocusTrap } from '../../global/helpers/focus';
import { i18nCloseTooltip } from '../../global/i18n';
import getDocumentLang from '../../global/helpers/get-document-lang';

const VERTICAL_OFFSET = 16;
const HORIZONTAL_OFFSET = 32;

/**
 * @slot unnamed - Use this slot to project any content inside the tooltip.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tooltip.scss',
  tag: 'sbb-tooltip',
})
export class SbbTooltip implements ComponentInterface {
  /**
   * The element that will trigger the tooltip dialog.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * Whether the tooltip should be triggered on hover.
   */
  @Prop() public hoverTrigger?: boolean = false;

  /**
   * Open the tooltip after a certain delay.
   */
  @Prop() public showDelay? = 0;

  /**
   * Close the tooltip after a certain delay.
   */
  @Prop() public hideDelay? = 0;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * This will be forwarded as aria-label to the close button element.
   */
  @Prop() public accessibilityCloseLabel: string | undefined;

  /**
   * Whether the tooltip is presented.
   */
  @State() private _presented = false;

  /**
   * Whether the tooltip is presenting.
   */
  @State() private _isPresenting = false;

  /**
   * Whether the tooltip is closing.
   */
  @State() private _isDismissing = false;

  /**
   * The alignment of the tooltip relative to the trigger.
   */
  @State() private _alignment: Alignment;

  /**
   * Emits whenever the tooltip starts the presenting transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-tooltip_will-present',
  })
  public willPresent: EventEmitter<void>;

  /**
   * Emits whenever the tooltip is presented.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-tooltip_did-present',
  })
  public didPresent: EventEmitter<void>;

  /**
   * Emits whenever the tooltip begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-tooltip_will-dismiss',
  })
  public willDismiss: EventEmitter<{ closeTarget: HTMLElement }>;

  /**
   * Emits whenever the tooltip is dismissed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-tooltip_did-dismiss',
  })
  public didDismiss: EventEmitter<{ closeTarget: HTMLElement }>;

  private _dialog: HTMLDialogElement;
  private _triggerElement: HTMLElement;
  private _tooltipContentElement: HTMLElement;
  private _prevFocusedElement: HTMLElement;
  private _firstFocusable: HTMLElement;
  private _tooltipCloseElement: HTMLElement;
  private _isPointerDownEventOnTooltip: boolean;
  private _tooltipController: AbortController;
  private _windowEventsController: AbortController;
  private _focusTrap = new FocusTrap();
  private _openedByKeyboard = false;
  private _hoverTrigger = false;
  private _presentTimeout: ReturnType<typeof setTimeout>;
  private _dismissTimeout: ReturnType<typeof setTimeout>;
  private _currentLangauge = getDocumentLang();

  @Element() private _element!: HTMLElement;

  /**
   * Opens the tooltip on trigger click.
   */
  @Method()
  public async present(): Promise<void> {
    if (this._isDismissing || !this._dialog) {
      return;
    }

    this.willPresent.emit();
    this._isPresenting = true;
    this._setTooltipPosition();
    this._dialog.show();
  }

  /**
   * Dismisses the tooltip.
   */
  @Method()
  public async dismiss(target?: HTMLElement): Promise<void> {
    if (!this._presented || this._isPresenting || this._isDismissing) {
      return;
    }

    this._tooltipCloseElement = target;
    this.willDismiss.emit({ closeTarget: this._tooltipCloseElement });
    this._isDismissing = true;
    this._presented = false;
    this._openedByKeyboard = false;
    this._prevFocusedElement.focus();
  }

  // Dismisses the tooltip on "Esc" key pressed and traps focus within the tooltip.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (!this._presented) {
      return;
    }

    if (event.key === 'Escape') {
      this.dismiss();
      return;
    }
  }

  // Removes trigger click listener on trigger change.
  @Watch('trigger')
  public removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement
  ): void {
    if (newValue !== oldValue) {
      this._tooltipController?.abort();
      this._windowEventsController?.abort();
      this._configure(this.trigger);
    }
  }

  public connectedCallback(): void {
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
  }

  public componentDidLoad(): void {
    if (this._hoverTrigger) {
      this._dialog.addEventListener('mouseenter', () => clearTimeout(this._dismissTimeout));
      this._dialog.addEventListener('mouseleave', () => this._dismissOnMouseLeave());
    }
  }

  public disconnectedCallback(): void {
    this._tooltipController?.abort();
    this._windowEventsController?.abort();
    this._focusTrap.disconnect();
  }

  // Check if the trigger is valid and attach click event listeners.
  private _configure(trigger: string | HTMLElement): void {
    if (!trigger) {
      return;
    }

    // Check whether it's a string or an HTMLElement
    if (typeof trigger === 'string') {
      this._triggerElement = document.getElementById(trigger);
      // TODO: Check if window can be avoided
    } else if (trigger instanceof window.Element) {
      this._triggerElement = trigger;
    }

    if (!this._triggerElement) {
      return;
    }

    // Check whether the trigger can be hovered
    this._hoverTrigger = this.hoverTrigger && !window.matchMedia('(pointer: coarse)').matches;

    this._tooltipController = new AbortController();
    if (this._hoverTrigger) {
      this._triggerElement.addEventListener('mouseenter', this._onTriggerMouseEnter, {
        signal: this._tooltipController.signal,
      });

      this._triggerElement.addEventListener('mouseleave', this._onTriggerMouseLeave, {
        signal: this._tooltipController.signal,
      });
    } else {
      this._triggerElement.addEventListener('click', () => this.present(), {
        signal: this._tooltipController.signal,
      });
    }

    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'Space') {
          this._openedByKeyboard = true;
        }
      },
      { signal: this._tooltipController.signal }
    );
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    document.addEventListener('scroll', () => this._setTooltipPosition(), {
      passive: true,
      signal: this._windowEventsController.signal,
    });
    window.addEventListener('resize', () => this._setTooltipPosition(), {
      passive: true,
      signal: this._windowEventsController.signal,
    });
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });

    // Dismiss tooltip on backdrop click
    window.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._windowEventsController.signal,
    });
    window.addEventListener('pointerup', this._dismissOnBackdropClick, {
      signal: this._windowEventsController.signal,
    });
  }

  // Close the tooltip on click of any element that has the 'sbb-tooltip-close' attribute.
  private _dismissOnSbbTooltipCloseClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.hasAttribute('sbb-tooltip-close') && !target.hasAttribute('disabled')) {
      clearTimeout(this._dismissTimeout);
      this.dismiss(target);
    }
  }

  // Check if the pointerdown event target is triggered on the tooltip.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnTooltip = isEventOnElement(this._dialog, event);
  };

  // Close tooltip on backdrop click.
  private _dismissOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnTooltip && !isEventOnElement(this._dialog, event)) {
      clearTimeout(this._dismissTimeout);
      this.dismiss();
    }
  };

  private _onTriggerMouseEnter = (): void => {
    if (this._presented) {
      clearTimeout(this._dismissTimeout);
    } else {
      this._presentTimeout = setTimeout(() => this.present(), this.showDelay);
    }
  };

  private _onTriggerMouseLeave = (): void => {
    if (this._presented) {
      this._dismissOnMouseLeave();
    } else {
      clearTimeout(this._presentTimeout);
    }
  };

  // Close tooltip on mouse leaving the trigger/tooltip hover.
  private _dismissOnMouseLeave = (): void => {
    if (this._presented && !this._isDismissing) {
      this._dismissTimeout = setTimeout(() => this.dismiss(), this.hideDelay);
    }
  };

  // Set tooltip position (x, y) to '0' once the tooltip is dismissed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the tooltip is open.
  private _onTooltipAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'show') {
      this._isPresenting = false;
      this._presented = true;
      this.didPresent.emit();
      this._setTooltipFocus();
      this._focusTrap.trap(this._element);
      this._attachWindowEvents();
    } else if (event.animationName === 'hide') {
      this._isDismissing = false;
      this._presented = false;
      this._dialog.firstElementChild.scrollTo(0, 0);
      this._dialog.close();
      this.didDismiss.emit({ closeTarget: this._tooltipCloseElement });
      this._windowEventsController?.abort();
      this._focusTrap.disconnect();
    }
  }

  // Set focus on the first focusable element.
  private _setTooltipFocus(): void {
    this._prevFocusedElement = document.activeElement as HTMLElement;
    this._firstFocusable = this._element.querySelector(IS_FOCUSABLE_QUERY);

    if (this._openedByKeyboard) {
      this._firstFocusable.focus();
    } else {
      // Focusing sbb-tooltip__content in order to provide a consistent behavior in Safari where else
      // the focus-visible styles would be incorrectly applied
      this._tooltipContentElement.tabIndex = 0;
      this._tooltipContentElement.focus();
      this._element.addEventListener(
        'blur',
        () => this._tooltipContentElement.removeAttribute('tabindex'),
        {
          once: true,
        }
      );
    }
  }

  private _setTooltipPosition(): void {
    if (!this._dialog || !this._triggerElement) {
      return;
    }

    const tooltipPosition = getElementPosition(this._dialog, this._triggerElement, {
      verticalOffset: VERTICAL_OFFSET,
      horizontalOffset: HORIZONTAL_OFFSET,
      centered: true,
    });

    this._alignment = tooltipPosition.alignment;

    const arrowXPosition =
      this._triggerElement.getBoundingClientRect().left -
      tooltipPosition.left +
      this._triggerElement.clientWidth / 2 -
      8; // half the size of the tooltip arrow

    this._element.style.setProperty('--sbb-tooltip-position-x', `${tooltipPosition.left}px`);
    this._element.style.setProperty('--sbb-tooltip-position-y', `${tooltipPosition.top}px`);
    this._element.style.setProperty('--sbb-tooltip-arrow-position-x', `${arrowXPosition}px`);
  }

  public render(): JSX.Element {
    const closeButton = (
      <span class="sbb-tooltip__dismiss">
        <sbb-button
          accessibility-label={
            this.accessibilityCloseLabel || i18nCloseTooltip[this._currentLangauge]
          }
          variant="secondary"
          size="m"
          type="button"
          iconName="cross-small"
          onClick={() => this.dismiss()}
        ></sbb-button>
      </span>
    );

    return (
      <Host
        class={{
          'sbb-tooltip--presented': this._presented,
          'sbb-tooltip--presenting': this._isPresenting,
        }}
      >
        <dialog
          onAnimationEnd={(event: AnimationEvent) => this._onTooltipAnimationEnd(event)}
          ref={(dialogRef) => (this._dialog = dialogRef)}
          class={{
            'sbb-tooltip': true,
            'sbb-tooltip--dismissing': this._isDismissing,
            'sbb-tooltip--above': this._alignment?.vertical === 'above',
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            onClick={(event: Event) => this._dismissOnSbbTooltipCloseClick(event)}
            ref={(tooltipContentRef) => (this._tooltipContentElement = tooltipContentRef)}
            class="sbb-tooltip__content"
          >
            <span>
              <slot>No content</slot>
            </span>
            {!this._hoverTrigger && closeButton}
          </div>
        </dialog>
      </Host>
    );
  }
}
