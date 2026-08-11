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
  SbbElement,
  type SbbElementType,
  SbbFormAssociatedCheckboxMixin,
} from '../core.ts';
import { SbbIconElement } from '../icon.pure.ts';

import style from './toggle-slide.scss?inline';

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
  public accessor beforeToggle: (nextState: 'checked' | 'unchecked') => boolean | Promise<boolean> =
    () => true;

  @state() private accessor _state: 'default' | 'sliding' | 'checking' = 'default';

  private _buttonPointerOffsetLeft = 0;
  private _slideFraction = 0;
  private _animationFrame: number = -1;

  public constructor() {
    super();

    this.internals.role = 'switch';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._updateFraction(this.checked ? 1 : 0);
  }

  public override disconnectedCallback(): void {
    this._cancelAnimation();
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
    }
  }

  /** Handles the pointer down event on the slide button. */
  private _handlePointerDown(event: PointerEvent): void {
    if (this.disabled || this._state !== 'default') {
      return;
    }
    this._cancelAnimation();
    this._state = 'sliding';

    const button = event.currentTarget as HTMLElement;

    // We need to store the offset of the pointer relative to the button's left edge.
    // With this information we can prevent a jump of the button when starting to slide.
    this._buttonPointerOffsetLeft = event.clientX - button.getBoundingClientRect().left;

    // We need to configure the pointer tracker, otherwise, if leaving the button area, the drag would stop.
    button.setPointerCapture(event.pointerId);

    this._updatePosition(event);
  }

  // Called during sliding to update the position of the button based on the pointer's position.
  private _handlePointerMove(event: PointerEvent): void {
    if (this._state !== 'sliding') {
      return;
    }

    this._updatePosition(event);
  }

  // Called when intentionally stopped the sliding.
  private _handlePointerUp(): void {
    if (this._state !== 'sliding') {
      return;
    }

    const threshold = Math.min(1, Math.max(0, this.snapThreshold));
    if (this.checked ? this._slideFraction <= 1 - threshold : this._slideFraction >= threshold) {
      // Animate from threshold to 100% or to 0%
      this._animateToCheckedState(this.checked ? 0 : 1);
      this._requestToggleState();
    } else {
      this._state = 'default';

      this._animateToCheckedState();
    }
  }

  private async _requestToggleState(): Promise<void> {
    if (this._state !== 'sliding' && this._state !== 'default') {
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
    if (this._state !== 'sliding') {
      return;
    }

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
      Math.min(event.clientX - trackRect.left - this._buttonPointerOffsetLeft, trackLength),
    );

    this._updateFraction(position / trackLength);
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
  private _animateToCheckedState(target = this.checked ? 1 : 0): void {
    this._cancelAnimation();

    const duration =
      parseFloat(getComputedStyle(this).getPropertyValue('--sbb-toggle-slide-animation-duration')) *
        1000 || 0;
    const start = this._slideFraction;
    const startTime = performance.now();

    if (duration <= 0) {
      this._updateFraction(target);
      return;
    }

    const animate = (time: number): void => {
      const progress = Math.min((time - startTime) / duration, 1);

      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      this._updateFraction(start + (target - start) * eased);
      if (progress < 1) {
        this._animationFrame = requestAnimationFrame(animate);
      } else {
        this._animationFrame = -1;
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
            @pointerup=${this._handlePointerUp}
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
