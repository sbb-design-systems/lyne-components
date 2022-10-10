import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { getElementPosition } from '../../global/helpers/position';
import { isBreakpoint } from '../../global/helpers/breakpoint';

const MENU_OFFSET = 8;
const INTERACTIVE_ELEMENTS = ['A', 'BUTTON', 'SBB-BUTTON', 'SBB-LINK'];
const IS_FOCUSABLE_QUERY = `:is(button, [href], input, select, textarea, details, summary:not(:disabled), [tabindex], sbb-button, sbb-link, sbb-menu-action):not([disabled]):not([tabindex="-1"])`;

/**
 * @slot unnamed - Use this slot to project any content inside the dialog.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-menu.scss',
  tag: 'sbb-menu',
})
export class SbbMenu implements ComponentInterface {
  @Element() public el!: HTMLElement;

  /**
   * The element that will trigger the menu dialog.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @Prop({ reflect: true }) public trigger: string | HTMLElement;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * Whether the menu is open.
   */
  @State() private _open = false;

  /**
   * Whether the menu is closing.
   */
  @State() private _isDismissing = false;

  /**
   * Emits whenever the menu starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the menu is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the menu begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_will-close',
  })
  public willClose: EventEmitter<void>;

  /**
   * Emits whenever the menu is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu_did-close',
  })
  public didClose: EventEmitter<void>;

  private _dialog: HTMLDialogElement;
  private _triggerEl: HTMLElement;
  private _pointerDownEventTarget: string | null;
  private _menuController: AbortController;
  private _resizeController: AbortController;

  /**
   * Opens the menu on trigger click.
   */
  @Method()
  public async open(): Promise<void> {
    this.willOpen.emit();
    this._setMenuPosition();
    this._dialog.showModal();
  }

  /**
   * Closes the menu.
   */
  @Method()
  @Listen('sbb-menu-action_click')
  public async close(): Promise<void> {
    this.willClose.emit();
    this._isDismissing = true;
  }

  // Closes the menu on "Esc" key pressed.
  @Listen('keydown')
  public onEscAction(event: KeyboardEvent): void {
    if (this._open && event.key === 'Escape') {
      event.preventDefault();
      this.close();
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

  public componentDidLoad(): void {
    this._dialog = this.el.shadowRoot.querySelector('dialog');

    // validate trigger element and attach event listeners
    this._configure(this.trigger);
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

    // check whether it's a string or an HTMLElement
    if (typeof trigger === 'string') {
      this._triggerEl = document.getElementById(trigger);
    } else if (trigger instanceof window.Element) {
      this._triggerEl = trigger;
    }

    if (!this._triggerEl) {
      return;
    }

    this._menuController = new AbortController();
    this._triggerEl.addEventListener('click', () => this.open(), {
      signal: this._menuController.signal,
    });

    // close menu on backdrop click
    this._dialog.addEventListener('pointerdown', this._pointerDownListener, {
      signal: this._menuController.signal,
    });
    this._dialog.addEventListener('pointerup', this._dismissOnBackdropClick, {
      signal: this._menuController.signal,
    });

    // close menu interactive element click
    this._dialog.firstElementChild.addEventListener(
      'click',
      (event: MouseEvent) => this._dismissOnInteractiveElementClick(event),
      { signal: this._menuController.signal }
    );

    // listen for menu animation to end
    this._dialog.addEventListener(
      'animationend',
      (event: AnimationEvent) => this._onMenuAnimationEnd(event),
      { signal: this._menuController.signal }
    );
  }

  // Resets position on window resize.
  public onResizeWindowEvent(): void {
    this._resizeController = new AbortController();
    window.addEventListener('resize', () => this._setMenuPosition(), {
      passive: true,
      signal: this._resizeController.signal,
    });
  }

  // Close menu at any click on an interactive element inside the <sbb-menu> that bubbles to the container.
  private _dismissOnInteractiveElementClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (INTERACTIVE_ELEMENTS.includes(target.nodeName) && !target.hasAttribute('disabled')) {
      this.close();
    }
  }

  // Store pointerdown event target to track origin of click.
  private _pointerDownListener = ({ target }: PointerEvent): void => {
    this._pointerDownEventTarget = (target as HTMLElement).nodeName;
  };

  // Close menu on backdrop click.
  private _dismissOnBackdropClick = ({ target }: PointerEvent): void => {
    if (
      this._pointerDownEventTarget === 'DIALOG' &&
      (target as HTMLElement).nodeName === 'DIALOG'
    ) {
      this.close();
    }
  };

  // Set menu position (x, y) to '0' once the menu is closed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the menu is open.
  private _onMenuAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'show') {
      this._open = true;
      this.didOpen.emit();
      this._setDialogFocus();
      this.onResizeWindowEvent();
    }

    if (event.animationName === 'hide') {
      this._isDismissing = false;
      this._open = false;
      this._dialog.firstElementChild.scrollTo(0, 0);
      this._dialog.close();
      this.didClose.emit();
      this._resizeController?.abort();
    }
  }

  // Set focus on the first focusable element.
  private _setDialogFocus(): void {
    const firstFocusable = Array.from(
      this.el.querySelectorAll(IS_FOCUSABLE_QUERY)
    )[0] as HTMLElement;
    if (['SBB-BUTTON', 'SBB-LINK', 'SBB-MENU-ACTION'].includes(firstFocusable.nodeName)) {
      (
        Array.from(firstFocusable.shadowRoot.querySelectorAll(IS_FOCUSABLE_QUERY))[0] as HTMLElement
      ).focus();
    } else {
      firstFocusable.focus();
    }
  }

  // Set menu position and max height if the breakpoint is medium-ultra.
  private _setMenuPosition(): void {
    if (!isBreakpoint('medium') || !this._dialog || !this._triggerEl) {
      return;
    }

    const menuPosition = getElementPosition(this._dialog, this._triggerEl, {
      elementOffset: MENU_OFFSET,
    });

    this.el.style.setProperty('--sbb-menu-position-x', `${menuPosition.left}px`);
    this.el.style.setProperty('--sbb-menu-position-y', `${menuPosition.top}px`);
    this.el.style.setProperty('--sbb-menu-max-height', menuPosition.maxHeight);
  }

  public render(): JSX.Element {
    return (
      <dialog
        class={{
          'sbb-menu': true,
          'sbb-menu--open': this._open,
          'sbb-menu--dismissing': this._isDismissing,
        }}
      >
        <div class="sbb-menu__content">
          <slot></slot>
        </div>
      </dialog>
    );
  }
}
