import {
  type CSSResultGroup,
  html,
  type PropertyDeclaration,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbButtonStaticElement } from '../../button.pure.ts';
import {
  isIOS,
  isMacOS,
  preventScrollOnSpacebarPress,
  SbbDynamicStylesheetMixin,
  SbbElement,
  type SbbElementType,
  SbbFormAssociatedCheckboxMixin,
  sbbInputModalityDetector,
  sbbLiveAnnouncer,
  screenReaderOnlyStyles,
} from '../../core.ts';
import { SbbIconElement } from '../../icon.pure.ts';

import style from './toggle-slide.scss?inline';

// The duration in milliseconds for the activation press animation.
const activationPressDuration = 1500;

// The delay in milliseconds before a long press is recognized.
const longPressDelay = 500;

// The minimum distance in pixels that the pointer must move to trigger sliding instead of a long press.
const minMovePxToTriggerSliding = 8;

// The fraction of the track that needs to be covered to trigger a state change.
// For example, a value of 0.95 means that the user needs to slide the button to at least 95% of
// the track length to trigger a state change.
const snapThreshold = 0.95;

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
 * Toggle checkbox that needs to be slided in order to confirm activation or deactivation.
 *
 * @slot - Use the unnamed slot to slot `sbb-toggle-slide-activation-label` and `sbb-toggle-slide-deactivation-label` elements.
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

  @state() private accessor _state:
    'idle' | 'pointer-pending' | 'pointer-sliding' | 'activation-sliding' | 'validating' = 'idle';

  private _slideFraction = 0;
  private _animationFrame: number = -1;

  private _pointerInteraction: {
    longPressTimer: number;
    downX: number;
    downY: number;
    buttonPointerOffsetLeft: number;
  } | null = null;

  public constructor() {
    super();

    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
    this.addEventListener?.('keyup', (e) => this._handleKeyUp(e));
    this.addEventListener?.('blur', () => this._handleBlur());
    this.addEventListener?.('click', (e) => this._handleClick(e));
    this._updateAriaDescription();
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
      this._updateAriaDescription();

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

  /**
   * Handles click events triggered by accessibility tools like VoiceOver on iOS or TalkBack double-tap.
   * On mobile screen readers we can only activate by double-tap.
   * During activation, another double-tap will abort the activation.
   */
  private _handleClick(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    // Escape patch for iOS VoiceOver where instead of the keyboard modality, touch modality is reported.
    const isScreenReaderClick =
      event.detail === 0 ||
      (event.clientX === 0 && event.clientY === 0) ||
      (event as PointerEvent).pointerType === '';

    if (!sbbInputModalityDetector.isScreenReader && !isScreenReaderClick) {
      return;
    }

    // In this case, keyboard means that it was triggered by a screen reader, as the click event is triggered by a double-tap on mobile screen readers.
    if (this._state === 'idle') {
      this._state = 'activation-sliding';

      this._announce(this.checked ? 'Deactivating' : 'Activating');

      this._animateToCheckedState({
        target: this.checked ? 0 : 1,
        withEase: false,
        durationInMs: activationPressDuration,
        onComplete: () => this._finishActivation(),
      });
    } else if (this._state === 'activation-sliding') {
      // This if is triggered if another double tap during activation / deactivation is triggered,
      // which should abort the activation / deactivation.

      this._finishActivation();
    }
  }

  private _startPointerSliding(): void {
    this._cancelLongPress();
    this._cancelAnimation();

    this._state = 'pointer-sliding';
  }

  private _finishPointerSliding(): void {
    if (
      this.checked
        ? this._slideFraction <= 1 - snapThreshold
        : this._slideFraction >= snapThreshold && !this.disabled
    ) {
      // Animate from snapThreshold to 100% or to 0%
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

      // On iOS, the screen reader doesn't announce the state change automatically, so we need to announce it manually.
      // Override potential validating announcement with ''.
      this._announce(isIOS ? (this.checked ? 'Activated' : 'Deactivated') : '');
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

    this.dynamicStyleSheet?.replaceSync(
      `:host { --sbb-toggle-slide-fraction: ${this._slideFraction}; }`,
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

  private _announce(message: string): void {
    sbbLiveAnnouncer.announce(message, 'assertive');
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

  private _updateAriaDescription(): void {
    if (isMacOS) {
      this.internals.ariaDescription = `Press and hold space bar to ${this.checked ? 'deactivate' : 'activate'}`;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-toggle-slide__call-to-actions" aria-hidden="true">
        <slot @animationend=${this._handleLabelAnimationEnd}></slot>
      </span>
      <span class="sbb-toggle-slide__track" aria-hidden="true">
        <sbb-button-static
          class="sbb-toggle-slide__button"
          ?loading=${this._state === 'validating'}
          ?disabled=${this.disabled}
          @pointerdown=${this._handlePointerDown}
          @pointermove=${this._handlePointerMove}
          @pointercancel=${this._handlePointerCancel}
        >
          <span
            slot="icon"
            class="sbb-toggle-slide__icon-wrapper"
            @transitionend=${this._handleIconTransitionEnd}
          >
            <sbb-icon name="arrow-right-small"></sbb-icon>
            <sbb-icon name="tick-small"></sbb-icon>
          </span>
        </sbb-button-static>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-slide': SbbToggleSlideElement;
  }
}
