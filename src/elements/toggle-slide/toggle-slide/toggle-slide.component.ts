import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbButtonStaticElement } from '../../button.pure.ts';
import {
  appendAriaElements,
  forceType,
  preventScrollOnSpacebarPress,
  removeAriaElements,
  SbbDynamicStylesheetMixin,
  SbbElement,
  type SbbElementType,
  SbbFormAssociatedCheckboxMixin,
  screenReaderOnlyStyles,
} from '../../core.ts';
import { SbbIconElement } from '../../icon.pure.ts';

import style from './toggle-slide.scss?inline';

const activationPressDuration = 1500;
const longPressDelay = 500;
const minMovePxToTriggerSliding = 8;

/**
 * An event that is dispatched when the user is about to change the checked state.
 * The event is cancelable, so the consumer can prevent the state change by calling `preventDefault()`.
 * For asynchronous validation, the consumer can call `preventDefaultConditionally()` with a promise that resolves to a boolean.
 */
export class SbbToggleSlideValidateEvent extends Event {
  /**
   * The prevent-default condition if `preventDefaultConditionally()` was called.
   */
  public get condition(): Promise<boolean> | null {
    return this._condition ?? null;
  }
  private _condition?: Promise<boolean>;

  public constructor() {
    super('validate', { bubbles: true, composed: true, cancelable: true });
  }

  /**
   * When validation needs to happen asynchronously, this method can be called with a
   * promise that resolves to a boolean.
   * If the promise resolves to true, then the validation is successful and the checked state is changed.
   * If the promise resolves to false or is rejected, then the validation fails and the checked state remains unchanged.
   */
  public preventDefaultConditionally(condition: Promise<boolean>): void {
    this._condition = condition;
  }
}

/**
 * Possible states:
 *
 *                                 ┌─────────────────┐
 *                                 │                 │
 *                                 │      IDLE       │
 *                                 │                 │
 *                                 └────────┬────────┘
 *                                          │
 *              ┌───────────────────────────┼───────────────────────────┐
 *              │                           │                           │
 *         pointerdown                Space keydown                 disabled
 *              │                           │
 *              ▼                           │
 *       ┌──────────────┐                   │
 *       │              │                   │
 *       │    PENDING   │                   │
 *       │              │                   │
 *       └──────┬───────┘                   │
 *              │                           │
 *        ┌─────┴─────┐                     │
 *        │           │                     │
 *     > 8 px      500 ms                   │
 *        │           │                     │
 *        ▼           ▼                     ▼
 *  ┌───────────┐ ┌─────────────────────────────┐
 *  │           │ │                             │
 *  │  SLIDING  │ │     ACTIVATION-SLIDING      │
 *  │           │ │                             │
 *  └─────┬─────┘ └────────┬────────────────────┘
 *        │                │
 *        │                │
 *    pointerup  Space keyup / pointerup
 *        │                │
 *        └───────┬────────┘
 *                ▼
 *        ┌────────────────┐
 *        │                │
 *        │   VALIDATING   │
 *        │                │
 *        └───────┬────────┘
 *                │
 *     validate-event validation
 *                │
 *           ┌────┴──────┐
 *           │           │
 *         true       false / reject
 *           │           │
 *           ▼           │
 * CHECKED STATE CHANGE  │
 *           │           ▼
 *       ┌────────────────┐
 *       │      IDLE      │
 *       └────────────────┘
 *
 *
 *   Any active pointer state
 *           │
 *           │ pointercancel / blur
 *           ▼
 *          IDLE
 *        + animate back
 */

/**
 * Toggle checkbox that needs to be slided in order to confirm an action.
 *
 * @slot - Use the unnamed slot to add content to the toggle label.
 * @slot hint - Add general hints to the user about using this component
 * @slot error - Slot `<sbb-error>` components to indicate a possible error.
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @event {SbbToggleSlideValidateEvent} validate - An event that is dispatched when the user is about to change the checked state. The event is cancelable, so the consumer can prevent the state change by calling `preventDefault()`. For asynchronous validation, the consumer can call `preventDefaultConditionally()` with a promise that resolves to a boolean.
 *
 * @overrideType value - (T = string) | null
 */
export class SbbToggleSlideElement<T = string> extends SbbDynamicStylesheetMixin(
  SbbFormAssociatedCheckboxMixin(SbbElement),
) {
  public static override readonly elementName: string = 'sbb-toggle-slide';
  public static override styles: CSSResultGroup = [screenReaderOnlyStyles, unsafeCSS(style)];
  public static override elementDependencies: SbbElementType[] = [
    SbbIconElement,
    SbbButtonStaticElement,
  ];
  public static override role = 'switch';
  public static readonly events = {
    validate: 'validate',
  } as const;

  /** Value of the form element. */
  @property()
  public accessor value: T | null = null;

  /**
   * Size variant, either s (lean theme default), m (standard theme default) or l.
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' | 'l' | null = null;

  /**
   * Number value as fraction between 0 and 1,
   * that in minimum a user has to slide to in order change the checked state.
   * Defaults to 0.9.
   */
  @forceType()
  @property({ attribute: 'snap-threshold', type: Number })
  public accessor snapThreshold: number = 0.9;

  @state() private accessor _state:
    'idle' | 'pointer-pending' | 'pointer-sliding' | 'activation-sliding' | 'validating' = 'idle';

  /** It is used internally to get the `error` slot. */
  @state() private accessor _errorElements: Element[] = [];

  /** It is used internally to get the `hint` slot. */
  @state() private accessor _hintElements: Element[] = [];

  private _slideFraction = 0;
  private _animationFrame: number = -1;
  private _ariaLiveRefToggle = false;

  private _pointerInteraction: {
    longPressTimer: number;
    downX: number;
    downY: number;
    buttonPointerOffsetLeft: number;
  } | null = null;
  private _hostRules?: CSSStyleRule | null;

  public constructor() {
    super();

    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
    this.addEventListener?.('keyup', (e) => this._handleKeyUp(e));
    this.addEventListener?.('blur', () => this._handleBlur());
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._updateFraction(this.checked ? 1 : 0);
  }

  public override disconnectedCallback(): void {
    this._cancelAnimation();
    this._resetPointerInteraction();

    super.disconnectedCallback();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    // TODO: control order of describedByElements
    this.internals.ariaDescribedByElements = appendAriaElements(
      this.internals.ariaDescribedByElements,
      this.shadowRoot?.querySelector?.('#interactiondescription') ?? null,
    );
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (name === 'checked') {
      this.internals.ariaChecked = `${this.checked}`;
      // As SbbFormAssociatedCheckboxMixin does not reflect checked property, we add a checked state.
      this.toggleState('checked', this.checked);

      if (this._slideFraction !== (this.checked ? 1 : 0)) {
        this._updateFraction(this.checked ? 1 : 0);
      }
    } else if (name === 'disabled') {
      this._cancelAnimation();
      this._resetPointerInteraction();
      this._animateToCheckedState();
    }
  }

  /** Handles the pointer down event on the slide button. */
  private _handlePointerDown(event: PointerEvent): void {
    if (this.disabled || this._state !== 'idle') {
      return;
    }
    this._cancelAnimation();
    this._resetPointerInteraction();
    this._state = 'pointer-pending';
    const button = event.currentTarget as HTMLElement;
    button.setPointerCapture(event.pointerId);
    window.addEventListener('pointerup', () => this._handlePointerUp(), { once: true });

    this._pointerInteraction = {
      longPressTimer: window.setTimeout(() => {
        if (this._state === 'pointer-pending') {
          this._startLongPressActivation();
        }
      }, longPressDelay),
      downX: event.clientX,
      downY: event.clientY,

      // We need to store the offset of the pointer relative to the button's left edge.
      // With this information we can prevent a jump of the button when starting to slide.
      buttonPointerOffsetLeft: event.clientX - button.getBoundingClientRect().left,
    };
  }

  /** Called during sliding to update the position of the button based on the pointer's position. */
  private _handlePointerMove(event: PointerEvent): void {
    if (this._state === 'pointer-pending') {
      const dx = event.clientX - (this._pointerInteraction?.downX ?? 0);
      const dy = event.clientY - (this._pointerInteraction?.downY ?? 0);

      // We only want to start the longPress if the cursor / finger is not moving more than between a small range.
      // If the user moves more than a certain threshold, we start the pointer sliding instead of longPress.
      if (Math.hypot(dx, dy) > minMovePxToTriggerSliding) {
        this._startPointerSliding();
      }
    } else if (this._state === 'pointer-sliding') {
      this._updatePosition(event);
    }
  }

  /** Called when intentionally stopped the sliding. */
  private _handlePointerUp(): void {
    if (this._state === 'pointer-pending') {
      this._state = 'idle';
    } else if (this._state === 'pointer-sliding') {
      this._finishPointerSliding();
    } else if (this._state === 'activation-sliding') {
      this._finishActivation();
    }

    this._resetPointerInteraction();
  }

  /** Called when unintentionally stopped the sliding. */
  private _handlePointerCancel(): void {
    if (
      this._state !== 'pointer-pending' &&
      this._state !== 'pointer-sliding' &&
      this._state !== 'activation-sliding'
    ) {
      return;
    }

    this._resetPointerInteraction();
    this._state = 'idle';
    this._animateToCheckedState();
  }

  /** Handles the key down event on the toggle slide element. */
  private _handleKeyDown(event: KeyboardEvent): void {
    preventScrollOnSpacebarPress(event);

    // Only handle the initial Space keydown, not repeated keydown events.
    if (this.disabled || this._state !== 'idle' || event.key !== ' ' || event.repeat) {
      return;
    }
    this._startKeyboardActivation();
  }

  /** Handles the key up event on the toggle slide element. */
  private _handleKeyUp(event: KeyboardEvent): void {
    if (this._state !== 'activation-sliding' || event.key !== ' ') {
      return;
    }
    this._toggleButtonActiveState(false);
    this._finishActivation();
  }

  /**
   * Handles the blur event on the toggle slide element.
   * Ensures aborting activation when focus was lost.
   */
  private _handleBlur(): void {
    if (this._state === 'activation-sliding') {
      this._state = 'idle';
      this._animateToCheckedState();
    }
  }

  private _startPointerSliding(): void {
    this._cancelLongPress();
    this._cancelAnimation();

    this._state = 'pointer-sliding';
  }

  private _finishPointerSliding(): void {
    const threshold = Math.min(1, Math.max(0, this.snapThreshold));
    if (
      this.checked
        ? this._slideFraction <= 1 - threshold
        : this._slideFraction >= threshold && !this.disabled
    ) {
      // Animate from threshold to 100% or to 0%
      this._animateToCheckedState({ target: this.checked ? 0 : 1 });
      this._validate();
    } else {
      this._state = 'idle';

      this._animateToCheckedState();
    }
  }

  private _startLongPressActivation(): void {
    this._pointerInteraction!.longPressTimer = -1;
    this._cancelLongPress();
    this._cancelAnimation();

    this._state = 'activation-sliding';

    this._announce('Activating'); // TODO: Deactivating
    this._animateToCheckedState({
      target: this.checked ? 0 : 1,
      withEase: false,
      durationInMs: activationPressDuration,
      onComplete: () => this._finishActivation(),
    });
  }

  private _startKeyboardActivation(): void {
    this._cancelAnimation();
    this._toggleButtonActiveState(true);

    this._state = 'activation-sliding';

    this._announce('Activating'); // TODO: Deactivating
    this._animateToCheckedState({
      target: this.checked ? 0 : 1,
      withEase: false,
      durationInMs: activationPressDuration,

      // Trigger the validating state as soon as it reaches 1 or 0
      onComplete: () => {
        this._toggleButtonActiveState(false);
        this._finishActivation();
      },
    });
  }

  private _finishActivation(): void {
    if (this._slideFraction === (this.checked ? 0 : 1)) {
      this._validate();
    } else {
      this._state = 'idle';
      this._announce('Activation aborted'); // TODO: Deactivating
      this._animateToCheckedState();
    }
  }

  private async _validate(): Promise<void> {
    if (
      this._state !== 'pointer-sliding' &&
      this._state !== 'activation-sliding' &&
      this._state !== 'idle'
    ) {
      return;
    }

    this._state = 'validating';
    this.internals.ariaBusy = 'true';

    const success = await this._dispatchValidateEvent();
    if (success) {
      // The label fade-in and icon animation should only occur on user interaction, so we need to set the state here.
      this.toggleState('label-fade', true);
      this.toggleState('icon-transition', true);
      this.toggleByUserInteraction();
      this._announce('');
    } else {
      this._animateToCheckedState();
      this._announce(`Validation failed. Falling back to initial state.`);
    }

    this.internals.ariaBusy = null;
    this._state = 'idle';
  }

  private async _dispatchValidateEvent(): Promise<boolean> {
    const validateEvent = new SbbToggleSlideValidateEvent();
    const validateResult = this.dispatchEvent(validateEvent);

    if (!validateEvent.condition) {
      return validateResult;
    }

    this._announce('Validating');
    return await validateEvent.condition.catch(() => false);
  }

  private _updatePosition(event: PointerEvent): void {
    const button = event.currentTarget as HTMLElement;
    const trackRect = button.parentElement!.getBoundingClientRect();
    const trackLength = trackRect.width - button.clientWidth;

    // Unlikely, but exit if so
    if (trackLength <= 0) {
      return;
    }

    const position = Math.max(
      0,
      Math.min(
        event.clientX - trackRect.left - (this._pointerInteraction?.buttonPointerOffsetLeft ?? 0),
        trackLength,
      ),
    );

    this._updateFraction(position / trackLength);
  }

  private _updateFraction(fraction: number): void {
    this._slideFraction = fraction;

    (this._hostRules ??= this.createHostRules())?.style.setProperty(
      '--sbb-toggle-slide-fraction',
      `${this._slideFraction}`,
    );
  }

  /**
   * As the opacity of the action calls depend on the slide fraction,
   * we need to animate programmatically instead of CSS.
   * With that the fraction is always the base for all visual states.
   */
  private _animateToCheckedState(options?: {
    target?: 0 | 1;
    durationInMs?: number;
    withEase?: boolean;
    onComplete?: () => void;
  }): void {
    this._cancelAnimation();

    const evaluatedOptions: {
      target: 0 | 1;
      durationInMs: number;
      withEase: boolean;
      onComplete?: () => void;
    } = {
      target: this.checked ? 1 : 0,
      durationInMs:
        parseFloat(
          getComputedStyle(this).getPropertyValue('--sbb-toggle-slide-animation-duration'),
        ) * 1000 || 0,
      withEase: true,
      ...options,
    };

    const start = this._slideFraction;
    const startTime = performance.now();

    if (evaluatedOptions.durationInMs <= 0) {
      this._updateFraction(evaluatedOptions.target);
      evaluatedOptions.onComplete?.();
      return;
    }

    const animate = (time: number): void => {
      const progress = Math.min((time - startTime) / evaluatedOptions.durationInMs, 1);

      // Ease-out
      const eased = evaluatedOptions.withEase ? 1 - Math.pow(1 - progress, 3) : progress;
      this._updateFraction(start + (evaluatedOptions.target - start) * eased);
      if (progress < 1) {
        this._animationFrame = requestAnimationFrame(animate);
      } else {
        this._animationFrame = -1;
        evaluatedOptions.onComplete?.();
      }
    };

    this._animationFrame = requestAnimationFrame(animate);
  }

  private _toggleButtonActiveState(active: boolean): void {
    this.shadowRoot
      ?.querySelector<SbbButtonStaticElement>('.sbb-toggle-slide__button')
      ?.['toggleState']('active', active);
  }

  private _resetPointerInteraction(): void {
    this._cancelLongPress();
    this._pointerInteraction = null;
  }

  private _cancelAnimation(): void {
    if (this._animationFrame !== -1) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = -1;
    }
  }

  private _cancelLongPress(): void {
    if (this._pointerInteraction) {
      clearTimeout(this._pointerInteraction.longPressTimer);
      this._pointerInteraction.longPressTimer = -1;
    }
  }

  private _onSlotErrorChange(event: Event): void {
    const errorElements = (event.target as HTMLSlotElement).assignedElements();
    if (this.internals.ariaDescribedByElements?.length) {
      this.internals.ariaDescribedByElements = removeAriaElements(
        this.internals.ariaDescribedByElements,
        ...(this._errorElements ?? []),
        // Also remove hint elements since their visibility depends on error state
        ...(this._hintElements ?? []),
      );
    }

    this._errorElements = errorElements;
    for (const el of this._errorElements) {
      // Instead of defining a container with an aria-live region as expected, we had to change
      // setting it for every slotted element to properly work in all browsers and screen reader combinations.
      el.role ||= 'status';
    }

    this._assignAriaDescribedByElements();
    this.toggleState('has-error', !!this._errorElements.length);
  }

  private _onSlotHintChange(event: Event): void {
    const hintElements = (event.target as HTMLSlotElement).assignedElements();
    if (this.internals.ariaDescribedByElements?.length && this._hintElements?.length) {
      this.internals.ariaDescribedByElements = removeAriaElements(
        this.internals.ariaDescribedByElements,
        ...this._hintElements,
      );
    }

    this._hintElements = hintElements;
    this._assignAriaDescribedByElements();
  }

  private _assignAriaDescribedByElements(): void {
    // Hint elements are only linked when there are no errors
    const elements = this._errorElements.length ? this._errorElements : this._hintElements;
    this.internals.ariaDescribedByElements = appendAriaElements(
      this.internals.ariaDescribedByElements,
      ...elements,
    );
  }

  private _announce(message: string): void {
    // TODO: store ref
    const statusElement = this.shadowRoot?.querySelector('.sbb-toggle-slide__status');
    if (!statusElement) {
      return;
    }
    this._ariaLiveRefToggle = !this._ariaLiveRefToggle;

    // If the text content remains the same, on VoiceOver the aria-live region is not announced a second time.
    // In order to support reading on every opening, we toggle an invisible space.
    statusElement.textContent = `${message}${this._ariaLiveRefToggle ? ' ' : ''}`; // Add random number to ensure screen reader announces the same string again
  }

  /**
   * As the label fade-in animation should only occur on user interaction,
   * we need to reset the state after the every animation is done.
   * */
  private _handleLabelAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'label-fade-in') {
      this.toggleState('label-fade', false);
    }
  }

  private _handleIconTransitionEnd(): void {
    this.toggleState('icon-transition', false);
  }

  protected override render(): TemplateResult {
    return html`<span class="sbb-toggle-slide" aria-hidden="true">
        <span class="sbb-screen-reader-only" id="interactiondescription">
          Press and hold space bar or finger to toggle the state.
        </span>
        <span class="sbb-toggle-slide__call-to-actions">
          <slot @animationend=${this._handleLabelAnimationEnd}></slot>
        </span>
        <span class="sbb-toggle-slide__track">
          <sbb-button-static
            class="sbb-toggle-slide__button"
            size=${this.size ?? nothing}
            ?loading=${this._state === 'validating'}
            ?disabled=${this.disabled}
            @pointerdown=${this._handlePointerDown}
            @pointermove=${this._handlePointerMove}
            @pointercancel=${this._handlePointerCancel}
          >
            <span slot="icon" @transitionend=${this._handleIconTransitionEnd}>
              <sbb-icon name="arrow-right-small"></sbb-icon>
              <sbb-icon name="tick-small"></sbb-icon>
            </span>
          </sbb-button-static>
        </span>
      </span>
      <span class="sbb-toggle-slide-meta">
        <slot name="hint" @slotchange=${this._onSlotHintChange}></slot>
        <slot name="error" @slotchange=${this._onSlotErrorChange}></slot>
      </span>
      <span class="sbb-toggle-slide__status sbb-screen-reader-only" role="alert"></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-slide': SbbToggleSlideElement;
  }
}
