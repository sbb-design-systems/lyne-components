import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  IS_FOCUSABLE_QUERY,
  SbbFocusTrapController,
  sbbInputModalityDetector,
} from '../../core/a11y.ts';
import {
  SbbLanguageController,
  SbbMediaMatcherController,
  SbbMediaQueryBreakpointLargeAndBelow,
} from '../../core/controllers.ts';
import { forceType, idReference, omitEmptyConverter } from '../../core/decorators.ts';
import { isBreakpoint, isZeroAnimationDuration } from '../../core/dom.ts';
import { i18nGoBack } from '../../core/i18n.ts';
import type { SbbOpenedClosedState } from '../../core/interfaces.ts';
import {
  SbbElementInternalsMixin,
  SbbUpdateSchedulerMixin,
  ɵstateController,
} from '../../core/mixins.ts';
import {
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../../core/overlay.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbNavigationButtonElement } from '../navigation-button.ts';
import type { SbbNavigationLinkElement } from '../navigation-link.ts';
import type { SbbNavigationElement } from '../navigation.ts';

import style from './navigation-section.scss?lit&inline';

import '../../button/transparent-button.ts';
import '../../divider.ts';

let nextId = 0;

/**
 * It can be used as a container for `sbb-navigation-list` within a `sbb-navigation`.
 *
 * @slot - Use the unnamed slot to add content into the `sbb-navigation-section`.
 */
export
@customElement('sbb-navigation-section')
class SbbNavigationSectionElement extends SbbUpdateSchedulerMixin(
  SbbElementInternalsMixin(LitElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /**
   * The label to be shown before the action list.
   */
  @forceType()
  @property({ attribute: 'title-content', reflect: true, converter: omitEmptyConverter })
  public accessor titleContent: string = '';

  /**
   * The element that will trigger the navigation section.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLElement | null = null;

  /**
   * This will be forwarded as aria-label to the nav element and is read as a title of the navigation-section.
   */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /**
   * This will be forwarded as aria-label to the back button element.
   */
  @forceType()
  @property({ attribute: 'accessibility-back-label' })
  public accessor accessibilityBackLabel: string = '';

  /** The state of the component. */
  private set _state(state: SbbOpenedClosedState) {
    this.applyStatePattern(state);
    this.ariaHidden = this._state !== 'opened' ? 'true' : null;
  }
  private get _state(): SbbOpenedClosedState {
    return (
      (Array.from(this.internals.states)
        .find((s) => s.startsWith('state-'))
        ?.replace('state-', '') as SbbOpenedClosedState) ?? 'closed'
    );
  }

  private _firstLevelNavigation?: SbbNavigationElement | null = null;
  private _triggerElement: HTMLElement | null = null;
  private _triggerAbortController!: AbortController;
  private _windowEventsController!: AbortController;
  private _language = new SbbLanguageController(this);
  private _focusTrapController = new SbbFocusTrapController(this);
  private _lastKeydownEvent: KeyboardEvent | null = null;

  public constructor() {
    super();
    if (this._state === 'closed') {
      this._state = 'closed';
    }

    this.addController(
      new SbbMediaMatcherController(this, {
        [SbbMediaQueryBreakpointLargeAndBelow]: (matches) => {
          if (this._state !== 'closed') {
            this._setNavigationInert(matches);
          }
        },
      }),
    );

    this.addEventListener?.('keydown', (e) => {
      this._lastKeydownEvent = e;
    });

    this.addEventListener?.('focusout', (e) => {
      if (
        e.relatedTarget instanceof HTMLElement &&
        !this.contains(e.relatedTarget) &&
        sbbInputModalityDetector.mostRecentModality === 'keyboard' &&
        this._lastKeydownEvent?.key === 'Tab' &&
        this._triggerElement
      ) {
        const navigationElement = this.closest<SbbNavigationElement>('sbb-navigation');
        const focusableElements = Array.from(
          navigationElement?.querySelectorAll<HTMLElement>(IS_FOCUSABLE_QUERY) ?? [],
        ).filter((e) => !this.contains(e));

        if (this._lastKeydownEvent.shiftKey || !focusableElements.length) {
          this._triggerElement?.focus();
        } else {
          const triggerIndex = focusableElements.indexOf(this._triggerElement);
          (focusableElements[triggerIndex + 1] ?? navigationElement!.closeButton)?.focus();
        }
      }
    });
  }

  /**
   * Opens the navigation section on trigger click.
   */
  public open(): void {
    if (this._state !== 'closed' || !this.hasUpdated) {
      return;
    }

    if (this._isNavigationButton(this._triggerElement)) {
      this._triggerElement?.marker?.select(this._triggerElement);
    }

    this._closePreviousNavigationSection();
    this._state = 'opening';
    this.startUpdate();
    this.inert = true;
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-navigation-section-animation-duration');
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this.inert = false;
    this._attachWindowEvents();
    this._setNavigationInert();
    this._focusTrapController.focusInitialElement();
    this._checkActiveAction();
    this.completeUpdate();
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this.shadowRoot?.querySelector('.sbb-navigation-section__container')?.scrollTo(0, 0);
    this._windowEventsController?.abort();
    this._resetLists();
    this._setNavigationInert();
    if (this._isBelowLarge() && this._triggerElement) {
      this._triggerElement.focus();
    }
    this.completeUpdate();
  }

  private _closePreviousNavigationSection(): void {
    this._firstLevelNavigation?.activeNavigationSection?.close();
  }

  /**
   * Closes the navigation section.
   */
  public close(): void {
    if (this._state !== 'opened') {
      return;
    }

    this._state = 'closing';
    this.startUpdate();
    this.inert = true;
    this._triggerElement?.setAttribute('aria-expanded', 'false');

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
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

    setAriaOverlayTriggerAttributes(this._triggerElement, 'menu', this.id, this._state);
    this._triggerAbortController = new AbortController();
    if (this._isNavigationButton(this._triggerElement)) {
      this._triggerElement.connectedSection = this;
    }
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._triggerAbortController.signal,
    });
    this._firstLevelNavigation = this._triggerElement?.closest?.('sbb-navigation');
  }

  private _isNavigationButton(trigger: HTMLElement | null): trigger is SbbNavigationButtonElement {
    return trigger?.localName === 'sbb-navigation-button';
  }

  private _setNavigationInert(isBelowLarge: boolean = this._isBelowLarge()): void {
    const navigationContent = this._firstLevelNavigation?.navigationContent;
    if (navigationContent) {
      navigationContent.inert = isBelowLarge && this._state !== 'closed';
    }
  }

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._handleClosing();
    }
  }

  private _resetLists(): void {
    Array.from(
      this.querySelectorAll<SbbNavigationButtonElement | SbbNavigationLinkElement>(
        ':state(section-action):state(action-active)',
      ) ?? [],
    ).forEach((action) => ɵstateController(action).delete('action-active'));
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
  }

  // Check if the click was triggered on an element that should close the section.
  private _handleNavigationSectionClose = (event: Event): void => {
    if (
      event
        .composedPath()
        .filter((el) => el instanceof HTMLElement)
        .some((el) => this._isCloseElement(el))
    ) {
      this.close();
    }
  };

  private _isCloseElement(element: HTMLElement): boolean {
    return (
      element.nodeName === 'A' ||
      (!element.hasAttribute('disabled') &&
        (element.hasAttribute('sbb-navigation-close') ||
          element.hasAttribute('sbb-navigation-section-close')))
    );
  }

  private _isBelowLarge(): boolean {
    return isBreakpoint('zero', 'large') ?? false;
  }

  // Closes the navigation on "Esc" key pressed.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state === 'opened' && event.key === 'Escape') {
      this.close();
    }
  }

  private _checkActiveAction(): void {
    const element = this.querySelector<SbbNavigationButtonElement | SbbNavigationLinkElement>(
      ':is(sbb-navigation-button, sbb-navigation-link).sbb-active',
    );
    ɵstateController(element)?.toggle('action-active', true);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'navigation-section';
    this.id ||= `sbb-navigation-section-${nextId++}`;
    if (this.hasUpdated) {
      this._configureTrigger();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._triggerElement = null;
    this._triggerAbortController?.abort();
    this._windowEventsController?.abort();
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
    return html`
      <div class="sbb-navigation-section__container">
        <nav
          @animationend=${this._onAnimationEnd}
          class="sbb-navigation-section"
          aria-labelledby=${!this.accessibilityLabel ? 'title' : nothing}
          aria-label=${this.accessibilityLabel ? this.accessibilityLabel : nothing}
        >
          <div class="sbb-navigation-section__wrapper">
            <div class="sbb-navigation-section__content">
              <div class="sbb-navigation-section__header">
                <!-- Back button -->
                <sbb-transparent-button
                  id="sbb-navigation-section-back-button"
                  class="sbb-navigation-section__back"
                  aria-label=${this.accessibilityBackLabel || i18nGoBack[this._language.current]}
                  negative
                  size="m"
                  type="button"
                  icon-name="chevron-small-left-small"
                  sbb-navigation-section-close
                ></sbb-transparent-button>

                <span class="sbb-navigation-section__title" id="title">
                  <slot name="title">${this.titleContent}</slot>
                </span>
              </div>
              <slot></slot>
            </div>
          </div>
        </nav>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-section': SbbNavigationSectionElement;
  }
}
