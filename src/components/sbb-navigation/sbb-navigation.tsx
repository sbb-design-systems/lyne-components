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
import { FocusTrap, assignId, setModalityOnNextFocus } from '../../global/a11y';
import { ScrollHandler, isValidAttribute, findReferencedElement } from '../../global/dom';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { i18nCloseNavigation } from '../../global/i18n';
import { AgnosticMutationObserver } from '../../global/observers';
import {
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
  isEventOnElement,
  SbbOverlayState,
  applyInertMechanism,
  removeInertMechanism,
} from '../../global/overlay';

/** Configuration for the attribute to look at if a navigation section is displayed */
const navigationObserverConfig: MutationObserverInit = {
  subtree: true,
  attributeFilter: ['data-state'],
};

let nextId = 0;

/**
 * @slot unnamed - Use this to project any content inside the navigation.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation.scss',
  tag: 'sbb-navigation',
})
export class SbbNavigation implements ComponentInterface {
  /**
   * The element that will trigger the navigation.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * This will be forwarded as aria-label to the close button element.
   */
  @Prop() public accessibilityCloseLabel: string | undefined;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * The state of the navigation.
   */
  @State() private _state: SbbOverlayState = 'closed';

  /**
   * Whether a navigation section is displayed.
   */
  @State() private _activeNavigationSection: HTMLElement;

  @State() private _currentLanguage = documentLanguage();

  /**
   * Emits whenever the navigation begins the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the navigation is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the navigation begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public willClose: EventEmitter<void>;

  /**
   * Emits whenever the navigation is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public didClose: EventEmitter<void>;

  private _navigation: HTMLDivElement;
  private _navigationContentElement: HTMLElement;
  private _triggerElement: HTMLElement;
  private _navigationController: AbortController;
  private _windowEventsController: AbortController;
  private _focusTrap = new FocusTrap();
  private _scrollHandler = new ScrollHandler();
  private _isPointerDownEventOnNavigation: boolean;
  private _navigationObserver = new AgnosticMutationObserver((mutationsList: MutationRecord[]) =>
    this._onNavigationSectionChange(mutationsList),
  );
  private _navigationId = `sbb-navigation-${++nextId}`;

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  /**
   * Opens the navigation.
   */
  @Method()
  public async open(): Promise<void> {
    if (this._state !== 'closed' || !this._navigation) {
      return;
    }

    this.willOpen.emit();
    this._state = 'opening';

    // Disable scrolling for content below the navigation
    this._scrollHandler.disableScroll();
    this._triggerElement?.setAttribute('aria-expanded', 'true');
  }

  /**
   * Closes the navigation.
   */
  @Method()
  public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    this.willClose.emit();
    this._state = 'closing';
    this._triggerElement?.setAttribute('aria-expanded', 'false');
  }

  // Removes trigger click listener on trigger change.
  @Watch('trigger')
  public removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement,
  ): void {
    if (newValue !== oldValue) {
      this._navigationController?.abort();
      this._windowEventsController?.abort();
      this._configure(this.trigger);
    }
  }

  // Check if the trigger is valid and attach click event listeners.
  private _configure(trigger: string | HTMLElement): void {
    removeAriaOverlayTriggerAttributes(this._triggerElement);

    if (!trigger) {
      return;
    }

    this._triggerElement = findReferencedElement(trigger);

    if (!this._triggerElement) {
      return;
    }

    setAriaOverlayTriggerAttributes(
      this._triggerElement,
      'menu',
      this._element.id || this._navigationId,
      this._state,
    );
    this._navigationController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._navigationController.signal,
    });
  }

  private _trapFocusFilter = (el: HTMLElement): boolean => {
    return el.nodeName === 'SBB-NAVIGATION-SECTION' && el.getAttribute('data-state') !== 'opened';
  };

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._state = 'opened';
      this.didOpen.emit();
      applyInertMechanism(this._element);
      this._focusTrap.trap(this._element, this._trapFocusFilter);
      this._attachWindowEvents();
      this._setNavigationFocus();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._state = 'closed';
      this._navigationContentElement.scrollTo(0, 0);
      setModalityOnNextFocus(this._triggerElement);
      removeInertMechanism();
      // To enable focusing other element than the trigger, we need to call focus() a second time.
      this._triggerElement?.focus();
      this.didClose.emit();
      this._windowEventsController?.abort();
      this._focusTrap.disconnect();

      // Enable scrolling for content below the navigation
      this._scrollHandler.enableScroll();
    }
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });
  }

  @Listen('click')
  public async handleNavigationClose(event: Event): Promise<void> {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isCloseElement(el as HTMLElement))) {
      await this.close();
    }
  }

  private _isCloseElement(element: HTMLElement): boolean {
    return (
      element.nodeName === 'A' ||
      (element.hasAttribute('sbb-navigation-close') && !isValidAttribute(element, 'disabled'))
    );
  }

  // Closes the navigation on "Esc" key pressed.
  private async _onKeydownEvent(event: KeyboardEvent): Promise<void> {
    if (this._state === 'opened' && event.key === 'Escape') {
      await this.close();
    }
  }

  // Set focus on the first focusable element.
  private _setNavigationFocus(): void {
    const closeButton = this._element.shadowRoot.querySelector(
      '#sbb-navigation-close-button',
    ) as HTMLElement;
    setModalityOnNextFocus(closeButton);
    closeButton.focus();
  }

  // Check if the pointerdown event target is triggered on the navigation.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnNavigation =
      isEventOnElement(this._navigation, event) ||
      isEventOnElement(
        this._element
          .querySelector('sbb-navigation-section[data-state="opened"]')
          ?.shadowRoot.querySelector('nav.sbb-navigation-section') as HTMLElement,
        event,
      );
  };

  // Close navigation on backdrop click.
  private _closeOnBackdropClick = async (event: PointerEvent): Promise<void> => {
    if (!this._isPointerDownEventOnNavigation && !isEventOnElement(this._navigation, event)) {
      await this.close();
    }
  };

  // Observe changes on navigation section data-state.
  private _onNavigationSectionChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if ((mutation.target as HTMLElement).nodeName === 'SBB-NAVIGATION-SECTION') {
        this._activeNavigationSection = this._element.querySelector(
          'sbb-navigation-section[data-state="opening"], sbb-navigation-section[data-state="opened"]',
        );
      }
    }
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
    this._navigationObserver.observe(this._element, navigationObserverConfig);

    if (this._state === 'opened') {
      applyInertMechanism(this._element);
    }
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._navigationController?.abort();
    this._windowEventsController?.abort();
    this._focusTrap.disconnect();
    this._navigationObserver.disconnect();
    removeInertMechanism();
  }

  public render(): JSX.Element {
    const closeButton = (
      <sbb-button
        id="sbb-navigation-close-button"
        class="sbb-navigation__close"
        aria-label={this.accessibilityCloseLabel || i18nCloseNavigation[this._currentLanguage]}
        aria-controls="sbb-navigation-overlay"
        variant="transparent"
        negative={true}
        size="m"
        type="button"
        icon-name="cross-small"
        sbb-navigation-close
      ></sbb-button>
    );
    return (
      <Host
        role="navigation"
        data-has-navigation-section={!!this._activeNavigationSection}
        data-state={this._state}
        ref={assignId(() => this._navigationId)}
        onPointerUp={(event) => this._closeOnBackdropClick(event)}
        onPointerDown={(event) => this._pointerDownListener(event)}
      >
        <div class="sbb-navigation__container">
          <div
            ref={(navigationRef) => (this._navigation = navigationRef)}
            id="sbb-navigation-overlay"
            onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
            class="sbb-navigation"
          >
            <div class="sbb-navigation__header">{closeButton}</div>
            <div class="sbb-navigation__wrapper">
              <div
                class="sbb-navigation__content"
                ref={(el) => (this._navigationContentElement = el)}
              >
                <slot />
              </div>
            </div>
          </div>
          <slot name="navigation-section" />
        </div>
      </Host>
    );
  }
}
