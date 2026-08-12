import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyDeclaration,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbButtonStaticElement } from '../button.pure.ts';
import {
  forceType,
  preventScrollOnSpacebarPress,
  SbbElement,
  type SbbElementType,
  SbbFormAssociatedCheckboxMixin,
} from '../core.ts';
import { SbbIconElement } from '../icon.pure.ts';

import style from './toggle-slide.scss?inline';

const activationPressDuration = 2000;
const longPressDelay = 500;
const minMovePxToTriggerSliding = 8;

/**
 * Toggle checkbox that needs to be slided in order to confirm an action.
 *
 * @slot - Use the unnamed slot to add content to the toggle label.
 * @slot hint - Add general hints to the user about using this component
 * @slot error - Slot `<sbb-error>` components to indicate a possible error.
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @overrideType value - (T = string) | null
 */
export class SbbToggleSlideElement<T = string> extends SbbFormAssociatedCheckboxMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-toggle-slide';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];
  public static override elementDependencies: SbbElementType[] = [
    SbbIconElement,
    SbbButtonStaticElement,
  ];

  /** Value of the form element. */
  @property()
  public accessor value: T | null = null;

  /**
   * Size variant, either s (lean theme default), m (standard theme default) or l.
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' | 'l' | null = null;

  /** Action hint to uncheck the toggle slide. */
  @forceType()
  @property({ attribute: 'call-to-uncheck-action' })
  public accessor callToUncheckAction: string = '';

  /** Action hint to check the toggle slide. */
  @forceType()
  @property({ attribute: 'call-to-check-action' })
  public accessor callToCheckAction: string = '';

  /**
   * Number value as fraction between 0 and 1,
   * that in minimum a user has to slide to in order change the checked state.
   * Defaults to 0.9.
   */
  @forceType()
  @property({ attribute: 'snap-threshold', type: Number })
  public accessor snapThreshold: number = 0.9;

  /**
   * Function that is called when the user slides far enough to change the checked state.
   * When a promise is returned, the button is shown in a loading state while the promise is pending.
   * When the promise resolves, the checked or unchecked state is committed.
   * When the promise is rejected, the component enters the error state. Consumers can
   * provide an error message using the `error` slot.
   */
  @property({ attribute: false })
  public accessor beforeToggle: (nextState: 'checked' | 'unchecked') => boolean | Promise<boolean> =
    () => true;

  @state() private accessor _state:
    'default' | 'pending' | 'sliding' | 'activation-sliding' | 'checking' = 'default';

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
    if (this.disabled || this._state !== 'default') {
      return;
    }
    this._cancelAnimation();
    this._resetPointerInteraction();

    this._state = 'pending';

    const button = event.currentTarget as HTMLElement;

    button.setPointerCapture(event.pointerId);
    window.addEventListener('pointerup', () => this._handlePointerUp(), { once: true });

    this._pointerInteraction = {
      longPressTimer: window.setTimeout(() => {
        if (this._state === 'pending') {
          this._pointerInteraction!.longPressTimer = -1;
          this._startLongPress();
        }
      }, longPressDelay),
      downX: event.clientX,
      downY: event.clientY,

      // We need to store the offset of the pointer relative to the button's left edge.
      // With this information we can prevent a jump of the button when starting to slide.
      buttonPointerOffsetLeft: event.clientX - button.getBoundingClientRect().left,
    };
  }

  private _startPointerSliding(): void {
    this._cancelLongPress();
    this._cancelAnimation();

    this._state = 'sliding';
  }

  private _startLongPress(): void {
    if (this._state !== 'pending') {
      return;
    }
    this._cancelLongPress();
    this._cancelAnimation();

    this._state = 'activation-sliding';

    this._animateToCheckedState({
      target: this.checked ? 0 : 1,
      withEase: false,
      durationInMs: activationPressDuration,
      onComplete: () => this._handleEndOfActivation(),
    });
  }

  // Called during sliding to update the position of the button based on the pointer's position.
  private _handlePointerMove(event: PointerEvent): void {
    if (this._state === 'pending') {
      const dx = event.clientX - (this._pointerInteraction?.downX ?? 0);
      const dy = event.clientY - (this._pointerInteraction?.downY ?? 0);

      // We only want to start the longPress if the cursor / finger is not moving more than between a small range.
      // If the user moves more than a certain threshold, we start the pointer sliding instead of longPress.
      if (Math.hypot(dx, dy) > minMovePxToTriggerSliding) {
        this._startPointerSliding();
      }
    } else if (this._state === 'sliding') {
      this._updatePosition(event);
    }
  }

  // Called when intentionally stopped the sliding.
  private _handlePointerUp(): void {
    if (this._state === 'pending') {
      this._state = 'default';
    } else if (this._state === 'sliding') {
      this._handleEndOfPointerSliding();
    } else if (this._state === 'activation-sliding') {
      this._handleEndOfActivation();
    }

    this._resetPointerInteraction();
  }

  private _handleEndOfPointerSliding(): void {
    const threshold = Math.min(1, Math.max(0, this.snapThreshold));
    if (
      this.checked
        ? this._slideFraction <= 1 - threshold
        : this._slideFraction >= threshold && !this.disabled
    ) {
      // Animate from threshold to 100% or to 0%
      this._animateToCheckedState({ target: this.checked ? 0 : 1 });
      this._requestToggleState();
    } else {
      this._state = 'default';

      this._animateToCheckedState();
    }
  }

  private async _requestToggleState(): Promise<void> {
    if (
      this._state !== 'sliding' &&
      this._state !== 'activation-sliding' &&
      this._state !== 'default'
    ) {
      return;
    }
    this._state = 'checking';

    try {
      const success = await this.beforeToggle(this.checked ? 'unchecked' : 'checked');

      if (success) {
        this.toggleState('invalid', false);
        this.toggleByUserInteraction();
      } else {
        this.toggleState('invalid', true);
        this._animateToCheckedState();
      }
    } catch {
      this.toggleState('invalid', true);
      this._animateToCheckedState();
    } finally {
      this._state = 'default';
    }
  }

  // Called when unintentionally stopped the sliding.
  private _handlePointerCancel(): void {
    console.log('pointercancel');

    if (
      this._state !== 'pending' &&
      this._state !== 'sliding' &&
      this._state !== 'activation-sliding'
    ) {
      return;
    }

    this._resetPointerInteraction();
    this._state = 'default';
    this._animateToCheckedState();
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

  private _resetPointerInteraction(): void {
    this._cancelLongPress();
    this._pointerInteraction = null;
  }

  /** Handles the key down event on the slide button. */
  private _handleKeyDown(event: KeyboardEvent): void {
    preventScrollOnSpacebarPress(event);

    // Only handle the initial Space keydown, not repeated keydown events.
    if (this.disabled || this._state !== 'default' || event.key !== ' ' || event.repeat) {
      return;
    }
    this._cancelAnimation();
    this._toggleButtonActiveState(true);

    this._state = 'activation-sliding';

    this._animateToCheckedState({
      target: this.checked ? 0 : 1,
      withEase: false,
      durationInMs: activationPressDuration,

      // Trigger the checking state as soon as it reaches 1 or 0
      onComplete: () => {
        this._toggleButtonActiveState(false);
        this._handleEndOfActivation();
      },
    });
  }

  private _handleKeyUp(event: KeyboardEvent): void {
    if (this._state !== 'activation-sliding' || event.key !== ' ') {
      return;
    }
    this._toggleButtonActiveState(false);
    this._handleEndOfActivation();
  }

  private _handleEndOfActivation(): void {
    if (this._slideFraction === (this.checked ? 0 : 1)) {
      this._requestToggleState();
    } else {
      this._state = 'default';
      this._animateToCheckedState();
    }
  }

  private _handleBlur(): void {
    if (this._state === 'activation-sliding') {
      this._state = 'default';
      this._animateToCheckedState();
    }
  }

  private _updateFraction(fraction: number): void {
    this._slideFraction = fraction;
    this.style.setProperty('--sbb-toggle-slide-fraction', this._slideFraction.toString());
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

  private _toggleButtonActiveState(active: boolean): void {
    this.shadowRoot
      ?.querySelector<SbbButtonStaticElement>('.sbb-toggle-slide__button')
      ?.['toggleState']('active', active);
  }

  protected override render(): TemplateResult {
    return html`<span class="sbb-toggle-slide">
        <span class="sbb-toggle-slide__call-to-actions">
          <span class="sbb-toggle-slide__call-to-uncheck-action">${this.callToUncheckAction}</span>
          <span class="sbb-toggle-slide__call-to-check-action">${this.callToCheckAction}</span>
        </span>
        <span class="sbb-toggle-slide__track">
          <sbb-button-static
            class="sbb-toggle-slide__button"
            size=${this.size ?? nothing}
            ?loading=${this._state === 'checking'}
            ?disabled=${this.disabled}
            @pointerdown=${this._handlePointerDown}
            @pointermove=${this._handlePointerMove}
            @pointercancel=${this._handlePointerCancel}
          >
            <span slot="icon">
              <sbb-icon name="arrow-right-small"></sbb-icon>
              <sbb-icon name="tick-small"></sbb-icon>
            </span>
          </sbb-button-static>
        </span>
      </span>
      <span class="sbb-toggle-slide-meta">
        <slot name="error"></slot>
        <slot name="hint"></slot>
      </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-slide': SbbToggleSlideElement;
  }
}
