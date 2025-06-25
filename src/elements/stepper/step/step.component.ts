import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { EventEmitter } from '../../core/eventing.js';
import {
  appendAriaElements,
  removeAriaElements,
  SbbElementInternalsMixin,
} from '../../core/mixins.js';
import type { SbbStepLabelElement } from '../step-label.js';
import type { SbbStepperElement } from '../stepper.js';

import style from './step.scss?lit&inline';

let nextId = 0;

export type SbbStepValidateEventDetails = {
  currentIndex: number | null;
  currentStep: SbbStepElement | null;
  nextIndex: number | null;
  nextStep: SbbStepElement | null;
};

/**
 * Combined with a `sbb-stepper`, it displays a step's content.
 *
 * @slot - Use the unnamed slot to provide content.
 * @event {CustomEvent<SbbStepValidateEventDetails>} validate - Emits whenever step switch is triggered. Can be canceled.
 */
export
@customElement('sbb-step')
class SbbStepElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'tabpanel';
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    validate: 'validate',
    resizechange: 'resizechange',
  } as const;

  /** Emits whenever step switch is triggered. */
  private _validateEmitter: EventEmitter<SbbStepValidateEventDetails> = new EventEmitter(
    this,
    SbbStepElement.events.validate,
  );

  /**
   * @internal
   * Emits when a resize happens, used to avoid setting the height of the stepper from the step component.
   */
  private _resizeChangeEmitter: EventEmitter<void> = new EventEmitter(
    this,
    SbbStepElement.events.resizechange,
    { bubbles: true },
  );

  private _stepper: SbbStepperElement | null = null;

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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private set label(value: SbbStepLabelElement | null) {
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
  public get label(): SbbStepLabelElement | null {
    return this._label;
  }
  private _label: SbbStepLabelElement | null = null;

  public constructor() {
    super();
    this.addEventListener?.('click', (e) => this._handleClick(e));
  }

  /**
   * Selects and configures the step.
   * @internal
   */
  public select(): void {
    if (!this.hasUpdated || !this.label) {
      return;
    }
    this.toggleAttribute('data-selected', true);
    this.label.select();
  }

  /**
   * Deselects and configures the step.
   * @internal
   */
  public deselect(): void {
    if (!this.label) {
      return;
    }
    this.toggleAttribute('data-selected', false);
    this.label.deselect();
  }

  /**
   * Emits a validate event whenever step switch is triggered.
   * @internal
   */
  public validate(eventData: SbbStepValidateEventDetails): boolean {
    return !!this._validateEmitter.emit(eventData);
  }

  /**
   * Configures the step.
   * @internal
   */
  public configure(stepperLoaded: boolean): void {
    if (stepperLoaded) {
      this.label = this._getStepLabel();
    }
  }

  /** Watches for clicked elements with `sbb-stepper-next` or `sbb-stepper-previous` attributes. */
  private _handleClick(event: Event): void {
    const composedPathElements = event
      .composedPath()
      .filter((el) => el instanceof window.HTMLElement);
    if (composedPathElements.some((el) => this._isGoNextElement(el as HTMLElement))) {
      this._stepper?.next();
    } else if (composedPathElements.some((el) => this._isGoPreviousElement(el as HTMLElement))) {
      this._stepper?.previous();
    }
  }

  private _isGoNextElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-next') && !element.hasAttribute('disabled');
  }

  private _isGoPreviousElement(element: HTMLElement): boolean {
    return element.hasAttribute('sbb-stepper-previous') && !element.hasAttribute('disabled');
  }

  private _onStepElementResize(): void {
    if (!this.hasAttribute('data-selected')) {
      return;
    }
    this._resizeChangeEmitter.emit();
  }

  private _getStepLabel(): SbbStepLabelElement | null {
    let previousSibling = this.previousElementSibling;
    while (previousSibling && previousSibling.localName !== 'sbb-step-label') {
      previousSibling = previousSibling.previousElementSibling;
    }
    return previousSibling as SbbStepLabelElement;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-step-${nextId++}`;
    this.slot ||= 'step';
    this._stepper = this.closest('sbb-stepper');
    this.label = this._getStepLabel();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.updateComplete.then(() => {
      this._stepResizeObserver.observe(this.shadowRoot!.querySelector('.sbb-step') as HTMLElement);
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-step--wrapper">
        <div class="sbb-step">
          <slot></slot>
        </div>
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
    resizechange: CustomEvent<void>;
  }
}
