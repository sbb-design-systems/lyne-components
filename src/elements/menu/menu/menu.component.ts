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
} from '../../core/a11y.js';
import { SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import {
  SbbEscapableOverlayController,
  SbbInertController,
  SbbMediaMatcherController,
  SbbMediaQueryBreakpointSmallAndBelow,
} from '../../core/controllers.js';
import { forceType, idReference } from '../../core/decorators.js';
import { isZeroAnimationDuration, SbbScrollHandler } from '../../core/dom.js';
import { forwardEvent } from '../../core/eventing.js';
import { SbbNamedSlotListMixin } from '../../core/mixins.js';
import {
  getElementPosition,
  getElementPositionHorizontal,
  isEventOnElement,
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay.js';
import '../../divider.js';
import '../menu-button.js';
import type { SbbMenuButtonElement } from '../menu-button.js';
import type { SbbMenuLinkElement } from '../menu-link/menu-link.component.js';

import style from './menu.scss?lit&inline';

const MENU_OFFSET = 8;
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

interface SbbNestedMenu {
  menu: SbbMenuElement;
  openMenu?: SbbNestedMenu;
}

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
class SbbMenuElement extends SbbNamedSlotListMixin<
  SbbMenuButtonElement | SbbMenuLinkElement,
  typeof SbbOpenCloseBaseElement
>(SbbOpenCloseBaseElement) {
  public static override styles: CSSResultGroup = style;
  public static override readonly role = 'menu';
  protected override readonly listChildLocalNames = ['sbb-menu-button', 'sbb-menu-link'];

  /**
   * The element that will trigger the menu overlay.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLElement | null = null;

  /**
   * This will be forwarded as aria-label to the inner list.
   * Used only if the menu automatically renders the actions inside as a list.
   */
  @forceType()
  @property({ attribute: 'list-accessibility-label' })
  public accessor listAccessibilityLabel: string = '';

  private _menu!: HTMLDivElement;
  private _triggerElement: HTMLElement | null = null;
  private _triggerAbortController!: AbortController;
  private _isPointerDownEventOnMenu: boolean = false;
  private _windowEventsController!: AbortController;
  private _escapableOverlayController = new SbbEscapableOverlayController(this);
  private _focusTrapController = new SbbFocusTrapController(this);
  private _scrollHandler = new SbbScrollHandler();
  private _inertController = new SbbInertController(this, undefined, undefined);
  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [SbbMediaQueryBreakpointSmallAndBelow]: (matches) => {
      if (matches && (this.state === 'opening' || this.state === 'opened')) {
        this._scrollHandler.disableScroll();
      } else {
        this._scrollHandler.enableScroll();
      }
    },
  });

  /**
   * Returns the outermost menu.
   *
   * @internal */
  public get mainMenu(): SbbMenuElement {
    return this._nested ? (this._triggerElement?.parentElement as SbbMenuElement).mainMenu : this;
  }

  private get _nested(): boolean {
    return this.internals.states.has('nested');
  }

  /**
   * The data structure containing all nested sbb-menus.
   *
   * @internal */
  public set nestedList(list: SbbNestedMenu | undefined) {
    this._nestedList = list;

    if (list?.openMenu) {
      this.internals.states.add('nested-child');
    } else {
      this.internals.states.delete('nested-child');
    }

    if (this._nested) {
      const parentElement = this._triggerElement?.parentElement as SbbMenuElement;
      parentElement.nestedList = { menu: parentElement, openMenu: list };
    } else {
      this._hanldeNestedMenus(list?.openMenu);
    }
  }

  public get nestedList(): SbbNestedMenu | undefined {
    return this._nestedList;
  }

  private _nestedList?: SbbNestedMenu;

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._menu.addEventListener?.('mouseover', (e) => this._handleNestedMenus(e));
    this._configureTrigger();
  }

  /**
   * Opens the menu on trigger click.
   */
  public open(): void {
    if (this.state === 'closing' || this.state === 'opened' || !this._menu) {
      return;
    }
    if (!this.dispatchBeforeOpenEvent()) {
      return;
    }

    if (this._nested) {
      this.toggleAttribute('data-close-vertically', false);
      this.nestedList = { menu: this };
    }

    this.showPopover?.();
    this.state = 'opening';
    this._setMenuPosition();
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // From zero to medium, disable scroll
    if (this._mediaMatcher.matches(SbbMediaQueryBreakpointSmallAndBelow)) {
      this._scrollHandler.disableScroll();
    }

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /**
   * Closes the menu.
   */
  public close(vertically = false): void {
    if ((this.state === 'opening' && !this._nested) || !this.dispatchBeforeCloseEvent()) {
      return;
    }

    // Close nested menus first
    if (this.nestedList?.openMenu) {
      this.nestedList?.openMenu.menu.close(vertically);
    }

    if (this._nested) {
      this._triggerElement?.parentElement?.toggleAttribute('data-skip-animation', vertically);
      this.toggleAttribute('data-close-vertically', vertically);
      this.nestedList = undefined;
    }

    this.state = 'closing';
    this._triggerElement?.setAttribute('aria-expanded', 'false');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _hanldeNestedMenus(list: SbbNestedMenu | undefined): void {
    let cursor = list;
    this._inertController.restoreAllExempted();

    while (cursor) {
      this._inertController.exempt(cursor.menu);
      cursor = cursor.openMenu;
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-menu-animation-duration');
  }

  private _handleOpening(): void {
    this.state = 'opened';

    if (!this._nested) {
      this._inertController.activate();
    }
    this._escapableOverlayController.connect();
    this._focusTrapController.focusInitialElement();
    this._focusTrapController.enabled = true;
    this._attachWindowEvents();
    this.dispatchOpenEvent();
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.toggleAttribute('data-skip-animation', false);
    this.hidePopover?.();

    this._menu?.firstElementChild?.scrollTo(0, 0);
    if (!this._nested) {
      this._inertController.deactivate();
    }
    // Manually focus last focused element
    this._triggerElement?.focus({
      // When inside the sbb-header, we prevent the scroll to avoid the snapping to the top of the page
      preventScroll:
        this._triggerElement.localName === 'sbb-header-button' ||
        this._triggerElement.localName === 'sbb-header-link',
    });
    this._escapableOverlayController.disconnect();
    this.dispatchCloseEvent();
    this._windowEventsController?.abort();
    this._focusTrapController.enabled = false;

    // Starting from breakpoint medium, enable scroll
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
    ).filter(
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
        if (this._nested) {
          this.close();
          evt.stopPropagation();
          break;
        }
        nextIndex = getNextElementIndex(evt, current, enabledActions.length);
        break;

      case 'ArrowRight':
        if ((evt.target as HTMLElement).hasAttribute('data-sbb-menu-trigger')) {
          (evt.target as HTMLElement).click();
          break;
        }
        nextIndex = getNextElementIndex(evt, current, enabledActions.length);
        break;

      case 'PageUp':
      case 'Home':
        nextIndex = 0;
        break;

      case 'End':
      case 'PageDown':
        nextIndex = enabledActions.length - 1;
        break;

      // this should never happen since all the case allowed by `isArrowKeyOrPageKeysPressed` should be covered
      default:
        nextIndex = 0;
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
    this.shadowRoot?.addEventListener('slotchange', (e) => this._checkListCase(e), {
      capture: true,
    });
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

  private _checkListCase(event: Event): void {
    // If all children are sbb-menu-button/menu-link instances, we render them as a list.
    if (
      this.children?.length &&
      Array.from(this.children ?? []).every(
        (c) => c.localName === 'sbb-menu-button' || c.localName === 'sbb-menu-link',
      )
    ) {
      return;
    }

    event.stopImmediatePropagation();
    if (this.listChildren.length) {
      this.listChildren.forEach((c) => c.removeAttribute('slot'));
      this.listChildren = [];
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
    this._triggerElement.toggleAttribute('data-sbb-menu-trigger', true);
    this._triggerAbortController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._triggerAbortController.signal,
    });

    if (this.listChildLocalNames.includes(this._triggerElement.localName)) {
      this.internals.states.add('nested');
    }
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
    if (!this._nested) {
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
      !target.hasAttribute('data-sbb-menu-trigger') &&
      target.id !== 'sbb-menu__back-button'
    ) {
      this.mainMenu.close(true);
    }
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    const isOnNestedMenu = (event.target as HTMLElement).assignedSlot != null;

    this._isPointerDownEventOnMenu = isEventOnElement(this._menu, event) || isOnNestedMenu;
  };

  // Close menu on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    const target = event.target as HTMLElement;
    if (
      !this._isPointerDownEventOnMenu &&
      !isEventOnElement(this._menu, event) &&
      !(target.localName === 'sbb-menu')
    ) {
      this.close(true);
    }
  };

  // Check if nested menu should be closed.
  private _handleNestedMenus(event: MouseEvent): void {
    event.stopPropagation();

    const element = event.target as HTMLElement;
    const isMobile = this._mediaMatcher.matches(SbbMediaQueryBreakpointSmallAndBelow);

    // All nested menus should close in desktop mode if the cursor landed on
    // anything other than the container, the container's scrollbar or the trigger itself
    if (
      !isMobile &&
      this._nestedList?.openMenu &&
      !element.classList.contains('sbb-menu__content') &&
      !(element.getAttribute('aria-expanded') === 'true')
    ) {
      this.nestedList?.openMenu?.menu.close();
    }

    if (element.hasAttribute('data-sbb-menu-trigger') && !isMobile) {
      element.click();
    }
  }

  // Set menu position (x, y) to '0' once the menu is closed and the transition ended to prevent the
  // viewport from overflowing. And set the focus to the first focusable element once the menu is open.
  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onMenuAnimationEnd(event: AnimationEvent): void {
    if (
      event.animationName === 'open' ||
      (event.animationName === 'open-sideways' && this.state === 'opening')
    ) {
      this._handleOpening();
    } else if (
      event.animationName === 'close' ||
      (event.animationName === 'close-sideways' && this.state === 'closing')
    ) {
      this._handleClosing();
    }
  }

  // Set menu position and max height if the breakpoint is medium-ultra.
  private _setMenuPosition(): void {
    // Starting from breakpoint medium
    if (
      (this._mediaMatcher.matches(SbbMediaQueryBreakpointSmallAndBelow) ?? true) ||
      !this._menu ||
      !this._triggerElement ||
      this.state === 'closing'
    ) {
      return;
    }

    const menuPosition = !this._nested
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
            verticalOffset: MENU_OFFSET * -0.5,
          },
        );

    this.style.setProperty('--sbb-menu-position-x', `${menuPosition.left}px`);
    this.style.setProperty('--sbb-menu-position-y', `${menuPosition.top}px`);
    this.style.setProperty('--sbb-menu-max-height', menuPosition.maxHeight);
  }

  protected override render(): TemplateResult {
    // TODO: Handle case with other elements than sbb-menu-button/sbb-menu-link.
    return html`
      <div class="sbb-menu__container">
        <div
          @animationend=${this._onMenuAnimationEnd}
          class="sbb-menu"
          ${ref((el?: Element) => (this._menu = el as HTMLDivElement))}
        >
          <div
            @click=${(event: Event) => this._interactiveElementClick(event)}
            @scroll=${(e: Event) => forwardEvent(e, document)}
            class="sbb-menu__content"
          >
            ${this.listChildren.length
              ? this.renderList({ class: 'sbb-menu-list', ariaLabel: this.listAccessibilityLabel })
              : html`<slot></slot>`}
            <sbb-divider></sbb-divider>
            <sbb-menu-button
              id="sbb-menu__back-button"
              @click=${() => this.close(false)}
              icon-name="chevron-small-left-small"
              >Back</sbb-menu-button
            >
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
