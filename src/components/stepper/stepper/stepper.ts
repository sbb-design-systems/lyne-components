import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces';
import type { SbbStepElement } from '../step/step';

import style from './stepper.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 * @event {CustomEvent<any>} myEventName - TODO: Document this event
 */
@customElement('sbb-stepper')
export class SbbStepperElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * If set to true, only the current and previous labels can be clicked and selected.
   */
  @property({ type: Boolean }) public linear = false;

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public horizontalFrom?: SbbHorizontalFrom;

  /**
   * Steps orientation, either horizontal or vertical.
   */
  @property({ reflect: true })
  public orientation: SbbOrientation = 'horizontal';

  public get selected(): SbbStepElement | undefined {
    return this.querySelector<SbbStepElement>('sbb-step[data-selected]') ?? undefined;
  }

  public set selected(step: SbbStepElement) {
    this._select(step);
  }

  public get selectedIndex(): number | undefined {
    return this.selected ? this.steps.indexOf(this.selected) : undefined;
  }

  public set selectedIndex(index: number) {
    this._select(this.steps[index]);
  }

  public get steps(): SbbStepElement[] {
    return Array.from(this.querySelectorAll('sbb-step'));
  }

  public next(): void {
    if (this.selectedIndex !== undefined) {
      this._select(this.steps[this.selectedIndex + 1]);
    }
  }

  public previous(): void {
    if (this.selectedIndex !== undefined) {
      this._select(this.steps[this.selectedIndex - 1]);
    }
  }

  private _isValidStep(step: SbbStepElement): boolean {
    if (!step || step === this.selected || step.hasAttribute('disabled')) {
      return false;
    }

    if (this.linear && !this.selected) {
      return step === this.steps[0];
    }

    if (this.linear && this.selectedIndex !== undefined) {
      const index = this.steps.indexOf(step);
      return index < this.selectedIndex || index === this.selectedIndex + 1;
    }

    return true;
  }

  private _select(step: SbbStepElement): void {
    if (!this._isValidStep(step)) {
      return;
    }
    const validatePayload = {
      currentIndex: this.selectedIndex,
      currentStep: this.selected,
      nextIndex: this.selectedIndex !== undefined && this.selectedIndex + 1,
      nextStep: this.selectedIndex !== undefined && this.steps[this.selectedIndex + 1],
    };
    if (this.selected && !this.selected.validate(validatePayload)) {
      return;
    }
    const current = this.selected;
    if (current) {
      current.toggleAttribute('data-selected', false);
      current.label?.setAttribute('aria-selected', 'false');
      current.label?.toggleAttribute('data-selected', false);
    }
    step.toggleAttribute('data-selected', true);
    step.label?.setAttribute('aria-selected', 'true');
    step.label?.toggleAttribute('data-selected', true);
    this._setMarkerWidth();
  }

  private _setMarkerWidth(): void {
    if (!this.selected || !this.selected.label) {
      return;
    }
    this.style?.setProperty(
      '--sbb-stepper-marker-width',
      `${this.selected.label.offsetLeft + this.selected.label.offsetWidth}px`,
    );
  }

  private _configure(): void {
    const steps = this.steps;
    steps.forEach((step, index) => {
      step.label?.setAttribute('aria-posinset', `${index + 1}`);
      step.label?.setAttribute('aria-setsize', `${steps.length}`);
    });
  }

  protected override async firstUpdated(): Promise<void> {
    this._configure();
    await this.updateComplete;
    this.selectedIndex = 0;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-stepper">
        <div class="sbb-stepper__labels">
          <slot name="step-label"></slot>
        </div>
        <div class="sbb-stepper__steps">
          <slot name="step"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-stepper': SbbStepperElement;
  }
}
