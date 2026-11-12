import {
  type CSSResultGroup,
  html,
  isServer,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbButtonStaticElement } from '../../button.pure.ts';
import {
  i18nToggleSlideActivated,
  i18nToggleSlideDeactivated,
  i18nToggleSlideValidating,
  i18nToggleSlideValidationFailed,
  idReference,
  isIOS,
  preventScrollOnSpacebarPress,
  SbbDynamicStylesheetMixin,
  SbbElement,
  type SbbElementType,
  SbbFormAssociatedCheckboxMixin,
  sbbInputModalityDetector,
  SbbLanguageController,
  sbbLiveAnnouncer,
  SbbReadonlyMixin,
  screenReaderOnlyStyles,
} from '../../core.ts';
import type { SbbDialogCloseEvent, SbbDialogElement } from '../../dialog.pure.ts';
import { SbbIconElement } from '../../icon.pure.ts';

import style from './toggle-slide.scss?inline';

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
 *                  ┌─────────────────┐
 *                  │                 │
 *                  │      IDLE       │
 *                  │                 │
 *                  └────────┬────────┘
 *                           │
 *        ┌──────────────────┼────────────────────┐
 *        │                  │                    │
 *        │                  │                    │
 *   pointerdown       Space keydown          disabled
 *        │                  │
 *        │             Space keyup
 *        │                  │
 *        ▼                  ▼
 *  ┌───────────┐ ┌───────────────────────┐
 *  │           │ │                       │
 *  │  SLIDING  │ │  KEYBOARD-ACTIVATION  │
 *  │           │ │                       │
 *  └─────┬─────┘ └──────────┬────────────┘
 *        │                  │
 *        │                  │
 *        │        ┌─────────────────────┐
 *        │        │ Confirmation Dialog │
 *        │        └────┬───────────┬────┘
 *        │             │           │
 *    pointerup        true       false
 *        │             │
 *        └───────┬─────┘
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
 * @slot - Use the unnamed slot to place `sbb-toggle-slide-activation-label` and `sbb-toggle-slide-deactivation-label` elements.
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @event {SbbToggleSlideValidateEvent} validate - An event that is dispatched when the user is about to change the checked state. The event is cancelable, so the consumer can prevent the state change by calling `preventDefault()`. For asynchronous validation, the consumer can call `preventDefaultConditionally()` with a promise that resolves to a boolean.
 *
 * @overrideType value - (T = string) | null
 */
export class SbbToggleSlideElement<T = string> extends SbbDynamicStylesheetMixin(
  SbbFormAssociatedCheckboxMixin(SbbReadonlyMixin(SbbElement)),
) {
  public static override readonly elementName: string = 'sbb-toggle-slide';
  public static override styles: CSSResultGroup = [screenReaderOnlyStyles, unsafeCSS(style)];
  public static override elementDependencies: SbbElementType[] = [
    SbbIconElement,
    SbbButtonStaticElement,
  ];
  public static override role = 'switch';
  public static readonly events = {
    input: 'input',
    change: 'change',
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
   * Optional dialog that is opened when the user tries to change the checked state by keyboard or screen reader.
   * In order to activate the state, the dialog should contain a confirmation button that closes
   * the dialog with a positive result (true boolean or 'true' string).
   *
   * The dialog is strongly recommended for important scenarios, e.g. safety relevant.
   *
   * For attribute usage, provide an id reference.
   */
  @idReference()
  @property({ attribute: 'confirmation-dialog' })
  public accessor confirmationDialog: SbbDialogElement | null = null;

  @state() private accessor _state:
    'idle' | 'pointer-sliding' | 'keyboard-activation' | 'validating' = 'idle';

  private _slideFraction = 0;
  private _animationFrame: number = -1;
  private _buttonPointerOffsetLeft?: number;
  private _language = new SbbLanguageController(this);
  private _confirmationDialogElement: SbbDialogElement | null = null;
  private _confirmationDialogAbortController: AbortController = new AbortController();
  private _focusedElementOnDialogClose: Element | null = null;

  public constructor() {
    super();

    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
    this.addEventListener?.('keyup', (e) => this._handleKeyUp(e));
    this.addEventListener?.('blur', () => this._handleBlur());
    this.addEventListener?.('click', (e) => this._handleClick(e));
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._updateFraction(this.checked ? 1 : 0);

    if (this.hasUpdated) {
      this._configureConfirmationDialog();
    }
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

      if (this._slideFraction !== (this.checked ? 1 : 0)) {
        this._updateFraction(this.checked ? 1 : 0);
      }
    } else if (name === 'disabled' || name === 'formDisabled' || name === 'readOnly') {
      if (name === 'readOnly') {
        // As the ariaReadOnly property is not supported for the switch role, we use ariaDisabled instead.
        this.internals.ariaDisabled = `${this.readOnly}`;
      }
      this._cancelAnimation();
      this._resetPointerInteraction();
      this._animateToCheckedState();
    } else if (!isServer && (!name || name === 'trigger') && this.hasUpdated) {
      this._configureConfirmationDialog();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._configureConfirmationDialog();
  }

  private _immutable(): boolean {
    return this.disabled || this.formDisabled || this.readOnly;
  }

  /** Handles the pointer down event on the slide button. */
  private _handlePointerDown(event: PointerEvent): void {
    if (!this._immutable() && this._state === 'idle') {
      this._startPointerSliding(event);
    }
  }

  /** Called during sliding to update the position of the button based on the pointer's position. */
  private _handlePointerMove(event: PointerEvent): void {
    if (this._state === 'pointer-sliding') {
      this._updatePosition(event);
    }
  }

  /** Called when intentionally stopped the sliding. */
  private _handlePointerUp(): void {
    if (this._state === 'pointer-sliding') {
      this._finishPointerSliding();
    }

    this._resetPointerInteraction();
  }

  /** Called when unintentionally stopped the sliding. */
  private _handlePointerCancel(): void {
    if (this._state !== 'pointer-sliding' && this._state !== 'keyboard-activation') {
      return;
    }

    this._resetPointerInteraction();
    this._state = 'idle';
    this._animateToCheckedState();
  }

  /** Handles the key down event on the toggle slide element. */
  private _handleKeyDown(event: KeyboardEvent): void {
    preventScrollOnSpacebarPress(event);

    // Pass active state to inner button.
    if (!this._immutable() && this._state === 'idle' && event.key === ' ' && !event.repeat) {
      this._toggleButtonActiveState(true);
    }
  }

  /** Handles the key up event on the toggle slide element. */
  private _handleKeyUp(event: KeyboardEvent): void {
    if (this._immutable() || event.key !== ' ') {
      return;
    }
    this._startActivation();
  }

  /**
   * Handles the blur event on the toggle slide element.
   */
  private _handleBlur(): void {
    if (this._state !== 'keyboard-activation') {
      this._toggleButtonActiveState(false);
    }
  }

  /**
   * Handles click events triggered by accessibility tools like VoiceOver on iOS or TalkBack double-tap.
   * On mobile screen readers we can only activate by double-tap.
   * During activation, another double-tap will abort the activation.
   */
  private _handleClick(event: PointerEvent): void {
    if (
      !this._immutable() &&
      this._state === 'idle' &&
      sbbInputModalityDetector.isScreenReader(event)
    ) {
      // We only want to activate if the click was triggered by a screen reader, otherwise we would trigger activation on every click.
      this._startActivation();
    }
  }

  private _startPointerSliding(event: PointerEvent): void {
    this._resetPointerInteraction();
    this._cancelAnimation();
    this._state = 'pointer-sliding';

    const button = event.currentTarget as HTMLElement;
    button.setPointerCapture(event.pointerId);

    // Global listener needed although we have pointer capture. Seems more stable than just pointer capture.
    window.addEventListener('pointerup', () => this._handlePointerUp(), { once: true });

    // We need to store the offset of the pointer relative to the button's left edge.
    // With this information we can prevent a jump of the button when starting to slide.
    this._buttonPointerOffsetLeft = event.clientX - button.getBoundingClientRect().left;
  }

  private _finishPointerSliding(): void {
    if (
      this.checked
        ? this._slideFraction <= 1 - snapThreshold
        : this._slideFraction >= snapThreshold && !this._immutable()
    ) {
      // Animate from snapThreshold to 100% or to 0%
      this._animateToCheckedState({ target: this.checked ? 0 : 1 });
      this._validate();
    } else {
      this._state = 'idle';
      this._animateToCheckedState();
    }
  }

  private _startActivation(): void {
    this._state = 'keyboard-activation';
    this._toggleButtonActiveState(true);

    if (this._confirmationDialogElement) {
      this._confirmationDialogElement.open();
    } else {
      this._animateToCheckedState({
        target: this.checked ? 0 : 1,
        onComplete: () => this._finishActivation(),
      });
    }
  }

  private _finishActivation(): void {
    if (this._state === 'keyboard-activation') {
      this._toggleButtonActiveState(false);
      this._validate();
    }
  }

  private async _validate(): Promise<void> {
    if (
      this._state !== 'pointer-sliding' &&
      this._state !== 'keyboard-activation' &&
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
      this._announce(
        isIOS
          ? this.checked
            ? i18nToggleSlideActivated[this._language.current]
            : i18nToggleSlideDeactivated[this._language.current]
          : '',
      );
    } else {
      this._animateToCheckedState();
      this._announce(i18nToggleSlideValidationFailed[this._language.current]);
    }

    if (
      this._confirmationDialogElement &&
      this._focusedElementOnDialogClose === document.activeElement
    ) {
      // In the dialog scenario we loose focus to the dialog when it's opened.
      // Basically, the dialog restores the focus to the last focused element which would be the toggle-slide.
      // However, the focus restoration happens too early and the screen reader reads the wrong state.
      // So we need to restore the focus after the validation is done.
      // As long as the validation is in progress, the focus could be changed by the user.
      // In this case we don't want to restore the focus to the toggle-slide.
      this.focus();
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

    this._announce(i18nToggleSlideValidating[this._language.current]);
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
      Math.min(event.clientX - trackRect.left - (this._buttonPointerOffsetLeft ?? 0), trackLength),
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
    this._buttonPointerOffsetLeft = undefined;
  }

  private _cancelAnimation(): void {
    if (this._animationFrame !== -1) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = -1;
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

  private _configureConfirmationDialog(): void {
    if (this.confirmationDialog === this._confirmationDialogElement) {
      return;
    }

    this._confirmationDialogAbortController.abort();
    this._confirmationDialogElement = this.confirmationDialog;

    if (!this._confirmationDialogElement) {
      return;
    }

    this._confirmationDialogElement.skipFocusRestoration = true;
    this._confirmationDialogAbortController = new AbortController();
    this._confirmationDialogElement.addEventListener(
      'close',
      (e: Event): void => {
        const result = (e as SbbDialogCloseEvent<boolean | 'true' | 'false'>).result;
        if (
          this._state === 'keyboard-activation' &&
          result !== null &&
          (result === true || result === 'true')
        ) {
          // Continue the activation if the dialog was closed with a positive result.
          this._animateToCheckedState({
            target: this.checked ? 0 : 1,
            onComplete: () => this._finishActivation(),
          });

          this._confirmationDialogElement?.addEventListener(
            'focusout',
            (): void => {
              // We store the element that receives focus when the dialog is closed
              this._focusedElementOnDialogClose = document.activeElement;
            },
            {
              once: true,
              signal: this._confirmationDialogAbortController.signal,
            },
          );
        } else {
          this._toggleButtonActiveState(false);
          this._state = 'idle';
          this.focus();
        }
      },
      {
        signal: this._confirmationDialogAbortController.signal,
      },
    );
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
          ?disabled=${this.disabled || this.formDisabled}
          @pointerdown=${this._handlePointerDown}
          @pointermove=${this._handlePointerMove}
          @pointercancel=${this._handlePointerCancel}
        >
          <span
            slot="icon"
            class="sbb-toggle-slide__icon-wrapper"
            @transitionend=${this._handleIconTransitionEnd}
          >
            <sbb-icon name="lock-closed-small"></sbb-icon>
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
