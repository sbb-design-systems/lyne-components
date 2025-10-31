import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  appendAriaElements,
  removeAriaElements,
  SbbElementInternalsMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbStepLabelElement } from '../step-label.ts';
import type { SbbStepperElement } from '../stepper.ts';

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
 */
export
@customElement('sbb-step')
class SbbStepElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'tabpanel';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    validate: 'validate',
    resizechange: 'resizechange',
  } as const;

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
    this.internals.states.add('selected');
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
    this.internals.states.delete('selected');
    this.label.deselect();
  }

  /**
   * Emits a validate event whenever step switch is triggered.
   * @internal
   */
  public validate(eventData: SbbStepValidateEventDetails): boolean {
    /**
     * @type {CustomEvent<SbbStepValidateEventDetails>}
     * The validate event is dispatched when a step change is triggered. Can be canceled to abort the step change.
     */
    return this.dispatchEvent(
      new CustomEvent<SbbStepValidateEventDetails>('validate', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: eventData,
      }),
    );
  }

  /**
   * Configures the step.
   * @internal
   */
  public configure(stepperLoaded: boolean): void {
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
    this.id ||= `sbb-step-${nextId++}`;
    this.slot ||= 'step';
    this._stepper = this.closest('sbb-stepper');
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
    resizechange: Event;
  }
}
