import { Component, Element, h, Listen, Method, Prop, Watch } from '@stencil/core';

/**
 * @slot unnamed - Use this slot to project any content inside the component.
 */

const MENU_OFFSET = 8;
const INTERACTIVE_ELEMENTS = ['BUTTON', 'SBB-BUTTON', 'SBB-LINK'];

@Component({
  shadow: true,
  styleUrl: 'sbb-menu.scss',
  tag: 'sbb-menu',
})
export class SbbMenu {
  // TODO --> improve dialog element type check (https://github.com/microsoft/TypeScript/issues/48267)
  private _dialog: HTMLDialogElement | any;
  private _triggerEl: HTMLElement;
  private _triggerController: AbortController;

  @Element() private _element: HTMLElement;

  /**
   * The element that will trigger the menu dialog.
   * Accepts both a string (id of an element) or a HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * Check if the trigger is valid and wether it's a string or an HTMLElement
   * and attach click event listener.
   */
  @Watch('trigger')
  private _configureTriggerElement(trigger): void {
    if (!trigger) {
      console.warn('You should provide a valid trigger for the sbb-menu.');
      return;
    }

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
      this._handleTriggerElementRemoved();
      this._handleTriggerElementIdChanged();
    } else {
      console.warn('You should provide a valid trigger for the sbb-menu.');
    }
  }

  /**
   * Any click on an interactive element inside the <sbb-menu>
   * that bubbles to the container will close the menu.
   */
  @Listen('click')
  public handleClickEvent(event): void {
    const hasHref = (event.target as HTMLElement).hasAttribute('href');
    const isInteractiveElement = INTERACTIVE_ELEMENTS.includes(
      (event.target as HTMLElement).nodeName
    );

    if (hasHref || isInteractiveElement) {
      this._dialog.close();
    }
  }

  @Listen('resize', { target: 'window' })
  public handleResizeWindowEvent(): void {
    this._dialog?.close();
  }

  @Listen('sbb-menu-action_click')
  public onMenuActionClick(event: any): void {
    console.log(event.detail);
    this.closeMenu();
  }

  public componentDidLoad(): void {
    this._dialog = this._element.shadowRoot.querySelector('dialog');

    // TODO --> emit events didClose, didOpen...
    this._dialog.addEventListener('close', function () {
      console.log(`Dialog closed`);
    });

    this._configureTriggerElement(this.trigger);
  }

  // Returns true if it is a DOM element
  private _isElement(o): boolean {
    return o instanceof window.Element;
  }

  private _isMediumUltra(): boolean {
    const mediumBreakpoint = getComputedStyle(document.documentElement).getPropertyValue(
      '--sbb-breakpoint-medium-min'
    );
    return window.matchMedia(`(min-width: ${mediumBreakpoint})`).matches;
  }

  private _setMenuPosition(properties: { menuOffset: number }): void {
    const menuTrigger = this._triggerEl;
    const menu = this._dialog;

    const menuTriggerRec = menuTrigger.getBoundingClientRect();
    const menuRec = menu.getBoundingClientRect();

    // default menu alignment is "start/below"
    let menuXPosition = menuTrigger.offsetLeft;
    let menuYPosition = menuTrigger.offsetTop + menuTriggerRec.height + properties?.menuOffset;

    // check if horizontal alignment needs to be changed to "end"
    if (window.innerWidth < menuXPosition + menuRec.width) {
      menuXPosition = menuTriggerRec.right - menuRec.width;
    }

    // check if vertical alignment needs to be changed to "above"
    if (
      window.innerHeight <
        menuTriggerRec.top + menuTriggerRec.height + menuRec.height + MENU_OFFSET &&
      menuTriggerRec.top > menuRec.height
    ) {
      menuYPosition = menuTrigger.offsetTop - menuRec.height - properties?.menuOffset;
    }

    menu.style.setProperty('--sbb-menu-position-x', `${menuXPosition}px`);
    menu.style.setProperty('--sbb-menu-position-y', `${menuYPosition}px`);
  }

  private _dismissOnBackdropClick(): void {
    const controller = new AbortController();

    this._dialog.addEventListener(
      'click',
      (event) => {
        const rect = this._dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
          this._dialog.close();
          controller.abort();
        }
      },
      {
        signal: controller.signal,
      }
    );
  }

  private _handleTriggerElementRemoved(): void {
    const parent = this._triggerEl.parentNode;
    if (!parent) throw new Error('The node must already be attached');
    const obs = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const el of Array.from(mutation.removedNodes)) {
          if (el === this._triggerEl) {
            obs.disconnect();
            this._triggerController.abort();
          }
        }
      }
    });

    obs.observe(parent, {
      childList: true,
      attributeFilter: ['id'],
    });
  }

  private _handleTriggerElementIdChanged(): void {
    const obs = new MutationObserver(() => {
      obs.disconnect();
      this._triggerController.abort();
    });

    obs.observe(this._triggerEl, {
      attributeFilter: ['id'],
    });
  }

  @Method()
  public async openMenu(): Promise<void> {
    if (this._isMediumUltra()) {
      this._setMenuPosition({ menuOffset: MENU_OFFSET });
    }
    // close menu on backdrop click
    this._dismissOnBackdropClick();
    this._dialog.showModal();
  }

  @Method()
  public async closeMenu(): Promise<void> {
    await this._dialog.close();
  }

  public render(): JSX.Element {
    return (
      <dialog class="sbb-menu">
        <div class="sbb-menu__content">
          <slot></slot>
        </div>
      </dialog>
    );
  }
}
