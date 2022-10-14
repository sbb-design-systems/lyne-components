import {
  Component,
  ComponentInterface,
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
  Watch,
} from '@stencil/core';
import { getElementPosition, isEventOnElement } from '../../global/helpers/position';
import { isBreakpoint } from '../../global/helpers/breakpoint';

const MENU_OFFSET = 8;
const INTERACTIVE_ELEMENTS = ['A', 'BUTTON', 'SBB-BUTTON', 'SBB-LINK'];
const IS_FOCUSABLE_QUERY = `:is(button, [href], input, select, textarea, details, summary:not(:disabled), [tabindex], sbb-button, sbb-link, sbb-menu-action):not([disabled]):not([tabindex="-1"]):not([static])`;

/**
 * @slot unnamed - Use this slot to project any content inside the dialog.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-menu.scss',
  tag: 'sbb-menu',
})
export class SbbMenu implements ComponentInterface {
  /**
   * The element that will trigger the menu dialog.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * Whether the menu is presented.
   */
  @State() private _presented = false;

  /**
   * Whether the menu is presenting.
   */
  @State() private _isPresenting = false;

  /**
   * Whether the menu is closing.
   */
  @State() private _isDismissing = false;

  /**
   * Emits whenever the menu starts the presenting transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_will-present',
  })
  public willPresent: EventEmitter<void>;

  /**
   * Emits whenever the menu is presented.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_did-present',
  })
  public didPresent: EventEmitter<void>;

  /**
   * Emits whenever the menu begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_will-dismiss',
  })
  public willDismiss: EventEmitter<void>;

  /**
   * Emits whenever the menu is dismissed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_did-dismiss',
  })
  public didDismiss: EventEmitter<void>;

  private _dialog: HTMLDialogElement;
  private _triggerElement: HTMLElement;
  private _menuContentElement: HTMLElement;
  private _firstFocusable: HTMLElement;
  private _lastFocusable: HTMLElement;
  private _isPointerDownEventOnMenu: boolean;
  private _menuController: AbortController;
  private _resizeController: AbortController;
  private _openedByKeyboard = false;

  @Element() private _element!: HTMLElement;

  /**
   * Opens the menu on trigger click.
   */
  @Method()
  public async present(): Promise<void> {
    if (this._isDismissing || !this._dialog) {
      return;
    }

    this.willPresent.emit();
    this._isPresenting = true;
    this._setMenuPosition();
    this._dialog.show();
  }

  /**
   * Dismisses the menu.
   */
  @Method()
  @Listen('sbb-menu-action_click')
  public async dismiss(): Promise<void> {
    if (this._isPresenting) {
      return;
    }

    this.willDismiss.emit();
    this._isDismissing = true;
    this._presented = false;
    this._openedByKeyboard = false;
  }

  // Dismisses the menu on "Esc" key pressed.
  @Listen('keydown')
  public onEscAction(event: KeyboardEvent): void {
    if (!this._presented) {
      return;
    }

    if (event.key === 'Escape') {
      this.dismiss();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this._firstFocusable) {
        this._focusMenuElement(this._lastFocusable);
        event.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === this._lastFocusable) {
        this._focusMenuElement(this._firstFocusable);
        event.preventDefault();
      }
    }
  }

  // Removes trigger click listener on trigger change.
  @Watch('trigger')
  public removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement
  ): void {
    if (newValue !== oldValue) {
      this._menuController?.abort();
      this._resizeController?.abort();
      this._configure(this.trigger);
    }
  }

  public connectedCallback(): void {
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
  }

  public componentDidLoad(): void {
    // Dismiss menu on interactive element click
    this._menuContentElement.addEventListener('click', (event: Event) =>
      this._dismissOnInteractiveElementClick(event)
    );

    // Listen for menu animation to end
    this._dialog.addEventListener('animationend', (event: AnimationEvent) =>
      this._onMenuAnimationEnd(event)
    );
  }

  public disconnectedCallback(): void {
    this._menuController?.abort();
    this._resizeController?.abort();
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

    this._menuController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.present(), {
      signal: this._menuController.signal,
    });
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'Space') {
          this._openedByKeyboard = true;
        }
      },
      { signal: this._menuController.signal }
    );

    // Dismiss menu on backdrop click
    this._element.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._menuController.signal,
    });
    this._element.addEventListener('pointerup', this._dismissOnBackdropClick, {
      signal: this._menuController.signal,
    });
  }

  // Resets position on window resize.
  public onResizeWindowEvent(): void {
    this._resizeController = new AbortController();
    window.addEventListener('resize', () => this._setMenuPosition(), {
      passive: true,
      signal: this._resizeController.signal,
    });
  }

  // Dismiss menu at any click on an interactive element inside the <sbb-menu> that bubbles to the container.
  private _dismissOnInteractiveElementClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (INTERACTIVE_ELEMENTS.includes(target.nodeName) && !target.hasAttribute('disabled')) {
      this.dismiss();
    }
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnMenu = isEventOnElement(this._dialog, event);
  };

  // Close menu on backdrop click.
  private _dismissOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnMenu && !isEventOnElement(this._dialog, event)) {
      this.dismiss();
    }
  };

  // Set menu position (x, y) to '0' once the menu is dismissed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the menu is open.
  private _onMenuAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'show') {
      this._isPresenting = false;
      this._presented = true;
      this.didPresent.emit();
      this._setDialogFocus();
      this.onResizeWindowEvent();
    }

    if (event.animationName === 'hide') {
      this._isDismissing = false;
      this._presented = false;
      this._dialog.firstElementChild.scrollTo(0, 0);
      this._dialog.close();
      this.didDismiss.emit();
      this._resizeController?.abort();
    }
  }

  // Avoid possible double focus on some elements.
  private _focusMenuElement(element: HTMLElement): void {
    if (['SBB-BUTTON', 'SBB-LINK', 'SBB-MENU-ACTION'].includes(element.nodeName)) {
      (element.shadowRoot.querySelector(IS_FOCUSABLE_QUERY) as HTMLElement).focus();
    } else {
      element.focus();
    }
  }

  // Set focus on the first focusable element.
  private _setDialogFocus(): void {
    const focusableElements = Array.from(this._element.querySelectorAll(IS_FOCUSABLE_QUERY));
    this._firstFocusable = focusableElements[0] as HTMLElement;
    this._lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (this._openedByKeyboard) {
      this._focusMenuElement(this._firstFocusable);
    } else {
      // Focusing sbb-menu__content in order to provide a consistent behavior in Safari where else
      // the focus-visible styles would be incorrectly applied
      this._menuContentElement.tabIndex = 0;
      this._menuContentElement.focus();
      this._element.addEventListener(
        'blur',
        () => this._menuContentElement.removeAttribute('tabindex'),
        {
          once: true,
        }
      );
    }
  }

  // Set menu position and max height if the breakpoint is medium-ultra.
  private _setMenuPosition(): void {
    // Starting from breakpoint medium
    if (!isBreakpoint('medium') || !this._dialog || !this._triggerElement) {
      return;
    }

    const menuPosition = getElementPosition(this._dialog, this._triggerElement, {
      elementOffset: MENU_OFFSET,
    });

    this._element.style.setProperty('--sbb-menu-position-x', `${menuPosition.left}px`);
    this._element.style.setProperty('--sbb-menu-position-y', `${menuPosition.top}px`);
    this._element.style.setProperty('--sbb-menu-max-height', menuPosition.maxHeight);
  }

  public render(): JSX.Element {
    return (
      <Host
        class={{
          'sbb-menu--presented': this._presented,
          'sbb-menu--presenting': this._isPresenting,
        }}
      >
        <dialog
          ref={(dialogRef) => (this._dialog = dialogRef)}
          class={{
            'sbb-menu': true,
            'sbb-menu--dismissing': this._isDismissing,
          }}
        >
          <div
            class="sbb-menu__content"
            ref={(menuContentRef) => (this._menuContentElement = menuContentRef)}
          >
            <slot />
          </div>
        </dialog>
      </Host>
    );
  }
}
