import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import getDocumentLang from '../../global/helpers/get-document-lang';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { i18nGoBack } from '../../global/i18n';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

/**
 * @slot unnamed - Use this to project any content inside the navigation.
 */

let nextId = 0;

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-section.scss',
  tag: 'sbb-navigation-section',
})
export class SbbNavigationSection implements ComponentInterface, AccessibilityProperties {
  /**
   * This id will be forwarded to the relevant inner element.
   */
  @Prop() public navigationSectionId = `sbb-navigation-section-${++nextId}`;

  /*
   * This id will be forwarded to the relevant inner element.
   */
  @Prop() public titleId = `sbb-navigation-section-title-${++nextId}`;

  /*
   * The label to be shown before the action list.
   */
  @Prop() public titleContent?: string;

  /*
   * The semantic level of the title, e.g. 2 = h2.
   */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'] = '2';

  /**
   * The element that will trigger the navigation section.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string | undefined;

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
  @State() private _state: 'closed' | 'opening' | 'opened' | 'closing' = 'closed';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('title');

  /**
   * Emits whenever the navigation section is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public didClose: EventEmitter<void>;

  private _navigationSection: HTMLDialogElement;
  private _navigationSectionWrapperElement: HTMLElement;
  private _triggerElement: HTMLElement;
  private _navigationSectionController: AbortController;
  private _windowEventsController: AbortController;
  private _hasTitle = false;
  private _currentLanguage = getDocumentLang();

  @Element() private _element: HTMLElement;

  /**
   * Opens the navigation section on trigger click.
   */
  @Method()
  public async open(): Promise<void> {
    if (this._state !== 'closed' || !this._navigationSection) {
      return;
    }

    this._state = 'opening';
    this._navigationSection.show();
  }

  /**
   * Closes the navigation section.
   */
  @Method()
  public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    this._state = 'closing';
  }

  // Removes trigger click listener on trigger change.
  @Watch('trigger')
  public removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement
  ): void {
    if (newValue !== oldValue) {
      this._navigationSectionController?.abort();
      this._windowEventsController?.abort();
      this._configure(this.trigger);
    }
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

    this._navigationSectionController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._navigationSectionController.signal,
    });
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open') {
      this._state = 'opened';
      this._attachWindowEvents();
    } else if (event.animationName === 'close') {
      this._state = 'closed';
      this._navigationSectionWrapperElement.scrollTo(0, 0);
      this._navigationSection.close();
      this.didClose.emit();
      this._windowEventsController?.abort();
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
  }

  private _handleNavigationSectionClose = (event: Event): void => {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isCloseElement(el as HTMLElement))) {
      this.close();
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
      (element.hasAttribute('sbb-navigation-close') && !element.hasAttribute('disabled')) ||
      (element.hasAttribute('sbb-navigation-section-close') && !element.hasAttribute('disabled'))
    );
  }

  // Closes the navigation on "Esc" key pressed.
  private _onKeydownEvent(event: KeyboardEvent): void {
    if (this._state !== 'opened') {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
      return;
    }
  }

  public connectedCallback(): void {
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._hasTitle = !!this.titleContent || this._namedSlots['label'];
  }

  public disconnectedCallback(): void {
    this._navigationSectionController?.abort();
    this._windowEventsController?.abort();
  }

  public render(): JSX.Element {
    const backButton = (
      <sbb-button
        class="sbb-navigation-section__back"
        accessibility-label={this.accessibilityBackLabel || i18nGoBack[this._currentLanguage]}
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
        {backButton}
        <span class="sbb-navigation-section__title">
          <slot name="title">{this.titleContent}</slot>
        </span>
      </div>
    );
    return (
      <Host
        class={{
          'sbb-navigation-section--opened': this._state === 'opened',
          'sbb-navigation-section--opening': this._state === 'opening',
          'sbb-navigation-section--closing': this._state === 'closing',
        }}
        slot="navigation-section"
      >
        <dialog
          ref={(navigationSectionRef) => (this._navigationSection = navigationSectionRef)}
          id={this.navigationSectionId}
          aria-label={this.accessibilityLabel}
          onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
          class="sbb-navigation-section"
        >
          <div
            ref={(navigationSectionWrapperRef) =>
              (this._navigationSectionWrapperElement = navigationSectionWrapperRef)
            }
            class="sbb-navigation-section__wrapper"
          >
            <div class="sbb-navigation-section__content">
              {this._hasTitle && labelElement}
              <slot />
            </div>
          </div>
        </dialog>
      </Host>
    );
  }
}
