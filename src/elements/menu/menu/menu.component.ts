import {
  type CSSResultGroup,
  html,
  isServer,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  getNextElementIndex,
  interactivityChecker,
  isArrowKeyOrPageKeysPressed,
  SbbFocusTrapController,
} from '../../core/a11y.ts';
import { SbbOpenCloseBaseElement } from '../../core/base-elements.ts';
import {
  SbbDarkModeController,
  SbbEscapableOverlayController,
  SbbInertController,
  SbbLanguageController,
  SbbMediaMatcherController,
  SbbMediaQueryBreakpointSmallAndBelow,
} from '../../core/controllers.ts';
import { idReference } from '../../core/decorators.ts';
import { isZeroAnimationDuration, SbbScrollHandler } from '../../core/dom.ts';
import { forwardEvent } from '../../core/eventing.ts';
import { i18nGoBack } from '../../core/i18n/i18n.ts';
import { ɵstateController, type SbbNegativeMixinType } from '../../core/mixins.ts';
import {
  getElementPosition,
  getElementPositionHorizontal,
  isEventOnElement,
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbMenuButtonElement } from '../menu-button.ts';
import type { SbbMenuLinkElement } from '../menu-link/menu-link.component.ts';

import style from './menu.scss?lit&inline';

import '../../divider.ts';
import '../menu-button.ts';

const MENU_OFFSET = 8;
const NESTED_MENU_OFFSET = -4;
const INTERACTIVE_ELEMENTS = [
  'A',
  'BUTTON',
  'SBB-BUTTON',
  'SBB-BUTTON-LINK',
  'SBB-LINK',
  'SBB-BLOCK-LINK',
  'SBB-LINK-BUTTON',
  'SBB-BLOCK-LINK-BUTTON',
  'SBB-MENU-BUTTON',
  'SBB-MENU-LINK',
];

let nextId = 0;

/**
 * It displays a contextual menu with one or more action element.
 *
 * @slot - Use the unnamed slot to add `sbb-menu-button`/`sbb-menu-link` or other elements to the menu.
 * @cssprop [--sbb-menu-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-menu')
class SbbMenuElement extends SbbOpenCloseBaseElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static override readonly role = 'menu';

  /**
   * The element that will trigger the menu overlay.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLElement | null = null;

  private _menu!: HTMLDivElement;
  private _triggerElement: HTMLElement | null = null;
  private _triggerAbortController!: AbortController;
  private _isPointerDownEventOnMenu: boolean = false;
  private _windowEventsController!: AbortController;
  private _escapableOverlayController = new SbbEscapableOverlayController(this);
  private _focusTrapController = new SbbFocusTrapController(this);
  private _scrollHandler = new SbbScrollHandler();
  private _inertController = new SbbInertController(this);
  private _mobileBreakpoint = SbbMediaQueryBreakpointSmallAndBelow;
  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [this._mobileBreakpoint]: (matches) => {
      if (matches && (this.state === 'opening' || this.state === 'opened')) {
        this._scrollHandler.disableScroll();
      } else {
        this._scrollHandler.enableScroll();
      }
    },
  });
  private _darkModeController = new SbbDarkModeController(this, () => this._syncNegative());
  private _language = new SbbLanguageController(this);
  private _nestedMenu: SbbMenuElement | null = null;

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._configureTrigger();
  }

  public override escapeStrategy(): void {
    this.closeAll();
  }

  /**
   * Opens the menu on trigger click.
   */
  public open(): void {
    if (
      this.state === 'closing' ||
      this.state === 'opened' ||
      !this._menu ||
      !this.dispatchBeforeOpenEvent()
    ) {
      return;
    }

    if (this._isNested()) {
      const parentMenu = this._parentMenu()!;
      parentMenu.internals.states.add('nested-child');

      // In case we change between arrow key navigation and mouse navigation, it can be that another
      // nested parent menu is still open. We have to close it.
      if (parentMenu._nestedMenu !== this) {
        parentMenu._nestedMenu?.close();
      }
      parentMenu._nestedMenu = this;
    }

    this.showPopover?.();
    this.state = 'opening';
    this._setMenuPosition();
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // From zero to large, disable scroll
    if (this._isMobile()) {
      this._scrollHandler.disableScroll();
    }

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Closes the menu and all its nested menus. */
  public close(): void {
    this._close();
  }

  /** Closes the menu and all related menus (nested and parent menus). */
  public closeAll(): void {
    this._mainMenu()._close(true);
  }

  /** @param [closeAll='false'] - If true, it ensures animations are correct by toggling some states when closing all related menus at once. */
  private _close(closeAll = false): void {
    if ((this.state === 'opening' && !this._isNested()) || !this.dispatchBeforeCloseEvent()) {
      return;
    }

    // Close nested menus first
    this._nestedMenu?._close(closeAll);

    if (this._isNested()) {
      const parentMenu = this._parentMenu()!;
      if (closeAll) {
        this.internals.states.add('close-all');
        parentMenu.internals.states.add('skip-animation');
      } else {
        this.internals.states.delete('close-all');
        parentMenu.internals.states.delete('skip-animation');
      }
      parentMenu.internals.states.delete('nested-child');
      parentMenu._nestedMenu = null;
    }

    this.state = 'closing';
    this._triggerElement?.setAttribute('aria-expanded', 'false');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-menu-animation-duration');
  }

  private _handleOpening(): void {
    this.state = 'opened';

    if (!this._isNested()) {
      this._inertController.activate();
    } else {
      this._updateNestedInert();
    }
    this._escapableOverlayController.connect();
    this._focusTrapController.focusInitialElement();
    this._focusTrapController.enabled = true;
    this._attachWindowEvents();
    this.dispatchOpenEvent();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.internals.states.delete('skip-animation');
    this.internals.states.delete('close-all');
    this.hidePopover?.();

    this._menu?.firstElementChild?.scrollTo(0, 0);
    if (!this._isNested()) {
      this._inertController.deactivate();
    } else {
      this._updateNestedInert();
    }
    // Manually focus last focused element
    this._triggerElement?.focus({
      // When inside the sbb-header, we prevent the scroll to avoid the snapping to the top of the page
      preventScroll: ['sbb-header-button', 'sbb-header-link'].includes(
        this._triggerElement.localName,
      ),
    });
    this._escapableOverlayController.disconnect();
    this.dispatchCloseEvent();
    this._windowEventsController?.abort();
    this._focusTrapController.enabled = false;

    // Starting from breakpoint large, enable scroll
    this._scrollHandler.enableScroll();
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    if (!isArrowKeyOrPageKeysPressed(evt)) {
      return;
    }
    evt.preventDefault();

    const enabledActions: Element[] = Array.from(
      this.querySelectorAll<SbbMenuButtonElement | SbbMenuLinkElement>(
        'sbb-menu-button, sbb-menu-link',
      ),
    )
      .concat(this.shadowRoot!.querySelector('sbb-menu-button')!)
      .filter(
        (el) => (!el.disabled || el.disabledInteractive) && interactivityChecker.isVisible(el),
      );
    const current = enabledActions.findIndex((e: Element) => e === evt.target);

    let nextIndex;
    switch (evt.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        nextIndex = getNextElementIndex(evt, current, enabledActions.length);
        break;

      case 'ArrowLeft':
        if (this._isNested()) {
          this.close();
        }
        break;

      case 'ArrowRight':
        if ((evt.target as HTMLElement).matches(':state(sbb-menu-trigger)')) {
          (evt.target as HTMLElement).click();
        }
        break;

      case 'PageUp':
      case 'Home':
        nextIndex = 0;
        break;

      case 'End':
      case 'PageDown':
        nextIndex = enabledActions.length - 1;
        break;
    }

    if (nextIndex !== undefined) {
      (enabledActions[nextIndex] as HTMLElement).focus();
    }
  }

  // Removes trigger click listener on trigger change.
  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    const renderRoot = super.createRenderRoot();
    // Due to the fact that menu can both be a list and just a container, we need to check its
    // state before the SbbNamedSlotListMixin handles the slotchange event, in order to avoid
    // it interpreting the non list case as a list.
    this.shadowRoot?.addEventListener('slotchange', () => this._syncNegative(), { capture: true });
    return renderRoot;
  }

  public override connectedCallback(): void {
    this.popover = 'manual';
    super.connectedCallback();
    this.id ||= `sbb-menu-${nextId++}`;
    if (this.hasUpdated) {
      this._configureTrigger();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._triggerElement = null;
    this._triggerAbortController?.abort();
    this._windowEventsController?.abort();
    this._scrollHandler.enableScroll();
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (!isServer && (!name || name === 'trigger') && this.hasUpdated) {
      this._configureTrigger();
    }
  }

  // Check if the trigger is valid and attach click event listeners.
  private _configureTrigger(): void {
    if (this.trigger === this._triggerElement) {
      return;
    }

    this._triggerAbortController?.abort();
    removeAriaOverlayTriggerAttributes(this._triggerElement);
    this._triggerElement = this.trigger;

    if (!this._triggerElement) {
      return;
    }

    setAriaOverlayTriggerAttributes(this._triggerElement, 'menu', this.id, this.state);
    this._triggerAbortController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._triggerAbortController.signal,
    });

    // Consider the menu as nested if the trigger is a menu button or menu link.
    this.toggleState(
      'nested',
      ['sbb-menu-button', 'sbb-menu-link'].includes(this._triggerElement.localName),
    );
    ɵstateController(this._triggerElement).add('sbb-menu-trigger');
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    document.addEventListener('scroll', () => this._setMenuPosition(), {
      passive: true,
      signal: this._windowEventsController.signal,
      // Without capture, other scroll contexts would not bubble to this event listener.
      // Capture allows us to react to all scroll contexts in this DOM.
      capture: true,
    });
    window.addEventListener('resize', () => this._setMenuPosition(), {
      passive: true,
      signal: this._windowEventsController.signal,
    });

    // Only the outermost menu needs to listen to the backdrop clicks
    if (!this._isNested()) {
      // Close menu on backdrop click
      window.addEventListener('pointerdown', this._pointerDownListener, {
        signal: this._windowEventsController.signal,
      });
      window.addEventListener('pointerup', this._closeOnBackdropClick, {
        signal: this._windowEventsController.signal,
      });
    }
  }

  // Close menu at any click on an interactive element inside the <sbb-menu> that bubbles to the container.
  private _interactiveElementClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (
      INTERACTIVE_ELEMENTS.includes(target.nodeName) &&
      !target.hasAttribute('disabled') &&
      !target.matches(':state(sbb-menu-trigger)') &&
      target.id !== 'sbb-menu__back-button'
    ) {
      this.closeAll();
    }
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    const menu = (event.target as HTMLElement).closest('sbb-menu');

    // The pointer down is on the menu or one of its nested menus.
    this._isPointerDownEventOnMenu =
      isEventOnElement(this._menu, event) || this._nestedMenus().some((el) => menu === el);
  };

  // Close menu on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    const target = event.target as HTMLElement;

    // The backdrop is only listened on the main menu (outermost menu).
    // To close.
    // - The pointer down and up need to be outside the menu.
    // - The target should be not on a nested menu
    if (
      !this._isPointerDownEventOnMenu &&
      !isEventOnElement(this._menu, event) &&
      !this._nestedMenus().some((el) => el === target)
    ) {
      this.closeAll();
    }
  };

  /** Converts the linked list into an array of SbbMenuElement. */
  private _nestedMenus(): SbbMenuElement[] {
    const menus: SbbMenuElement[] = [];
    let current = this._nestedMenu;

    while (current) {
      menus.push(current);
      current = current._nestedMenu;
    }

    return menus;
  }

  private _parentMenu(): SbbMenuElement | null {
    return this._triggerElement?.closest('sbb-menu') ?? null;
  }

  /** The outermost menu. */
  private _mainMenu(): SbbMenuElement {
    return this._isNested() ? (this._parentMenu()?._mainMenu() ?? this) : this;
  }

  private _isNested(): boolean {
    return !!this._parentMenu();
  }

  private _updateNestedInert(): void {
    this._inertController.restoreAllExempted();
    this._mainMenu()
      ._nestedMenus()
      .forEach((menu) => this._inertController.exempt(menu));
  }

  // Check if nested menu should be closed.
  private _handleMouseOver(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    const isMobile = this._isMobile();

    // All nested menus should close in desktop mode if the cursor landed on
    // anything other than the container, the container's scrollbar or the trigger itself
    if (
      !isMobile &&
      this._nestedMenu &&
      !element.classList.contains('sbb-menu__content') &&
      !(element.getAttribute('aria-expanded') === 'true')
    ) {
      this._nestedMenu.close();
    }

    if (element.matches(':state(sbb-menu-trigger)') && !isMobile) {
      element.click();
    }
  }

  // Set menu position (x, y) to '0' once the menu is closed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the menu is open.
  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onMenuAnimationEnd(event: AnimationEvent): void {
    if (
      (event.animationName === 'open' || event.animationName === 'open-sideways') &&
      this.state === 'opening'
    ) {
      this._handleOpening();
    } else if (
      (event.animationName === 'close' || event.animationName === 'close-sideways') &&
      this.state === 'closing'
    ) {
      this._handleClosing();
    }
  }

  // Set menu position and max height if the breakpoint is large-ultra.
  private _setMenuPosition(): void {
    // Starting from breakpoint large
    if (this._isMobile() || !this._menu || !this._triggerElement || this.state === 'closing') {
      return;
    }

    const menuPosition = !this._isNested()
      ? getElementPosition(
          this.shadowRoot!.querySelector('.sbb-menu__content')!,
          this._triggerElement,
          this.shadowRoot!.querySelector('.sbb-menu__container')!,
          {
            verticalOffset: MENU_OFFSET,
          },
        )
      : getElementPositionHorizontal(
          this.shadowRoot!.querySelector('.sbb-menu__content')!,
          this._triggerElement,
          this.shadowRoot!.querySelector('.sbb-menu__container')!,
          {
            horizontalOffset: MENU_OFFSET,
            verticalOffset: NESTED_MENU_OFFSET,
            contentSelector: '.sbb-menu__content',
          },
        );

    this.style.setProperty('--sbb-menu-position-x', `${menuPosition.left}px`);
    this.style.setProperty('--sbb-menu-position-y', `${menuPosition.top}px`);
    this.style.setProperty('--sbb-menu-max-height', menuPosition.maxHeight);
  }

  private _syncNegative(): void {
    // Links and buttons are the most expected contents which have a negative property
    this.querySelectorAll(':state(sbb-link), :state(sbb-button)')?.forEach((el: Element) => {
      customElements.upgrade(el);
      (el as Element & SbbNegativeMixinType).negative = !this._darkModeController.matches();
    });
  }

  private _isMobile(): boolean {
    return this._mediaMatcher.matches(this._mobileBreakpoint) ?? true;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-menu__container">
        <div
          @animationend=${this._onMenuAnimationEnd}
          @mouseover=${(e: MouseEvent) => this._handleMouseOver(e)}
          class="sbb-menu"
          ${ref((el?: Element) => (this._menu = el as HTMLDivElement))}
        >
          <div
            @click=${(event: Event) => this._interactiveElementClick(event)}
            @scroll=${(e: Event) => forwardEvent(e, document)}
            class="sbb-menu__content"
          >
            <slot></slot>
            <sbb-divider></sbb-divider>
            <sbb-menu-button
              id="sbb-menu__back-button"
              @click=${() => this.close()}
              icon-name="chevron-small-left-small"
            >
              ${i18nGoBack[this._language.current]}
            </sbb-menu-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu': SbbMenuElement;
  }
}
