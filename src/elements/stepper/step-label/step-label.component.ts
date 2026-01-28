import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import { appendAriaElements, removeAriaElements, SbbDisabledMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import type { SbbStepElement } from '../step.ts';
import type { SbbStepperElement } from '../stepper.ts';

import style from './step-label.scss?lit&inline';

let nextId = 0;

/**
 * Combined with a `sbb-stepper`, it displays a step's label.
 *
 * @slot - Use the unnamed slot to provide a label.
 * @slot icon - Use this to display an icon in the label bubble.
 */
export
@customElement('sbb-step-label')
class SbbStepLabelElement extends SbbIconNameMixin(SbbDisabledMixin(SbbButtonBaseElement)) {
  public static override readonly role = 'tab';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** The step controlled by the label. */
  public get step(): SbbStepElement | null {
    return this._step;
  }
  private _step: SbbStepElement | null = null;

  public get stepper(): SbbStepperElement | null {
    return this.closest('sbb-stepper');
  }

  public override set disabled(value: boolean) {
    super.disabled = value;

    // We additionally keep track of the `disabled` state to preserve the user configured disabled state
    // of step labels in case of switching between linear and non-linear mode.
    this.toggleState('disabled', value);
  }
  public override get disabled(): boolean {
    return super.disabled;
  }

  private _previousOrientation?: string;
  private _previousSize?: string;

  public constructor() {
    super();
    this.addEventListener?.('click', () => {
      const stepper = this.stepper;
      if (stepper && this.step && !this.matches(':state(disabled)')) {
        stepper.selected = this.step;
      }
    });
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
        size: (s) => {
          if (this._previousSize) {
            this.internals.states.delete(`size-${this._previousSize}`);
          }
          this._previousSize = s.size;
          if (this._previousSize) {
            this.internals.states.add(`size-${this._previousSize}`);
          }
        },
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-step-label-${nextId++}`;
    this.slot ||= 'step-label';
    this.internals.ariaSelected = 'false';
    this.tabIndex = -1;
    this._assignStep();
  }

  /**
   * Selects and configures the step label.
   * @internal
   */
  public select(): void {
    this.tabIndex = 0;
    this.internals.ariaSelected = 'true';
    this.internals.states.add('selected');
  }

  /**
   * Deselects and configures the step label.
   * @internal
   */
  public deselect(): void {
    this.tabIndex = -1;
    this.internals.ariaSelected = 'false';
    this.internals.states.delete('selected');
  }

  /**
   * Configures the step label.
   * @internal
   */
  public configure(posInSet: number, setSize: number, stepperLoaded: boolean): void {
    if (stepperLoaded) {
      this._assignStep();
    }
    this.internals.ariaPosInSet = `${posInSet}`;
    this.internals.ariaSetSize = `${setSize}`;
  }

  private _assignStep(): void {
    let nextSibling = this.nextElementSibling;
    while (nextSibling && nextSibling.localName !== 'sbb-step') {
      nextSibling = nextSibling.nextElementSibling;
    }

    const value = nextSibling as SbbStepElement | null;
    this.internals.ariaControlsElements = removeAriaElements(
      this.internals.ariaControlsElements,
      this._step,
    );
    this._step = value instanceof Element ? value : null;
    this.internals.ariaControlsElements = appendAriaElements(
      this.internals.ariaControlsElements,
      this._step,
    );
  }

  /**
   * @internal
   * Disables the step label and avoids setting the `disabled` state to preserve the initial
   * disabled state in case of switching between linear and non-linear mode.
   */
  public disable(value: boolean): void {
    super.disabled = value;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-step-label">
        <span class="sbb-step-label__prefix">${this.renderIconSlot()}</span>
        <span class="sbb-step-label__text"><slot></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-step-label': SbbStepLabelElement;
  }
}
