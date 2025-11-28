import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { type CSSResultGroup, html, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { SbbFocusTrapController } from '../../core/a11y.ts';
import { SbbOpenCloseBaseElement } from '../../core/base-elements.ts';
import { SbbEscapableOverlayController } from '../../core/controllers.ts';
import { forceType, handleDistinctChange } from '../../core/decorators.ts';
import { isZeroAnimationDuration } from '../../core/dom.ts';
import { SbbAnimationCompleteMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbSidebarContainerElement } from '../sidebar-container.ts';

import style from './sidebar.scss?lit&inline';

/**
 * This component corresponds to a sidebar that can be opened on the sidebar container.
 *
 * @slot - Use the unnamed slot to slot any content into the sidebar.
 * @slot title - Use the title slot to add an <sbb-title>.
 */
export
@customElement('sbb-sidebar')
class SbbSidebarElement extends SbbAnimationCompleteMixin(SbbOpenCloseBaseElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Background color of the sidebar. Either `white` or `milk`. */
  @property({ reflect: true })
  public accessor color: 'white' | 'milk' = 'white';

  /** Mode of the sidebar; one of 'side' or 'over'. */
  @forceType((v) => (v === 'over' ? 'over' : 'side'))
  @property({ reflect: true })
  public accessor mode: 'side' | 'over' = 'side';

  /** The side that the sidebar is attached to. */
  @forceType((v) => (v === 'end' ? 'end' : 'start'))
  @handleDistinctChange((instance, _newValue, oldValue) => instance._updateSidebarWidth(oldValue))
  @property({ reflect: true })
  public accessor position: 'start' | 'end' = 'start';

  /**
   * Whether the sidebar is opened or closed.
   * Can be used to initially set the opened state, where
   * the animation will be skipped.
   */
  @forceType()
  @property({ type: Boolean, reflect: true })
  public accessor opened: boolean = false;

  /**
   * Whether the sidebar should focus the first focusable element automatically when opened.
   * Defaults to false in when mode is set to `side`, otherwise defaults to true.
   * If explicitly enabled, focus will be moved into the sidebar in `side` mode as well.
   */
  @forceType()
  @property({ type: Boolean, attribute: 'focus-on-open' })
  public accessor focusOnOpen: boolean = false;

  /** Returns the SbbSidebarContainerElement where this sidebar is contained. */
  public get container(): SbbSidebarContainerElement | null {
    return this._container;
  }
  private _container: SbbSidebarContainerElement | null = null;

  private _lastFocusedElement: HTMLElement | null = null;
  private _focusTrapController = new SbbFocusTrapController(this);
  private _escapableOverlayController = new SbbEscapableOverlayController(this);

  public constructor() {
    super();
    this.addController(
      new ResizeController(this, {
        skipInitial: true,
        callback: () => this._updateSidebarWidth(),
      }),
    );

    this.addEventListener?.('click', (e) => {
      if ((e.target as HTMLElement | undefined)?.localName === 'sbb-sidebar-close-button') {
        this.close();
      }
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._container = this.closest?.('sbb-sidebar-container');
    this._updateSidebarWidth();

    if (this.isOpen && this._isModeOver()) {
      this._takeFocus();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.container?.style.removeProperty(this._buildCssWidthVar());
    this._container = null;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('opened')) {
      if (this.opened) {
        this.open();
      } else if (!this.opened) {
        this.close();
      }
    }

    if (changedProperties.has('mode')) {
      if (this.mode === 'over' && this.isOpen) {
        this._takeFocus();
      } else {
        this.cedeFocus();
      }
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._updateSidebarWidth();
  }

  /** Toggles the sidebar visibility. */
  public toggle(): void {
    if (this.state === 'opening' || this.state === 'opened') {
      this.close();
    } else {
      this.open();
    }
  }

  /** Opens the sidebar. */
  public open(): void {
    if (this.state === 'opening' || this.state === 'opened' || !this.dispatchBeforeOpenEvent()) {
      return;
    }

    this.startAnimation();

    if (!isServer && document.activeElement?.localName !== 'body') {
      this._lastFocusedElement = document.activeElement as HTMLElement;
    }

    this.opened = true;
    this.state = 'opening';

    const isZeroAnimationDuration = this._isZeroAnimationDuration() || !this.isConnected;
    const isDuringInitialization = !this.hasUpdated;

    if (!(isDuringInitialization || isZeroAnimationDuration)) {
      return;
    }
    this.internals.states.add('skip-animation');

    // We have to wait for the first update to be completed
    // in order to have the size of the sidebar ready for the animation.
    if (isDuringInitialization) {
      this.updateComplete.then(() => this._handleOpening());
    } else {
      // If the animation duration is zero, the animationend event is not always fired reliably.
      // In this case we directly set the `opened` state.
      this._handleOpening();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-sidebar-container-animation-duration');
  }

  private _handleOpening(): void {
    this.state = 'opened';

    // We have to ensure that removing the animation skip instruction is done a tick later.
    // Otherwise, it's removed too early and it doesn't have any effect.
    setTimeout(() => this.internals.states.delete('skip-animation'));

    this._takeFocus();
    this.stopAnimation();
    this.dispatchOpenEvent();
  }

  /** Closes the sidebar. */
  public close(): void {
    if (this.state === 'closing' || this.state === 'closed' || !this.dispatchBeforeCloseEvent()) {
      return;
    }

    this.startAnimation();

    const isZeroAnimationDuration = this._isZeroAnimationDuration();

    if (!this.hasUpdated || isZeroAnimationDuration) {
      this.internals.states.add('skip-animation');
    } else {
      this.state = 'closing';
    }

    this.opened = false;

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (!this.hasUpdated || isZeroAnimationDuration) {
      this._handleClosing();
    }
  }

  private _handleClosing(): void {
    this.state = 'closed';
    // We have to ensure that removing the animation skip instruction is done a tick later.
    // Otherwise, it's removed too early and it doesn't have any effect.
    setTimeout(() => this.internals.states.delete('skip-animation'));
    this.cedeFocus();

    if (!isServer && (this.contains(document.activeElement) || this._isModeOver())) {
      if (this._lastFocusedElement) {
        this._lastFocusedElement?.focus();
      } else {
        // We don't know where to set the focus, but have to remove it, so we call blur
        (document.activeElement as HTMLElement).blur();
      }
    }
    this._lastFocusedElement = null;

    this.stopAnimation();
    this.dispatchCloseEvent();
  }

  private _takeFocus(): void {
    // We prevent calling the focus stuff when not needed
    if (!this.isConnected) {
      return;
    }
    const isModeOver = this._isModeOver();

    if (isModeOver || this.focusOnOpen) {
      this._focusTrapController.focusInitialElement();
    }

    if (isModeOver) {
      this._escapableOverlayController.connect();
      this._focusTrapController.enabled = true;
    }
  }

  // Internal method that we use externally. `protected` preserves type information for type safe access.
  protected cedeFocus(): void {
    this._focusTrapController.enabled = false;
    this._escapableOverlayController.disconnect();
  }

  private _updateSidebarWidth(oldPosition?: this['position']): void {
    const container = this.container;
    if (!container) {
      return;
    }

    if (oldPosition) {
      container.style.removeProperty(this._buildCssWidthVar(oldPosition));
    }

    const width = this.offsetWidth;
    if (!width) {
      return;
    }

    const newValue = `${width}px`;
    const actualValue = container.style.getPropertyValue(this._buildCssWidthVar());

    if (actualValue === newValue) {
      return;
    }

    container.style.setProperty(this._buildCssWidthVar(), newValue);
  }

  private _buildCssWidthVar(position = this.position): string {
    return `--sbb-sidebar-container__${position}-width`;
  }

  private _isModeOver(): boolean {
    // If the minimum space attribute is set, the sidebar should behave like in mode over.
    return this.mode === 'over' || this.matches(':state(mode-over-forced)');
  }

  private _onTransitionEnd(event: TransitionEvent): void {
    // We ensure that we react to the fade in transition on the sbb-sidebar div
    if (event.propertyName !== 'translate' || event.target !== event.currentTarget) {
      return;
    }

    if (this.state === 'opening') {
      this._handleOpening();
    } else if (this.state === 'closing') {
      this._handleClosing();
    }
  }

  @eventOptions({ passive: true })
  private _detectScrolledState(): void {
    this.toggleState(
      'scrolled',
      (this.shadowRoot?.querySelector('.sbb-sidebar-content-section')?.scrollTop ?? 0) > 0,
    );
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-sidebar" @transitionend=${this._onTransitionEnd}>
      <div class="sbb-sidebar-title-section"><slot name="title-section"></slot></div>
      <div class="sbb-sidebar-content-section" @scroll=${() => this._detectScrolledState()}>
        <slot></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar': SbbSidebarElement;
  }
}
