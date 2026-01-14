import { isServer, type PropertyDeclaration, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbFocusTrapController } from '../core/a11y.ts';
import { type SbbButtonBaseElement, SbbOpenCloseBaseElement } from '../core/base-elements.ts';
import {
  SbbEscapableOverlayController,
  SbbInertController,
  SbbLanguageController,
} from '../core/controllers.ts';
import { forceType, idReference } from '../core/decorators.ts';
import { SbbScrollHandler } from '../core/dom.ts';
import { i18nDialog } from '../core/i18n.ts';
import type { SbbOverlayCloseEventDetails } from '../core/interfaces.ts';
import { SbbNegativeMixin } from '../core/mixins.ts';
import {
  removeAriaOverlayTriggerAttributes,
  setAriaOverlayTriggerAttributes,
} from '../core/overlay.ts';
import type { SbbScreenReaderOnlyElement } from '../screen-reader-only.ts';

const overlayResultMap = new WeakMap<HTMLElement, any>();

export class SbbOverlayCloseEvent<T = any> extends CustomEvent<SbbOverlayCloseEventDetails> {
  /**
   * The result associated with the closed overlay.
   * This is either the result assigned to the `closeTarget` via
   * `assignOverlayResult` / `assignDialogResult` or the value of the
   * corresponding close attribute on the `closeTarget`
   * (e.g. sbb-overlay-close="my-result" or sbb-dialog-close="my-result").
   */
  public readonly result: T | null;

  /**
   * The element that was used to close the overlay/dialog, i.e. the element that the
   * user clicked on that had the close attribute.
   * Empty if closed programmatically or via Escape press.
   */
  public readonly closeTarget: HTMLElement | null;

  public constructor(
    name: string,
    {
      closeAttribute,
      cancelable,
      ...detail
    }: { closeAttribute: string; cancelable?: boolean } & SbbOverlayCloseEventDetails,
  ) {
    super(name, { cancelable, detail });

    this.result = !detail.closeTarget
      ? null
      : (overlayResultMap.get(detail.closeTarget) ??
        (detail.closeTarget.getAttribute(closeAttribute)?.trim() || null));
    this.closeTarget = detail.closeTarget ?? null;
  }
}

export function assignOverlayResult<T>(element: HTMLElement, result: T): void {
  overlayResultMap.set(element, result);
}

// Check if the target is a submission element within a form and return the form, if present

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
   * Note that automatic focus restoration is an accessibility feature, and it is recommended that
   * you provide your own equivalent, if you decide to turn it off.
   */
  @forceType()
  @property({ type: Boolean })
  public accessor skipFocusRestoration: boolean = false;

  // The last element which had focus before the component was opened.
  protected lastFocusedElement?: HTMLElement;
  protected overlayCloseElement?: HTMLElement;
  protected openOverlayController?: AbortController;
  protected focusTrapController = new SbbFocusTrapController(this);
  protected scrollHandler = new SbbScrollHandler();
  protected returnValue: any;
  protected language = new SbbLanguageController(this);
  protected inertController = new SbbInertController(this);
  protected escapableOverlayController = new SbbEscapableOverlayController(this);

  private _ariaLiveRefToggle = false;
  private _ariaLiveRef?: SbbScreenReaderOnlyElement;
  private _triggerElement: HTMLElement | null = null;
  private _triggerAbortController?: AbortController;

  protected abstract closeAttribute: string;
  protected closeTag?: string;
  protected abstract handleOpening(): void;
  protected abstract handleClosing(): void;
  protected abstract isZeroAnimationDuration(): boolean;
  protected abstract override dispatchBeforeCloseEvent(
    detail?: SbbOverlayCloseEventDetails,
  ): boolean;

  protected abstract override dispatchCloseEvent(detail?: SbbOverlayCloseEventDetails): boolean;

  /** Opens the component. */
  public open(): void {
    if (
      this.state === 'opening' ||
      this.state === 'opened' ||
      this._hasClosedParent() ||
      !this.dispatchBeforeOpenEvent()
    ) {
      return;
    }

    this.lastFocusedElement = document.activeElement as HTMLElement;

    this.showPopover?.();
    this.state = 'opening';
    this._triggerElement?.setAttribute('aria-expanded', 'true');

    // Add this overlay to the global collection
    overlayRefs.push(this);

    this.scrollHandler.disableScroll();
    this.escapableOverlayController.connect();
    this.attachOpenOverlayEvents();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this.isZeroAnimationDuration()) {
      this.handleOpening();
    }
  }

  /** Closes the component. */
  public close(result?: any, target?: HTMLElement): any {
    if (this.state === 'closing' || this.state === 'closed') {
      return;
    }

    this.returnValue = result;
    this.overlayCloseElement = target;
    const eventData: SbbOverlayCloseEventDetails = {
      returnValue: this.returnValue,
      closeTarget: this.overlayCloseElement,
    };

    if (!this.dispatchBeforeCloseEvent(eventData)) {
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

  /**
   * Check if there is a parent dialog or overlay in the DOM that is closed.
   * In this case, the overlay should not be opened because it would break the state.
   * Not nested but stacked overlays are supported so this logic does not apply in this case.
   */
  private _hasClosedParent(): boolean {
    const parentDialog =
      this.parentElement?.closest<SbbOverlayBaseElement>('sbb-dialog, sbb-overlay');

    return (parentDialog?.state === 'closed' || parentDialog?.state === 'closing') ?? false;
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

    // If the component is already open on firstUpdate, fix the focus
    if (this.isOpen) {
      // TODO: find better solution
      // Problem: content's shadow DOM not yet ready, so focusing is impossible.
      setTimeout(() => {
        this.focusTrapController.focusInitialElement();
      }, 0);
    }
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
    const indexInOverlayRefs = overlayRefs.indexOf(this as SbbOverlayBaseElement);
    if (indexInOverlayRefs > -1) {
      overlayRefs.splice(indexInOverlayRefs, 1);
    }
  }

  // Close the component on click of any element that has the `closeAttribute` attribute.
  protected closeOnSbbOverlayCloseClick(event: Event): void {
    const overlayCloseElement = event
      .composedPath()
      .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
      .find(
        (target) =>
          (target.hasAttribute(this.closeAttribute) || target.localName === this.closeTag) &&
          !target.hasAttribute('disabled'),
      );

    if (
      !overlayCloseElement ||
      (overlayCloseElement.closest(this.localName) !== this &&
        !this.shadowRoot?.contains(overlayCloseElement))
    ) {
      return;
    }

    // Check if the target is a submission element within a form and return the form, if present
    const closestForm =
      overlayCloseElement.getAttribute('type') === 'submit'
        ? ((overlayCloseElement as HTMLButtonElement | SbbButtonBaseElement).form ?? null)
        : null;
    if (overlayRefs.length) {
      overlayRefs[overlayRefs.length - 1].close(closestForm, overlayCloseElement);
    }
  }

  protected removeAriaLiveRefContent(): void {
    if (!this._ariaLiveRef) {
      return;
    }
    this._ariaLiveRef.textContent = '';
  }

  protected setAriaLiveRefContent(label?: string): void {
    if (!this._ariaLiveRef) {
      return;
    }

    this._ariaLiveRefToggle = !this._ariaLiveRefToggle;

    // If the text content remains the same, on VoiceOver the aria-live region is not announced a second time.
    // In order to support reading on every opening, we toggle an invisible space.
    this._ariaLiveRef.textContent = `${i18nDialog[this.language.current]}${
      label ? `, ${label}` : ''
    }${this._ariaLiveRefToggle ? ' ' : ''}`;
  }

  // Wait for dialog transition to complete.
  // In rare cases, it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  protected onOverlayAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this.handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this.handleClosing();
    }
  }
}
