import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';

import {
  appendAriaElements,
  removeAriaElements,
  SbbElement,
  SbbPropertyWatcherController,
} from '../../core.ts';
import type { SbbStepLabelElement } from '../step-label/step-label.component.ts';
import type { SbbStepperElement } from '../stepper/stepper.component.ts';

import style from './step.scss?inline';

export interface SbbStepValidateEventDetails {
  currentIndex: number | null;
  currentStep: SbbStepElement | null;
  nextIndex: number | null;
  nextStep: SbbStepElement | null;
}

export class SbbStepValidateEvent extends Event {
  private readonly _currentIndex: number | null;
  private readonly _currentStep: SbbStepElement | null;
  private readonly _nextIndex: number | null;
  private readonly _nextStep: SbbStepElement | null;

  public get currentIndex(): number | null {
    return this._currentIndex;
  }

  public get currentStep(): SbbStepElement | null {
    return this._currentStep;
  }

  public get nextIndex(): number | null {
    return this._nextIndex;
  }

  public get nextStep(): SbbStepElement | null {
    return this._nextStep;
  }

  public constructor({
    currentIndex,
    currentStep,
    nextIndex,
    nextStep,
  }: Omit<SbbStepValidateEvent, keyof Event>) {
    super('validate', { bubbles: true, composed: true, cancelable: true });
    this._currentIndex = currentIndex;
    this._currentStep = currentStep;
    this._nextIndex = nextIndex;
    this._nextStep = nextStep;
  }
}

/**
 * Combined with a `sbb-stepper`, it displays a step's content.
 *
 * @slot - Use the unnamed slot to provide content.
 */
export class SbbStepElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-step';
  public static override readonly role = 'tabpanel';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];
  public static readonly events = {
    validate: 'validate',
    resizechange: 'resizechange',
    active: 'active',
  } as const;

  // We use a timeout as a workaround to the "ResizeObserver loop completed with undelivered notifications" error.
  // For more details:
  // - https://github.com/WICG/resize-observer/issues/38#issuecomment-422126006
  // - https://github.com/juggle/resize-observer/issues/103#issuecomment-1711148285
  private _stepResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => setTimeout(() => this._onStepElementResize()),
  });

  /** The label of the step. */
  public get label(): SbbStepLabelElement | null {
    return this._label;
  }
  private _label: SbbStepLabelElement | null = null;

  public get stepper(): SbbStepperElement | null {
    return this.closest('sbb-stepper');
  }

  private _previousOrientation?: string;

  public constructor() {
    super();
    this.addEventListener?.('click', (e) => this._handleClick(e));
    this.addController(
      new SbbPropertyWatcherController(this, () => this.stepper, {
        orientation: (s) => {
          if (this._previousOrientation) {
            this.internals.states.delete(`orientation-${this._previousOrientation}`);
          }
          this._previousOrientation = s.orientation;
          if (this._previousOrientation) {
            this.internals.states.add(`orientation-${this._previousOrientation}`);
          }
        },
      }),
    );
  }

  /**
   * Selects and configures the step.
   */
  protected select(): void {
    if (!this.hasUpdated || !this.label) {
      return;
    }
    this.internals.states.add('selected');
    this.label.select();
    /**
     * @type {Event}
     * The active event is dispatched when a step is activated.
     */
    this.dispatchEvent(new Event('active', { bubbles: true, composed: true }));
  }

  /**
   * Deselects and configures the step.
   */
  protected deselect(): void {
    if (!this.label) {
      return;
    }
    this.internals.states.delete('selected');
    this.label.deselect();
  }

  /**
   * Emits a validate event whenever step switch is triggered.
   */
  protected validate(validate: SbbStepValidateEventDetails): boolean {
    // FIXME: the name of the event variable appears as event name in the readme
    //  due to a bug in the custom-elements-manifest library.
    //  https://github.com/open-wc/custom-elements-manifest/issues/149
    /**
     * @type {SbbStepValidateEvent}
     * The validate event is dispatched when a step change is triggered. Can be canceled to abort the step change.
     */
    return this.dispatchEvent(new SbbStepValidateEvent(validate));
  }

  /**
   * Configures the step.
   */
  protected configure(stepperLoaded: boolean): void {
    if (stepperLoaded) {
      this._assignLabel();
    }
  }

  /** Watches for clicked elements with `sbb-stepper-next` or `sbb-stepper-previous` attributes. */
  private _handleClick(event: Event): void {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isGoNextElement(el as HTMLElement))) {
      this.stepper?.next();
    } else if (composedPathElements.some((el) => this._isGoPreviousElement(el as HTMLElement))) {
      this.stepper?.previous();
    }
  }

  private _isGoNextElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-next') && !element.hasAttribute('disabled');
  }

  private _isGoPreviousElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-previous') && !element.hasAttribute('disabled');
  }

  private _onStepElementResize(): void {
    if (!this.matches(':state(selected)')) {
      return;
    }

    /**
     * @internal
     * Emits when a resize happens, used to avoid setting the height of the stepper from the step component.
     */
    this.dispatchEvent(new Event('resizechange', { bubbles: true }));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'step';
    this._assignLabel();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.updateComplete.then(() => {
      this._stepResizeObserver.observe(this.shadowRoot!.querySelector('.sbb-step') as HTMLElement);
    });
  }

  private _assignLabel(): void {
    let previousSibling = this.previousElementSibling;
    while (previousSibling && previousSibling.localName !== 'sbb-step-label') {
      previousSibling = previousSibling.previousElementSibling;
    }
    const value = previousSibling as SbbStepLabelElement | null;

    this.internals.ariaLabelledByElements = removeAriaElements(
      this.internals.ariaLabelledByElements,
      this._label,
    );
    this._label = value instanceof Element ? value : null;
    this.internals.ariaLabelledByElements = appendAriaElements(
      this.internals.ariaLabelledByElements,
      this._label,
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-step">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-step': SbbStepElement;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    resizechange: Event;
  }
}
