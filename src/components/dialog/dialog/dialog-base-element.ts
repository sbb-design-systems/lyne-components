import { LitElement, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbFocusHandler } from '../../core/a11y.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { hostContext, SbbScrollHandler } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nDialog } from '../../core/i18n.js';
import type { SbbDialogCloseEventDetails, SbbOpenedClosedState } from '../../core/interfaces.js';
import { SbbNegativeMixin } from '../../core/mixins.js';
import { applyInertMechanism, removeInertMechanism } from '../../core/overlay.js';
import type { SbbScreenReaderOnlyElement } from '../../screen-reader-only.js';

// A global collection of existing dialogs
export const dialogRefs: SbbDialogBaseElement[] = [];

export abstract class SbbDialogBaseElement extends SbbNegativeMixin(LitElement) {
  public static readonly events = {
    willOpen: 'willOpen',
    didOpen: 'didOpen',
    willClose: 'willClose',
    didClose: 'didClose',
  } as const;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /** The state of the overlay. */
  protected set state(state: SbbOpenedClosedState) {
    this.setAttribute('data-state', state);
  }
  protected get state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  /** Emits whenever the `sbb-dialog` starts the opening transition. */
  protected willOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbDialogBaseElement.events.willOpen,
  );

  /** Emits whenever the `sbb-dialog` is opened. */
  protected didOpen: EventEmitter<void> = new EventEmitter(
    this,
    SbbDialogBaseElement.events.didOpen,
  );

  /** Emits whenever the `sbb-dialog` begins the closing transition. */
  protected willClose: EventEmitter = new EventEmitter(this, SbbDialogBaseElement.events.willClose);

  /** Emits whenever the `sbb-dialog` is closed. */
  protected didClose: EventEmitter<SbbDialogCloseEventDetails> = new EventEmitter(
    this,
    SbbDialogBaseElement.events.didClose,
  );

  // The last element which had focus before the dialog was opened.
  protected lastFocusedElement?: HTMLElement;
  protected dialogCloseElement?: HTMLElement;
  protected dialogController!: AbortController;
  protected openDialogController!: AbortController;
  protected focusHandler = new SbbFocusHandler();
  protected scrollHandler = new SbbScrollHandler();
  protected returnValue: any;
  protected ariaLiveRefToggle = false;
  protected ariaLiveRef!: SbbScreenReaderOnlyElement;
  protected language = new SbbLanguageController(this);

  /** Opens the dialog element. */
  public abstract open(): void;
  protected abstract onDialogAnimationEnd(event: AnimationEvent): void;
  protected abstract setDialogFocus(): void;
  protected abstract closeAttribute: string;

  /** Closes the dialog element. */
  public close(result?: any, target?: HTMLElement): any {
    if (this.state !== 'opened') {
      return;
    }

    this.returnValue = result;
    this.dialogCloseElement = target;
    const eventData: SbbDialogCloseEventDetails = {
      returnValue: this.returnValue,
      closeTarget: this.dialogCloseElement,
    };

    if (!this.willClose.emit(eventData)) {
      return;
    }
    this.state = 'closing';
    this.removeAriaLiveRefContent();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.state ||= 'closed';
    this.dialogController?.abort();
    this.dialogController = new AbortController();

    if (this.state === 'opened') {
      applyInertMechanism(this);
    }
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    this.ariaLiveRef =
      this.shadowRoot!.querySelector<SbbScreenReaderOnlyElement>('sbb-screen-reader-only')!;

    super.firstUpdated(_changedProperties);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.dialogController?.abort();
    this.openDialogController?.abort();
    this.focusHandler.disconnect();
    this.removeInstanceFromGlobalCollection();
    removeInertMechanism();
  }

  protected attachOpenDialogEvents(): void {
    this.openDialogController = new AbortController();
    // Remove overlay label as soon as it is not needed any more to prevent accessing it with browse mode.
    window.addEventListener(
      'keydown',
      async (event: KeyboardEvent) => {
        this.removeAriaLiveRefContent();
        await this.onKeydownEvent(event);
      },
      {
        signal: this.openDialogController.signal,
      },
    );
    window.addEventListener('click', () => this.removeAriaLiveRefContent(), {
      signal: this.openDialogController.signal,
    });
  }

  protected onKeydownEvent(event: KeyboardEvent): void {
    if (this.state !== 'opened') {
      return;
    }

    if (event.key === 'Escape') {
      dialogRefs[dialogRefs.length - 1].close();
      return;
    }
  }

  protected removeInstanceFromGlobalCollection(): void {
    dialogRefs.splice(dialogRefs.indexOf(this as SbbDialogBaseElement), 1);
  }

  // Close the dialog on click of any element that has the 'sbb-dialog-close' attribute.
  protected closeOnSbbDialogCloseClick(event: Event): void {
    const dialogCloseElement = event
      .composedPath()
      .filter((e): e is HTMLElement => e instanceof window.HTMLElement)
      .find(
        (target) => target.hasAttribute(this.closeAttribute) && !target.hasAttribute('disabled'),
      );

    if (!dialogCloseElement) {
      return;
    }

    // Check if the target is a submission element within a form and return the form, if present
    const closestForm =
      dialogCloseElement.getAttribute('type') === 'submit'
        ? (hostContext('form', dialogCloseElement) as HTMLFormElement)
        : undefined;
    dialogRefs[dialogRefs.length - 1].close(closestForm, dialogCloseElement);
  }

  protected removeAriaLiveRefContent(): void {
    this.ariaLiveRef.textContent = '';
  }

  protected setAriaLiveRefContent(label?: string): void {
    this.ariaLiveRefToggle = !this.ariaLiveRefToggle;

    // If the text content remains the same, on VoiceOver the aria-live region is not announced a second time.
    // In order to support reading on every opening, we toggle an invisible space.
    this.ariaLiveRef.textContent = `${i18nDialog[this.language.current]}${
      label ? `, ${label}` : ''
    }${this.ariaLiveRefToggle ? ' ' : ''}`;
  }
}
