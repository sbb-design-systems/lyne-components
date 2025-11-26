import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  isServer,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { SbbFocusTrapController } from '../../core/a11y.ts';
import { SbbOpenCloseBaseElement } from '../../core/base-elements.ts';
import {
  SbbEscapableOverlayController,
  SbbInertController,
  SbbLanguageController,
} from '../../core/controllers.ts';
import { forceType, idReference } from '../../core/decorators.ts';
import { isZeroAnimationDuration, SbbScrollHandler } from '../../core/dom.ts';
import { i18nCloseNavigation } from '../../core/i18n.ts';
import { SbbUpdateSchedulerMixin } from '../../core/mixins.ts';
import {
  isEventOnElement,
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbNavigationButtonElement } from '../navigation-button.ts';
import type { SbbNavigationLinkElement } from '../navigation-link.ts';
import type { SbbNavigationSectionElement } from '../navigation-section.ts';

import style from './navigation.scss?lit&inline';

import '../../button/transparent-button.ts';

let nextId = 0;
const DEBOUNCE_TIME = 150;

/**
 * It displays a navigation menu, wrapping one or more `sbb-navigation-*` components.
 *
 * @slot - Use the unnamed slot to add `sbb-navigation-button`/`sbb-navigation-link` elements into the sbb-navigation menu.
 * @cssprop [--sbb-navigation-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
export
@customElement('sbb-navigation')
class SbbNavigationElement extends SbbUpdateSchedulerMixin(SbbOpenCloseBaseElement) {
  public static override readonly role = 'navigation';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /**
   * The element that will trigger the navigation.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLElement | null = null;

  /** This will be forwarded as aria-label to the close button element. */
  @forceType()
  @property({ attribute: 'accessibility-close-label' })
  public accessor accessibilityCloseLabel: string = '';

  /** Whether a navigation section is displayed. */
  @state() private accessor _activeNavigationSection: SbbNavigationSectionElement | null = null;

  /** Returns the active navigation section element. */
  public get activeNavigationSection(): SbbNavigationSectionElement | null {
    return this._activeNavigationSection;
  }

  /** Returns the close button element. */
  public get closeButton(): HTMLElement | null {
    return this.shadowRoot?.querySelector('#sbb-navigation-close-button') ?? null;
  }

  /** Returns the navigation content element. */
  public get navigationContent(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.sbb-navigation__content') ?? null;
  }

  private _navigation!: HTMLDivElement;
  private _triggerElement: HTMLElement | null = null;
  private _triggerAbortController!: AbortController;
  private _language = new SbbLanguageController(this);
  private _inertController = new SbbInertController(this);
  private _escapableOverlayController = new SbbEscapableOverlayController(this);
  private _focusTrapController = new SbbFocusTrapController(this);
  private _scrollHandler = new SbbScrollHandler();
  private _isPointerDownEventOnNavigation: boolean = false;
  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;
  private _navigationResizeObserver = new ResizeController(this, {
    skipInitial: true,
    callback: () => this._onNavigationResize(),
  });

  public constructor() {
    super();
    this.addEventListener?.('click', (event) => this._handleNavigationClose(event));
    this.addEventListener?.('pointerup', (event) => this._closeOnBackdropClick(event));
    this.addEventListener?.('pointerdown', (event) => this._pointerDownListener(event));
    this.addEventListener?.(
      'ɵnavigationsectionopening',
      (event) => {
        this._activeNavigationSection = event.target as SbbNavigationSectionElement;
        this.toggleState('has-open-navigation-section', !!this._activeNavigationSection);
      },
      { capture: true },
    );
    this.addEventListener?.(
      'ɵnavigationsectionclosing',
      (event) => {
        if (this._activeNavigationSection === event.target) {
          this._activeNavigationSection = null;
          this.internals.states.delete('has-open-navigation-section');
        }
      },
      { capture: true },
    );
  }

  /** Opens the navigation. */
  public open(): void {
    if (this.state !== 'closed' || !this.hasUpdated || !this.dispatchBeforeOpenEvent()) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';
    this._checkActiveActions();
    this._checkActiveSection();
    this.startUpdate();

    // Disable scrolling for content below the navigation
    this._scrollHandler.disableScroll();
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  private _checkActiveSection(): void {
    const activeAction = this.querySelector(
      'sbb-navigation-button.sbb-active',
    ) as SbbNavigationButtonElement;
    activeAction?.connectedSection?.open();
  }

  private _checkActiveActions(): void {
    const activeActions = Array.from(
      this.querySelectorAll(':is(sbb-navigation-button, sbb-navigation-link).sbb-active'),
    ) as (SbbNavigationButtonElement | SbbNavigationLinkElement)[];
    activeActions?.forEach((action) => action.marker?.select(action));
  }

  /** Closes the navigation. */
  public close(): void {
    if (this.state !== 'opened' || !this.dispatchBeforeCloseEvent()) {
      return;
    }

    this.state = 'closing';
    this.startUpdate();
    this._triggerElement?.setAttribute('aria-expanded', 'false');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-navigation-animation-duration');
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.hidePopover?.();
    this.navigationContent?.scrollTo(0, 0);
    this._inertController.deactivate();
    this._triggerElement?.focus();
    this._escapableOverlayController.disconnect();
    this.dispatchCloseEvent();
    this._navigationResizeObserver.unobserve(this);
    this._resetMarkers();
    this._focusTrapController.enabled = false;

    // Enable scrolling for content below the navigation
    this._scrollHandler.enableScroll();
    this.completeUpdate();
  }

  private _handleOpening(): void {
    this.state = 'opened';
    this._navigationResizeObserver.observe(this);
    this._inertController.activate();
    this._escapableOverlayController.connect();
    this._focusTrapController.focusInitialElement();
    this._focusTrapController.enabled = true;
    this.completeUpdate();
    this.dispatchOpenEvent();
  }

  // Removes trigger click listener on trigger change.
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
  }

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  private _resetMarkers(): void {
    const activeActions = Array.from(
      this.querySelectorAll(
        ':is(sbb-navigation-button, sbb-navigation-link):state(action-active):not(.sbb-active)',
      ),
    ) as (SbbNavigationButtonElement | SbbNavigationLinkElement)[];
    activeActions?.forEach((action) => action.marker?.reset());
  }

  private _handleNavigationClose(event: Event): void {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isCloseElement(el as HTMLElement))) {
      this.close();
    }
  }

  private _isCloseElement(element: HTMLElement): boolean {
    return (
      element.nodeName === 'A' ||
      (element.hasAttribute('sbb-navigation-close') && !element.hasAttribute('disabled'))
    );
  }

  // Check if the pointerdown event target is triggered on the navigation.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnNavigation =
      isEventOnElement(this._navigation, event) ||
      isEventOnElement(
        this.querySelector('sbb-navigation-section:state(state-opened)')?.shadowRoot?.querySelector(
          'nav.sbb-navigation-section',
        ) as HTMLElement,
        event,
      );
  };

  // Close navigation on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (!this._isPointerDownEventOnNavigation && !isEventOnElement(this._navigation, event)) {
      this.close();
    }
  };

  private _onNavigationResize(): void {
    if (this.state !== 'opened') {
      return;
    }

    if (this._resizeObserverTimeout) {
      clearTimeout(this._resizeObserverTimeout);
    }

    this.internals.states.add('resize-disable-animation');

    // Disable the animation when resizing the navigation to avoid strange height transition effects.
    this._resizeObserverTimeout = setTimeout(
      () => this.internals.states.delete('resize-disable-animation'),
      DEBOUNCE_TIME,
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.popover = 'manual';
    this.id ||= `sbb-navigation-${nextId++}`;
    if (this.hasUpdated) {
      this._configureTrigger();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._triggerElement = null;
    this._triggerAbortController?.abort();
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

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._configureTrigger();
  }

  protected override render(): TemplateResult {
    const closeButton = html`
      <sbb-transparent-button
        id="sbb-navigation-close-button"
        class="sbb-navigation__close"
        aria-label=${this.accessibilityCloseLabel || i18nCloseNavigation[this._language.current]}
        aria-controls="sbb-navigation-overlay"
        negative
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-navigation-close
      ></sbb-transparent-button>
    `;

    return html`
      <div class="sbb-navigation__container">
        <div
          id="sbb-navigation-overlay"
          @animationend=${this._onAnimationEnd}
          class="sbb-navigation"
          ${ref((navigationRef?: Element) => (this._navigation = navigationRef as HTMLDivElement))}
        >
          <div class="sbb-navigation__header">${closeButton}</div>
          <div class="sbb-navigation__wrapper">
            <div class="sbb-navigation__content">
              <slot></slot>
            </div>
          </div>
        </div>
        <slot name="navigation-section"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation': SbbNavigationElement;
  }
}
