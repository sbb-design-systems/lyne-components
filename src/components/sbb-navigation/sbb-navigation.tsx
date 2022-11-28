import {
  Component,
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
import { IS_FOCUSABLE_QUERY, FocusTrap } from '../../global/helpers/focus';

/**
 * @slot unnamed - Use this to project any content inside the navigation.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation.scss',
  tag: 'sbb-navigation',
})
export class SbbNavigation {
  /**
   * The element that will trigger the navigation.
   * Accepts both a string (id of an element) or an HTML element.
   */
  @Prop() public trigger: string | HTMLElement;

  /**
   * The state of the navigation.
   */
  @State() private _state: 'closed' | 'opening' | 'opened' | 'closing' = 'closed';

  /**
   * Emits whenever the navigation starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-navigation_will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the navigation is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-navigation_did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the navigation begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-navigation_will-close',
  })
  public willClose: EventEmitter<void>;

  /**
   * Emits whenever the navigation is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-navigation_did-close',
  })
  public didClose: EventEmitter<void>;

  private _dialog: HTMLDialogElement;
  private _triggerElement: HTMLElement;
  private _navigationController: AbortController;
  private _windowEventsController: AbortController;
  private _focusTrap = new FocusTrap();
  private _openedByKeyboard = false;

  @Element() private _element: HTMLElement;

  /**
   * Opens the navigation on trigger click.
   */
  @Method()
  public async open(): Promise<void> {
    if (this._state === 'closing' || !this._dialog) {
      return;
    }

    this.willOpen.emit();
    this._state = 'opening';
    this._dialog.show();
  }

  /**
   * Closes the navigation.
   */
  @Method()
  public async close(): Promise<void> {
    if (this._state === 'opening') {
      return;
    }

    this.willClose.emit();
    this._state = 'closing';
    this._openedByKeyboard = false;
  }

  // Removes trigger click listener on trigger change.
  @Watch('trigger')
  public removeTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement
  ): void {
    if (newValue !== oldValue) {
      this._navigationController?.abort();
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

    this._navigationController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._navigationController.signal,
    });
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'Space') {
          this._openedByKeyboard = true;
        }
      },
      { signal: this._navigationController.signal }
    );
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open') {
      this._state = 'opened';
      this.didOpen.emit();
      this._setDialogFocus();
      this._focusTrap.trap(this._element);
      this._attachWindowEvents();
    } else if (event.animationName === 'close') {
      this._state = 'closed';
      //this._dialog.firstElementChild.scrollTo(0, 0);
      this._dialog.close();
      this.didClose.emit();
      this._windowEventsController?.abort();
      this._focusTrap.disconnect();
    }
  }

  private _attachWindowEvents(): void {
    this._windowEventsController = new AbortController();
    window.addEventListener('keydown', (event: KeyboardEvent) => this._onKeydownEvent(event), {
      signal: this._windowEventsController.signal,
    });
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

  // Set focus on the first focusable element.
  private _setDialogFocus(): void {
    const firstFocusable = this._element.querySelector(IS_FOCUSABLE_QUERY) as HTMLElement;

    if (this._openedByKeyboard) {
      firstFocusable.focus();
    }
  }

  public connectedCallback(): void {
    // Validate trigger element and attach event listeners
    this._configure(this.trigger);
  }

  public disconnectedCallback(): void {
    this._navigationController?.abort();
    this._windowEventsController?.abort();
    this._focusTrap.disconnect();
  }

  public render(): JSX.Element {
    return (
      <Host
        class={{
          'sbb-navigation--opened': this._state === 'opened',
          'sbb-navigation--opening': this._state === 'opening',
          'sbb-navigation--closing': this._state === 'closing',
        }}
      >
        <dialog
          onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
          ref={(dialogRef) => (this._dialog = dialogRef)}
          class="sbb-navigation"
        >
          <div class="sbb-navigation__content">
            <slot />
          </div>
        </dialog>
      </Host>
    );
  }
}
