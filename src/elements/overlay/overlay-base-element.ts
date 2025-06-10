import { isServer, type PropertyDeclaration, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbFocusTrapController } from '../core/a11y.js';
import { type SbbButtonBaseElement, SbbOpenCloseBaseElement } from '../core/base-elements.js';
import {
  SbbEscapableOverlayController,
  SbbInertController,
  SbbLanguageController,
} from '../core/controllers.js';
import { forceType, idReference } from '../core/decorators.js';
import { SbbScrollHandler } from '../core/dom.js';
import { EventEmitter } from '../core/eventing.js';
import { i18nDialog } from '../core/i18n.js';
import type { SbbOverlayCloseEventDetails } from '../core/interfaces.js';
import { SbbNegativeMixin } from '../core/mixins.js';
import {
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../core/overlay.js';
import type { SbbScreenReaderOnlyElement } from '../screen-reader-only.js';

// A global collection of existing overlays.
export const overlayRefs: SbbOverlayBaseElement[] = [];

export abstract class SbbOverlayBaseElement extends SbbNegativeMixin(SbbOpenCloseBaseElement) {
  /**
   * The element that will trigger the menu overlay.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property()
  public accessor trigger: HTMLElement | null = null;

  /** This will be forwarded as aria-label to the relevant nested element to describe the purpose of the overlay. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /**
   * Whether to skip restoring focus to the previously-focused element when the overlay is closed.
   * Note that automatic focus restoration is an accessibility feature and it is recommended that
   * you provide your own equivalent, if you decide to turn it off.
   */
  @forceType()
  @property({ type: Boolean })
  public accessor skipFocusRestoration: boolean = false;

  /** Emits whenever the component is closed. */
  protected override didClose: EventEmitter<SbbOverlayCloseEventDetails> = new EventEmitter(
    this,
    SbbOverlayBaseElement.events.didClose,
    { cancelable: true },
  );

  // The last element which had focus before the component was opened.
  protected lastFocusedElement?: HTMLElement;
  protected overlayCloseElement?: HTMLElement;
  protected openOverlayController!: AbortController;
  protected focusTrapController = new SbbFocusTrapController(this);
  protected scrollHandler = new SbbScrollHandler();
  protected returnValue: any;
  protected language = new SbbLanguageController(this);
  protected inertController = new SbbInertController(this);
  protected escapableOverlayController = new SbbEscapableOverlayController(this);

  private _ariaLiveRefToggle = false;
  private _ariaLiveRef!: SbbScreenReaderOnlyElement;
  private _triggerElement: HTMLElement | null = null;
  private _triggerAbortController!: AbortController;

  protected abstract closeAttribute: string;
  protected abstract onOverlayAnimationEnd(event: AnimationEvent): void;
  protected abstract handleOpening(): void;
  protected abstract handleClosing(): void;
  protected abstract isZeroAnimationDuration(): boolean;

  /** Opens the component. */
  public open(): void {
    if (this.state !== 'closed') {
      return;
    }
    this.lastFocusedElement = document.activeElement as HTMLElement;

    if (!this.willOpen.emit()) {
      return;
    }

    this.showPopover?.();
    this.state = 'opening';
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // Add this overlay to the global collection
    overlayRefs.push(this);

    // Disable scrolling for content below the overlay
    this.scrollHandler.disableScroll();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this.isZeroAnimationDuration()) {
      this.handleOpening();
    }
  }

  /** Closes the component. */
  public close(result?: any, target?: HTMLElement): any {
    if (this.state !== 'opened') {
      return;
    }

    this.returnValue = result;
    this.overlayCloseElement = target;
    const eventData: SbbOverlayCloseEventDetails = {
      returnValue: this.returnValue,
      closeTarget: this.overlayCloseElement,
    };

    if (!this.willClose.emit(eventData)) {
      return;
    }
    this.state = 'closing';
    this._triggerElement?.setAttribute('aria-expanded', 'false');
    this.removeAriaLiveRefContent();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this.isZeroAnimationDuration()) {
      this.handleClosing();
    }
  }

  public override connectedCallback(): void {
    this.popover = 'manual';
    super.connectedCallback();
    if (this.hasUpdated) {
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

    setAriaOverlayTriggerAttributes(this._triggerElement, 'dialog', this.id, this.state);
    this._triggerAbortController = new AbortController();
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._triggerAbortController.signal,
    });
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._ariaLiveRef =
      this.shadowRoot!.querySelector<SbbScreenReaderOnlyElement>('sbb-screen-reader-only')!;
    this._configureTrigger();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.openOverlayController?.abort();
    this.removeInstanceFromGlobalCollection();
    this.scrollHandler.enableScroll();
    this._triggerElement = null;
    this._triggerAbortController?.abort();
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

  protected attachOpenOverlayEvents(): void {
    this.openOverlayController = new AbortController();
    // Remove overlay label as soon as it is not needed any more to prevent accessing it with browse mode.
    window.addEventListener(
      'keydown',
      () => {
        this.removeAriaLiveRefContent();
      },
      {
        signal: this.openOverlayController.signal,
      },
    );
    window.addEventListener('click', () => this.removeAriaLiveRefContent(), {
      signal: this.openOverlayController.signal,
    });
  }

  protected removeInstanceFromGlobalCollection(): void {
    overlayRefs.splice(overlayRefs.indexOf(this as SbbOverlayBaseElement), 1);
  }

  // Close the component on click of any element that has the `closeAttribute` attribute.
  protected closeOnSbbOverlayCloseClick(event: Event): void {
    const overlayCloseElement = event
      .composedPath()
      .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
      .find(
        (target) => target.hasAttribute(this.closeAttribute) && !target.hasAttribute('disabled'),
      );

    if (!overlayCloseElement) {
      return;
    }

    // Check if the target is a submission element within a form and return the form, if present
    const closestForm =
      overlayCloseElement.getAttribute('type') === 'submit'
        ? ((overlayCloseElement as HTMLButtonElement | SbbButtonBaseElement).form ?? null)
        : null;
    overlayRefs[overlayRefs.length - 1].close(closestForm, overlayCloseElement);
  }

  protected removeAriaLiveRefContent(): void {
    this._ariaLiveRef.textContent = '';
  }

  protected setAriaLiveRefContent(label?: string): void {
    this._ariaLiveRefToggle = !this._ariaLiveRefToggle;

    // If the text content remains the same, on VoiceOver the aria-live region is not announced a second time.
    // In order to support reading on every opening, we toggle an invisible space.
    this._ariaLiveRef.textContent = `${i18nDialog[this.language.current]}${
      label ? `, ${label}` : ''
    }${this._ariaLiveRefToggle ? ' ' : ''}`;
  }
}
