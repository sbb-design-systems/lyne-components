import { Component, Element, h, JSX, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { getElementPosition } from './position';
import { isMediumUltra } from './breakpoint';

/**
 * @slot unnamed - Use this slot to project any content inside the component.
 */

const MENU_OFFSET = 8;

@Component({
  shadow: true,
  styleUrl: 'sbb-menu.scss',
  tag: 'sbb-menu',
})
export class SbbMenu {
  /**
   * Component element
   */
  @Element() public el!: HTMLElement;

  /**
   * The element that will trigger the menu dialog.
   * Accepts both a string (id of an element) or a HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * Open sate
   */
  @State() public open = false;

  /**
   * Fixed state
   */
  @State() public isDismissing = false;

  /**
   * Overflows window height
   */
  @State() public overflows = false;

  /**
   * Open menu
   */
  @Method()
  public async openMenu(): Promise<void> {
    this.open = true;
    this._setMenuPosition();
    this._dialog.showModal();
  }

  /**
   * Close menu
   */
  @Method()
  public async closeMenu(): Promise<void> {
    if (isMediumUltra()) {
      this.isDismissing = true;
    } else {
      this._dialog.close();
    }
  }

  // Reset position on window resize
  @Listen('resize', { target: 'window', passive: true })
  public onResizeWindowEvent(): void {
    if (this.open) {
      this._setMenuPosition();
    }
  }

  // Close menu on action clicked
  @Listen('sbb-menu-action_click')
  public onMenuActionClick(event): void {
    console.log(event.detail);
    this.closeMenu();
  }

  // Remove trigger click listener on trigger change
  @Watch('trigger')
  public removeTriggerClickListener(newValue, oldValue): void {
    if (newValue !== oldValue) {
      this._triggerController.abort();
    }
  }

  public componentDidLoad(): void {
    this._dialog = this.el.shadowRoot.querySelector('dialog');

    // validate trigger element and attach click event
    this._configureTriggerElement(this.trigger);

    // set the menu position relative to the trigger
    this._setMenuPosition();

    // close menu on interactive elements click
    this._dismissOnInteractiveElementClick();

    // close menu on backdrop click
    this._dismissOnBackdropClick();

    // listen for transitionend event on dialog dismiss
    this._onMenuDismissTransitionEnd();

    this.open = this.el.hasAttribute('open');
    if (this.open) {
      this.openMenu();
    }

    // TODO --> emit events did-close, did-open (?)...
    this._dialog.addEventListener('close', () => {
      this.open = false;
    });
  }

  // TODO --> improve dialog element type check (https://github.com/microsoft/TypeScript/issues/48267)
  private _dialog: HTMLDialogElement | any;
  private _triggerEl: HTMLElement;
  private _triggerController: AbortController;

  // Check if the trigger is valid and attach click event listener
  private _configureTriggerElement(trigger): void {
    if (!trigger) {
      return;
    }

    // check wether it's a string or an HTMLElement
    if (this._isElement(trigger)) {
      this._triggerEl = trigger;
    } else if (typeof trigger === 'string') {
      this._triggerEl = document.getElementById(trigger);
    }

    if (this._triggerEl) {
      this._triggerController = new AbortController();
      this._triggerEl.addEventListener('click', () => this.openMenu(), {
        signal: this._triggerController.signal,
      });
    }
  }

  // Returns true if it is a DOM element
  private _isElement(o): boolean {
    return o instanceof window.Element;
  }

  // Close menu at any click on an interactive element inside the <sbb-menu> that bubbles to the container
  private _dismissOnInteractiveElementClick(): void {
    const query = '[href], button:not([disabled]), sbb-button:not([disabled]), sbb-link';
    const interactiveElements = this.el.querySelectorAll(query);
    interactiveElements.forEach((el) => el.addEventListener('click', () => this.closeMenu()));
  }

  // Close menu on backdrop clicked
  private _dismissOnBackdropClick(): void {
    this._dialog.addEventListener('click', (event) => {
      const rect = this._dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        this.closeMenu();
      }
    });
  }

  // Set menu position x and y to '0' one the menu is closed and the transition ended
  private _onMenuDismissTransitionEnd(): void {
    this._dialog.ontransitionend = (event) => {
      if (this.isDismissing && event.propertyName === 'opacity') {
        console.log('Transition ended');
        this.isDismissing = false;
        this._dialog.close();
      }
    };
  }

  // Set menu position
  private _setMenuPosition(): void {
    if (!isMediumUltra() || !this._dialog || !this._triggerEl) {
      return;
    }

    const menuPosition = getElementPosition(this._dialog, this._triggerEl, {
      elementOffset: MENU_OFFSET,
    });

    this.el.style.setProperty('--sbb-menu-position-x', `${menuPosition.left}px`);
    this.el.style.setProperty('--sbb-menu-position-y', `${menuPosition.top}px`);

    this.overflows = menuPosition.overflows;
    this.el.style.setProperty('--sbb-menu-max-height', menuPosition.maxHeight);
  }

  public render(): JSX.Element {
    return (
      <dialog
        class={{
          'sbb-menu': true,
          'sbb-menu--open': this.open,
          'sbb-menu--dismissing': this.isDismissing,
          'sbb-menu--overflows': this.overflows,
        }}
      >
        <div class="sbb-menu__content">
          <slot></slot>
        </div>
      </dialog>
    );
  }
}
