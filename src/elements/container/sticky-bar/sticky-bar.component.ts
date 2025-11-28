import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isLean, isZeroAnimationDuration } from '../../core/dom.ts';
import { SbbElementInternalsMixin, SbbUpdateSchedulerMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './sticky-bar.scss?lit&inline';

type StickyState = 'sticking' | 'sticky' | 'unsticking' | 'unsticky';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot - Use the unnamed slot to add content to the sticky bar.
 * @cssprop [--sbb-sticky-bar-padding-block=var(--sbb-spacing-responsive-xs)] - Block padding of the sticky bar.
 * @cssprop [--sbb-sticky-bar-bottom-overlapping-height=0px] - Define an additional area where
 * the sticky bar overlaps the following content on the bottom.
 * This area becomes visible when the sticky bar transitions from sticky to the normal document flow.
 * @cssprop [--sbb-sticky-bar-z-index] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable.
 */
export
@customElement('sbb-sticky-bar')
class SbbStickyBarElement extends SbbUpdateSchedulerMixin(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  public static readonly events = {
    beforestick: 'beforestick',
    stick: 'stick',
    beforeunstick: 'beforeunstick',
    unstick: 'unstick',
  } as const;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public accessor color:
    | 'white'
    | 'milk'
    | 'midnight'
    | 'charcoal'
    | null = null;

  /**
   * Size of the container.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 'm' | 's' = isLean() ? 's' : 'm';

  /** The state of the component. */
  private set _state(state: StickyState) {
    if (this._stateInternal) {
      this.internals.states.delete(`state-${this._stateInternal}`);
    }
    this._stateInternal = state;
    if (this._stateInternal) {
      this.internals.states.add(`state-${this._stateInternal}`);
    }
  }
  private get _state(): StickyState {
    return this._stateInternal;
  }
  private _stateInternal!: StickyState;

  private _intersector?: HTMLSpanElement;
  private _observer = new IntersectionController(this, {
    // Although `this` is observed, we have to postpone observing
    // into firstUpdated() to achieve a correct initial state.
    target: null,
    callback: (entries) => this._detectStickyState(entries[0]),
  });

  public constructor() {
    super();

    this._state = 'sticky';
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'sticky-bar';

    // Sticky bar needs to be hidden until first observer callback
    this.startUpdate();

    const container = this.closest('sbb-container');
    if (container) {
      this.toggleState('expanded', container.expanded);
    }
    if (this._intersector) {
      this._observer.observe(this._intersector);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.internals.states.delete('initialized');
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    if (!this._intersector) {
      this._intersector = this.shadowRoot!.querySelector('.sbb-sticky-bar__intersector')!;
      this._observer.observe(this._intersector);
    }
    this._observer.observe(this);
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-sticky-bar-slide-vertically-animation-duration');
  }

  private _detectStickyState(entry: IntersectionObserverEntry): void {
    this.internals.states.add('initialized');

    const isSticky = !entry.isIntersecting && entry.boundingClientRect.top > 0;

    // To optimize the visual perception of the sticky bar, we have certain cases (e.g. on page load)
    // where we want the sticky bar to slide in from the bottom.
    // To decide whether to slide in from the bottom up,
    // we check how far away the sticky bar is from the intersector element. When scrolling fast, the
    // difference can vary slightly. To account for this we add a height tolerance.
    // This value was found by trial and error.
    const intersectorRect = this._intersector?.getBoundingClientRect();
    const stickyBarRect = this.shadowRoot!.querySelector(
      '.sbb-sticky-bar__wrapper',
    )!.getBoundingClientRect();
    const HEIGHT_TOLERANCE = 30;

    this.toggleState(
      'slide-vertically',
      isSticky &&
        this._intersector &&
        Math.abs(intersectorRect!.bottom - stickyBarRect.bottom) > HEIGHT_TOLERANCE,
    );

    // Toggling sticking has to be after slide-vertically (prevents background color transition)
    this.toggleState('sticking', isSticky);

    // Sticky bar needs to be hidden until first observer callback
    this.completeUpdate();
  }

  /** Animates from normal content flow position to `position: sticky`. */
  public stick(): void {
    if (this._state !== 'unsticky' || !this._dispatchBeforeStickEvent()) {
      return;
    }

    this._state = 'sticking';
    if (!this.internals.states.has('sticking') || this._isZeroAnimationDuration()) {
      this._stickyCallback();
    }
  }

  /** Animates `position: sticky` to normal content flow position. */
  public unstick(): void {
    if (this._state !== 'sticky' || !this._dispatchBeforeUnStickEvent()) {
      return;
    }

    this._state = 'unsticking';

    if (!this.internals.states.has('sticking') || this._isZeroAnimationDuration()) {
      this._unstickyCallback();
    }
  }

  private _stickyCallback(): void {
    this._state = 'sticky';

    /** Emits when the animation from normal content flow to `position: sticky` ends. */
    this.dispatchEvent(new Event('stick'));
  }

  private _unstickyCallback(): void {
    /** Emits when the animation from `position: sticky` to normal content flow ends. */
    this.dispatchEvent(new Event('unstick'));
    this._state = 'unsticky';
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (
      (this._state === 'sticking' || this._state === 'sticky') &&
      event.animationName === 'slide-in'
    ) {
      this._stickyCallback();
    } else if (this._state === 'unsticking' && event.animationName === 'slide-out') {
      this._unstickyCallback();
    }
  }

  private _dispatchBeforeStickEvent(): boolean {
    /** Emits when the animation from normal content flow to `position: sticky` starts. Can be canceled. */
    return this.dispatchEvent(new Event('beforestick', { cancelable: true }));
  }

  private _dispatchBeforeUnStickEvent(): boolean {
    /** Emits when the animation from `position: sticky` to normal content flow starts. Can be canceled. */
    return this.dispatchEvent(new Event('beforeunstick', { cancelable: true }));
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-sticky-bar__wrapper" @animationend=${this._onAnimationEnd}>
        <div class="sbb-sticky-bar">
          <slot></slot>
        </div>
      </div>
      <div class="sbb-sticky-bar__intersector"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sticky-bar': SbbStickyBarElement;
  }
}
