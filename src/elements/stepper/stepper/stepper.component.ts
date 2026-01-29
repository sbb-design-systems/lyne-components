import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getNextElementIndex, isArrowKeyPressed } from '../../core/a11y.ts';
import {
  SbbMediaMatcherController,
  SbbMediaQueryBreakpointLargeAndAbove,
  SbbMediaQueryBreakpointSmallAndAbove,
  SbbMediaQueryBreakpointUltraAndAbove,
  SbbMediaQueryBreakpointZeroAndAbove,
} from '../../core/controllers/media-matchers-controller.ts';
import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.ts';
import { SbbElementInternalsMixin, SbbHydrationMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbStepElement, SbbStepValidateEventDetails } from '../step.ts';

import style from './stepper.scss?lit&inline';

const DEBOUNCE_TIME = 150;

const breakpointMap: Record<string, string> = {
  zero: SbbMediaQueryBreakpointZeroAndAbove,
  small: SbbMediaQueryBreakpointSmallAndAbove,
  large: SbbMediaQueryBreakpointLargeAndAbove,
  ultra: SbbMediaQueryBreakpointUltraAndAbove,
};

export class SbbStepChangeEvent extends Event {
  /** The index of the newly selected step. */
  public readonly selectedIndex: number | null;

  /** The index of the previously selected step. */
  public readonly previousIndex: number | null;

  /** The newly selected step element. */
  public readonly selectedStep: SbbStepElement | null;

  /** The previously selected step element. */
  public readonly previousStep: SbbStepElement | null;

  public constructor(
    selectedIndex: number | null,
    previousIndex: number | null,
    selectedStep: SbbStepElement | null,
    previousStep: SbbStepElement | null,
  ) {
    super('stepchange', { bubbles: true, composed: true });
    this.selectedIndex = selectedIndex;
    this.previousIndex = previousIndex;
    this.selectedStep = selectedStep;
    this.previousStep = previousStep;
  }
}
/**
 * Provides a structured, step-by-step workflow for user interactions.
 * @slot - Provide a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` to the stepper.
 * @slot step-label - Use this slot to provide an `sbb-step-label`.
 * @slot step - Use this slot to provide an `sbb-step`.
 * @event {SbbStepChangeEvent} stepchange - Emits whenever a step was changed.
 */
export
@customElement('sbb-stepper')
class SbbStepperElement extends SbbHydrationMixin(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    stepchange: 'stepchange',
  } as const;

  /**
   * If the sbb-stepper is used in a sbb-dialog, the marker on the selected element will not appear,
   * because the calculations are done when the dialog is closed, so the marker has a width of 0;
   * the same happens for the stepper height.
   * We need to recalculate it when the element becomes visible.
   */
  private _observer = new IntersectionController(this, {
    target: null,
    callback: (entries) => {
      entries.forEach((e) => {
        if (e.intersectionRatio > 0) {
          this._setStepperHeight(this.selected);
          this._setMarkerSize();
        }
      });
    },
  });

  /** If set to true, only the current and previous labels can be clicked and selected. */
  @forceType()
  @property({ type: Boolean })
  public accessor linear: boolean = false;

  /** Overrides the behavior of `orientation` property. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this._horizontalFrom = value && breakpointMap[value] ? value : null;
    if (this._horizontalFrom && this._loaded) {
      this._checkOrientation();
    }
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this._horizontalFrom;
  }
  private _horizontalFrom: SbbHorizontalFrom | null = null;

  /** Steps orientation, either horizontal or vertical. */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  /**
   * Size variant, either s or m.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' = isLean() ? 's' : 'm';

  /** The currently selected step. */
  @property({ attribute: false })
  public set selected(step: SbbStepElement | null) {
    if (this._loaded) {
      this._select(step);
    }
  }
  public get selected(): SbbStepElement | null {
    return this.querySelector?.<SbbStepElement>('sbb-step:state(selected)') ?? null;
  }

  /** The currently selected step index. */
  @property({ attribute: 'selected-index', type: Number })
  public set selectedIndex(index: number | null) {
    if (this._loaded && index !== null) {
      this._select(this.steps[index]);
    }
  }
  public get selectedIndex(): number | null {
    return this.selected ? this.steps.indexOf(this.selected) : null;
  }

  /** The steps of the stepper. */
  public get steps(): SbbStepElement[] {
    const steps: SbbStepElement[] = [];
    this.querySelectorAll?.('sbb-step').forEach((step) => {
      customElements.upgrade(step);
      steps.push(step);
    });
    return steps;
  }

  private get _enabledSteps(): SbbStepElement[] {
    return this.steps.filter((s) => {
      if (s.label) {
        customElements.upgrade(s.label);
        return !s.label.disabled;
      }
      return false;
    });
  }

  private _loaded: boolean = false;
  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;
  private _mediaMatcher = new SbbMediaMatcherController(this, {});

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
    this.addEventListener?.('resizechange', (e: Event) => this._onSelectedStepResize(e));
  }

  /** Selects the next step. */
  public next(): void {
    if (this.selectedIndex !== null) {
      this._select(this.steps[this.selectedIndex + 1]);
    }
  }

  /** Selects the previous step. */
  public previous(): void {
    if (this.selectedIndex !== null) {
      this._select(this.steps[this.selectedIndex - 1]);
    }
  }

  /** Resets the form in which the stepper is nested or every form of each step, if any. */
  public reset(): void {
    const closestForm = this.closest('form');
    if (closestForm) {
      closestForm.reset();
    } else {
      this.querySelectorAll('form').forEach((form) => form.reset());
    }
    this.selectedIndex = 0;
    // In case the focus is currently inside the stepper, we reset the focus to the first/selected step label.
    if (document.activeElement?.closest('sbb-stepper') === this) {
      this.selected?.label?.focus();
    }
  }

  private _isValidStep(step: SbbStepElement | null): step is SbbStepElement {
    if (step) {
      customElements.upgrade(step);
      if (step.label) {
        customElements.upgrade(step.label);
        if (!this.linear && step.label.disabled) {
          return false;
        }
      }
    } else {
      return false;
    }

    if (this.linear && !this.selected) {
      return step === this.steps[0];
    }

    if (this.linear && this.selectedIndex !== null) {
      const index = this.steps.indexOf(step);
      return index < this.selectedIndex || index === this.selectedIndex + 1;
    }

    return true;
  }

  private _select(step: SbbStepElement | null): void {
    if (!this._isValidStep(step)) {
      return;
    }
    const currentIndex = this.selectedIndex;
    const currentStep = this.selected;
    const validatePayload: SbbStepValidateEventDetails = {
      currentIndex,
      currentStep,
      nextIndex: this.selectedIndex !== null ? this.selectedIndex + 1 : null,
      nextStep: this.selectedIndex !== null ? this.steps[this.selectedIndex + 1] : null,
    };

    if (this.selected && !this.selected.validate(validatePayload)) {
      return;
    }

    const current = this.selected;
    current?.deselect();
    step.select();

    /** @internal only to provide double entry in docs. It is a public event! */
    this.dispatchEvent(
      new SbbStepChangeEvent(this.selectedIndex, currentIndex, this.selected, currentStep),
    );

    this._setMarkerSize();
    this._setStepperHeight(step);
    this._configureLinearMode();
    // In case the focus is currently inside the stepper, we focus the selected step label.
    if (document.activeElement?.closest('sbb-stepper') === this) {
      this.selected?.label?.focus();
    }
  }

  private _setMarkerSize(): void {
    if (
      !this._loaded ||
      !this.selected ||
      this.selectedIndex === undefined ||
      !this.selected.label
    ) {
      return;
    }
    const offset =
      this.orientation === 'horizontal'
        ? this.selected.label.offsetLeft + this.selected.label.offsetWidth
        : this._calculateLabelOffsetTop();

    this.style.setProperty('--sbb-stepper-marker-size', `${offset}px`);
  }

  /**
   * Sets the stepper height based on the height of the provided step.
   */
  private _setStepperHeight(step: SbbStepElement | null): void {
    if (step && step.shadowRoot) {
      const innerElement: SbbStepElement | null = step.shadowRoot.querySelector('.sbb-step');
      if (innerElement) {
        this.style?.setProperty('--sbb-stepper-content-height', `${innerElement.offsetHeight}px`);
      }
    }
  }

  private _calculateLabelOffsetTop(): number | undefined {
    if (this.selectedIndex === null) {
      return;
    }
    let offset = 0;
    for (const step of this.steps) {
      if (step === this.selected) {
        break;
      }
      offset = step.label!.offsetHeight + offset;
    }
    return (
      offset +
      this.selected!.label!.offsetHeight! +
      parseFloat(getComputedStyle(this).getPropertyValue('--sbb-spacing-fixed-6x')) *
        16 *
        this.selectedIndex
    );
  }

  private _onSelectedStepResize(e: Event): void {
    this._setStepperHeight(e.target as SbbStepElement);
  }

  private _configure(): void {
    const steps = this.steps;
    steps.forEach((s) => s.configure(this._loaded));

    steps
      .map((s) => s.label)
      .forEach((label, i, array) => label?.configure(i + 1, array.length, this._loaded));
    this._select(this.selected || this._enabledSteps[0]);
  }

  private _updateLabels(): void {
    this.steps.forEach((step) => {
      step.slot = this.orientation === 'horizontal' ? 'step' : 'step-label';
    });
  }

  private _checkOrientation(): void {
    if (this.horizontalFrom) {
      this.orientation = this._mediaMatcher.matches(breakpointMap[this.horizontalFrom])
        ? 'horizontal'
        : 'vertical';
      this._updateLabels();
    }
    // The timeout is needed to make sure that the marker takes the correct step-label size.
    setTimeout(() => this._setMarkerSize(), 0);
  }

  private _onStepperResize = (): void => {
    this._checkOrientation();
    this._setStepperHeight(this.selected);
    clearTimeout(this._resizeObserverTimeout!);
    this.internals.states.add('disable-animation');

    // Disable the animation when resizing to avoid strange transition effects.
    this._resizeObserverTimeout = setTimeout(
      () => this.internals.states.delete('disable-animation'),
      DEBOUNCE_TIME,
    );
  };

  private _configureLinearMode(): void {
    this.steps.forEach((step, index) => {
      if (!step.label) {
        return;
      }
      customElements.upgrade(step.label);

      step.label.disable(
        (this.linear && index > this.selectedIndex!) ||
          (!this.linear && step.label.matches(':state(disabled)')),
      );
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this._onStepperResize, {
      passive: true,
    });
    this.toggleState('disable-animation', !this._loaded);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._onStepperResize);
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.updateComplete.then(() => {
      this._loaded = true;
      this._configure();
      this.selectedIndex = this.linear ? 0 : Number(this.getAttribute('selected-index')) || 0;
      this._observer.observe(this);
      this._checkOrientation();
      // Remove disable-animation state after component init
      setTimeout(() => this.internals.states.delete('disable-animation'), DEBOUNCE_TIME);
    });
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('orientation') && !this.horizontalFrom) {
      this._updateLabels();
      this._setMarkerSize();
    }
    if (changedProperties.has('linear') && this._loaded) {
      this._configureLinearMode();
    }

    if (changedProperties.has('size')) {
      this._setMarkerSize();
    }
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledSteps: SbbStepElement[] = this._enabledSteps;

    if (
      !enabledSteps ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this && (evt.target as HTMLElement).parentElement !== this)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledSteps.indexOf(this.selected!);
      const nextIndex: number = getNextElementIndex(evt, current, enabledSteps.length);
      this._select(enabledSteps[nextIndex]);
      evt.preventDefault();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-stepper">
        <div class="sbb-stepper__labels" role="tablist">
          <slot name="step-label" @slotchange=${this._configure}></slot>
        </div>
        <div class="sbb-stepper__steps">
          <slot name="step" @slotchange=${this._configure}></slot>
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
