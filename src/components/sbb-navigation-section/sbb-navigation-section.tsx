import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  assignId,
  getFirstFocusableElement,
  getFocusableElements,
  sbbInputModalityDetector,
} from '../../global/a11y';
import {
  findReferencedElement,
  isBreakpoint,
  isSafari,
  isValidAttribute,
  toggleDatasetEntry,
} from '../../global/dom';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';
import { i18nGoBack } from '../../global/i18n';
import {
  removeAriaOverlayTriggerAttributes,
  SbbOverlayState,
  setAriaOverlayTriggerAttributes,
} from '../../global/overlay';

let nextId = 0;

/**
 * @slot unnamed - Use this to project any content inside the navigation section.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-section.scss',
  tag: 'sbb-navigation-section',
})
export class SbbNavigationSection implements ComponentInterface {
  /*
   * The label to be shown before the action list.
   */
  @Prop() public titleContent?: string;

  /**
   * The element that will trigger the navigation section.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * This will be forwarded as aria-label to the dialog and is read as a title of the navigation-section.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-label to the back button element.
   */
  @Prop() public accessibilityBackLabel: string | undefined;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * The state of the navigation section.
   */
  @State() private _state: SbbOverlayState = 'closed';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('title');

  @State() private _currentLanguage = documentLanguage();

  @State() private _renderBackButton = this._isZeroToLargeBreakpoint();

  private _navigationSection: HTMLDialogElement;
  private _navigationSectionContainerElement: HTMLElement;
  private _triggerElement: HTMLElement;
  private _navigationSectionController: AbortController;
  private _windowEventsController: AbortController;
  private _navigationSectionId = `sbb-navigation-section-${++nextId}`;

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  /**
   * Opens the navigation section on trigger click.
   */
  @Method()
  public async open(): Promise<void> {
    if (this._state !== 'closed' || !this._navigationSection) {
      return;
    }

    this._state = 'opening';
    this._element.inert = true;
    this._renderBackButton = this._isZeroToLargeBreakpoint();
    this._navigationSection.show();
    this._triggerElement?.setAttribute('aria-expanded', 'true');
  }

  /**
   * Closes the navigation section.
   */
  @Method()
  public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    await this._resetMarker();
    this._state = 'closing';
    this._element.inert = true;
    this._triggerElement?.setAttribute('aria-expanded', 'false');
  }

  // Removes trigger click listener on trigger change.
  @Watch('trigger')
  public removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement,
  ): void {
    if (newValue !== oldValue) {
      this._navigationSectionController?.abort();
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
      this._element.id || this._navigationSectionId,
      this._state,
    );
    this._navigationSectionController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._navigationSectionController.signal,
    });
    this._element.addEventListener(
      'keydown',
      (event) => this._handleNavigationSectionFocus(event),
      { signal: this._navigationSectionController.signal },
    );
  }

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._state = 'opened';
      this._element.inert = false;
      this._attachWindowEvents();
      this._setNavigationSectionFocus();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._state = 'closed';
      this._navigationSectionContainerElement.scrollTo(0, 0);
      // Manually focus last focused element in order to avoid showing outline in Safari
      this._triggerElement?.focus();
      this._navigationSection.close();
      this._windowEventsController?.abort();
      this._isZeroToLargeBreakpoint() && this._triggerElement?.focus();
    }
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });

    // Close navigation section on action click or sbb-navigation-section-close click
    window.addEventListener('click', this._handleNavigationSectionClose, {
      signal: this._windowEventsController.signal,
    });

    window.addEventListener(
      'resize',
      () => {
        this._renderBackButton = this._isZeroToLargeBreakpoint();
      },
      { signal: this._windowEventsController.signal },
    );
  }

  // Check if the click was triggered on an element that should close the section.
  private _handleNavigationSectionClose = async (event: Event): Promise<void> => {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isCloseElement(el as HTMLElement))) {
      await this.close();
    }
  };

  private _isCloseElement(element: HTMLElement): boolean {
    // Check if the element is a navigation action belonging to the same group as the trigger.
    const isActionElement =
      element !== this._triggerElement &&
      element.nodeName === 'SBB-NAVIGATION-ACTION' &&
      element.parentElement === this._triggerElement.parentElement;

    return (
      isActionElement ||
      element.nodeName === 'A' ||
      (!isValidAttribute(element, 'disabled') &&
        (element.hasAttribute('sbb-navigation-close') ||
          element.hasAttribute('sbb-navigation-section-close')))
    );
  }

  private _isZeroToLargeBreakpoint(): boolean {
    return isBreakpoint('zero', 'large');
  }

  private async _resetMarker(): Promise<void> {
    if (this._isZeroToLargeBreakpoint()) {
      await (this._triggerElement?.parentElement as HTMLSbbNavigationMarkerElement)?.reset();
    }
  }

  // Closes the navigation on "Esc" key pressed.
  private async _onKeydownEvent(event: KeyboardEvent): Promise<void> {
    if (this._state === 'opened' && event.key === 'Escape') {
      await this.close();
    }
  }

  // Set focus on the first focusable element.
  private _setNavigationSectionFocus(): void {
    if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      getFirstFocusableElement(
        Array.from(this._element.children).filter(
          (e): e is HTMLElement => e instanceof window.HTMLElement,
        ),
      )?.focus();
    } else {
      // Focusing sbb-navigation__wrapper in order to provide a consistent behavior in Safari where else
      // the focus-visible styles would be incorrectly applied
      this._navigationSectionContainerElement.tabIndex = 0;
      this._navigationSectionContainerElement.focus();

      this._navigationSectionContainerElement.addEventListener(
        'blur',
        () => this._navigationSectionContainerElement.removeAttribute('tabindex'),
        { once: true },
      );
    }
  }

  private _handleNavigationSectionFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || this._isZeroToLargeBreakpoint()) {
      return;
    }

    // Dynamically get first and last focusable element, as this might have changed since opening overlay
    const navigationChildren: HTMLElement[] = Array.from(
      this._element.closest('sbb-navigation').shadowRoot.children,
    ) as HTMLElement[];
    const navigationFocusableElements = getFocusableElements(
      navigationChildren,
      (el) => el.nodeName === 'SBB-NAVIGATION-SECTION',
    );

    const sectionChildren: HTMLElement[] = Array.from(
      this._element.shadowRoot.children,
    ) as HTMLElement[];
    const sectionFocusableElements = getFocusableElements(sectionChildren);

    const firstFocusable = sectionFocusableElements[0] as HTMLElement;
    const lastFocusable = sectionFocusableElements[
      sectionFocusableElements.length - 1
    ] as HTMLElement;

    const elementToFocus = event.shiftKey
      ? this._triggerElement
      : navigationFocusableElements[navigationFocusableElements.indexOf(this._triggerElement) + 1];
    const pivot = event.shiftKey ? firstFocusable : lastFocusable;

    if (
      !!elementToFocus &&
      ((firstFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot ||
        (lastFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot)
    ) {
      elementToFocus.focus();
      event.preventDefault();
    }
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);

    // TODO: Remove if possible, related to https://bugs.chromium.org/p/chromium/issues/detail?id=1493323
    // For Safari we need to keep the solution which doesn't work in Chrome as it seems mutual exclusive.
    toggleDatasetEntry(this._element, 'isSafari', isSafari());
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
    this._navigationSectionController?.abort();
    this._windowEventsController?.abort();
  }

  public render(): JSX.Element {
    const backButton = (
      <sbb-button
        class="sbb-navigation-section__back"
        arial-label={this.accessibilityBackLabel || i18nGoBack[this._currentLanguage]}
        variant="transparent"
        negative={true}
        size="m"
        type="button"
        icon-name="chevron-small-left-small"
        sbb-navigation-section-close
      ></sbb-button>
    );

    const labelElement = (
      <div class="sbb-navigation-section__header">
        {this._renderBackButton && backButton}
        <span class="sbb-navigation-section__title" id="title">
          <slot name="title">{this.titleContent}</slot>
        </span>
      </div>
    );

    // Accessibility label should win over aria-labelledby
    let accessibilityAttributes: Record<string, string> = { 'aria-labelledby': 'title' };
    if (this.accessibilityLabel) {
      accessibilityAttributes = { 'aria-label': this.accessibilityLabel };
    }

    return (
      <Host
        slot="navigation-section"
        data-state={this._state}
        aria-hidden={this._state !== 'opened' ? 'true' : null}
        ref={assignId(() => this._navigationSectionId)}
      >
        <div
          class="sbb-navigation-section__container"
          ref={(el) => (this._navigationSectionContainerElement = el)}
        >
          <dialog
            ref={(navigationSectionRef) => (this._navigationSection = navigationSectionRef)}
            onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
            class="sbb-navigation-section"
            role="group"
            {...accessibilityAttributes}
          >
            <div class="sbb-navigation-section__wrapper">
              <div class="sbb-navigation-section__content">
                <sbb-divider
                  class="sbb-navigation-section__divider"
                  orientation="vertical"
                  negative
                />
                {(!!this.titleContent || this._namedSlots.title) && labelElement}
                <slot />
              </div>
            </div>
          </dialog>
        </div>
      </Host>
    );
  }
}
