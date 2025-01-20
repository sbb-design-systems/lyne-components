import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { type CSSResultGroup, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  getFirstFocusableElement,
  SbbFocusHandler,
  setModalityOnNextFocus,
} from '../../core/a11y.js';
import { SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import { SbbInertController, SbbLanguageController } from '../../core/controllers.js';
import { forceType, handleDistinctChange } from '../../core/decorators.js';
import { isZeroAnimationDuration } from '../../core/dom.js';
import { i18nCloseNavigation } from '../../core/i18n.js';
import type { SbbTitleElement } from '../../title.js';
import type { SbbSidebarContainerElement } from '../sidebar-container.js';

import style from './sidebar.scss?lit&inline';

import '../../button/secondary-button.js';

/**
 * This component corresponds to a sidebar that can be opened on the sidebar container.
 *
 * @slot - Use the unnamed slot to slot any content into the sidebar.
 * @slot title - Use the title slot to add an <sbb-title>.
 * @event {CustomEvent<void>} willOpen - Emits when the opening animation starts.
 * @event {CustomEvent<void>} didOpen - Emits when the opening animation ends.
 * @event {CustomEvent<void>} willClose - Emits when the closing animation starts. Can be canceled.
 * @event {CustomEvent<void>} didClose - Emits when the closing animation ends.
 */
export
@customElement('sbb-sidebar')
class SbbSidebarElement extends SbbOpenCloseBaseElement {
  public static override styles: CSSResultGroup = style;

  /** Mode of the sidebar; one of 'side' or 'over'. */
  @forceType((v) => (v === 'over' ? 'over' : 'side'))
  @property({ reflect: true })
  public accessor mode: 'side' | 'over' = 'side';

  /**
   * Whether the sidebar is opened or closed.
   * Can be used to initially set the opened state.
   * The animation will be skipped.
   */
  @forceType()
  @property({ type: Boolean, reflect: true })
  public accessor opened: boolean = false;

  /** The side that the sidebar is attached to. */
  @forceType((v) => (v === 'end' ? 'end' : 'start'))
  @handleDistinctChange((instance, _newValue, oldValue) => instance._updateSidebarWidth(oldValue))
  @property({ reflect: true })
  public accessor position: 'start' | 'end' = 'start';

  @forceType((v) => (v === 'milk' ? 'milk' : 'white'))
  @property({ reflect: true })
  public accessor color: 'white' | 'milk' = 'white';

  /** Whether the close button should be hidden. */
  @forceType()
  @property({ attribute: 'hide-close-button', type: Boolean })
  public accessor hideCloseButton: boolean = false;

  /** Returns the SbbSidebarContainerElement where this sidebar is contained. */
  public get container(): SbbSidebarContainerElement | null {
    return this._container;
  }
  private _container: SbbSidebarContainerElement | null = null;

  private _language = new SbbLanguageController(this);
  private _lastFocusedElement: HTMLElement | null = null;
  private _focusHandler = new SbbFocusHandler();
  private _inertController = new SbbInertController(this);

  public constructor() {
    super();
    new ResizeController(this, {
      skipInitial: true,
      callback: () => this._updateSidebarWidth(),
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._container = this.closest?.('sbb-sidebar-container');
    this._updateSidebarWidth();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.container?.style.removeProperty(this._buildCssWidthVar());
    this._container = null;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('opened')) {
      if (this.opened && this.state === 'closed') {
        this.open();
      } else if (!this.opened && this.state === 'opened') {
        this.close();
      }
    }

    if (changedProperties.has('mode') && this.state === 'opened') {
      if (this.mode === 'over') {
        this._takeFocus();
      } else {
        this._unTrap();
      }
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._updateSidebarWidth();
  }

  /** Opens the sidebar. */
  public async open(): Promise<void> {
    if (this.state !== 'closed' || !this.willOpen.emit()) {
      return;
    }

    this._lastFocusedElement = document.activeElement as HTMLElement;

    const isZeroAnimationDuration = this._isZeroAnimationDuration();
    const isDuringInitialization = !this.hasUpdated;

    if (isDuringInitialization || isZeroAnimationDuration) {
      this.toggleAttribute('data-skip-animation', true);
    } else {
      this.state = 'opening';
    }

    if (isDuringInitialization) {
      // We have to wait for the first update to be completed
      // in order to have the size of the sidebar ready for the animation.
      await this.updateComplete;
    }

    this.opened = true;

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (isDuringInitialization || isZeroAnimationDuration) {
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
    setTimeout(() => this.toggleAttribute('data-skip-animation', false));

    if (this.mode === 'over') {
      this._takeFocus();
    }

    this.didOpen.emit();
  }

  /** Closes the sidebar. */
  public close(): void {
    if (this.state !== 'opened' || !this.willClose.emit()) {
      return;
    }

    const isZeroAnimationDuration = this._isZeroAnimationDuration();

    if (!this.hasUpdated || isZeroAnimationDuration) {
      // We have to ensure that removing the animation skip instruction is done a tick later.
      // Otherwise, it's removed too early and it doesn't have any effect.
      this.toggleAttribute('data-skip-animation', true);
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
    setTimeout(() => this.toggleAttribute('data-skip-animation', false));
    this._unTrap();

    if (
      this._lastFocusedElement &&
      (this.contains(document.activeElement) || this.mode === 'over')
    ) {
      setModalityOnNextFocus(this._lastFocusedElement);
      this._lastFocusedElement?.focus();
    }
    this._lastFocusedElement = null;

    this.didClose.emit();
  }

  private _takeFocus(): void {
    this._inertController.activate();
    const firstFocusable = getFirstFocusableElement(
      [this.shadowRoot!.querySelector('.sbb-sidebar-close-button')]
        .concat(Array.from(this.children))
        .filter((e): e is HTMLElement => e instanceof window.HTMLElement),
    );
    setModalityOnNextFocus(firstFocusable);
    firstFocusable?.focus();
    this._focusHandler.trap(this);
  }

  private _unTrap(): void {
    if (this._inertController.isInert()) {
      this._inertController.deactivate();
    }
    this._focusHandler.disconnect();
  }

  /** Toggles the sidebar visibility. */
  public toggle(): void {
    if (this.state === 'opened') {
      this.close();
    } else if (this.state === 'closed') {
      this.open();
    }
  }

  private _updateSidebarWidth(oldPosition?: 'start' | 'end'): void {
    const container = this.container;
    if (!container) {
      return;
    }

    if (oldPosition) {
      container.style.removeProperty(this._buildCssWidthVar(oldPosition));
    }

    const width = this.offsetWidth ?? 0;
    if (width === 0) {
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
    return `--sbb-sidebar-container-${position}-width`;
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  private _syncTitleSize(event: Event): void {
    const slotNodes = (event.target as HTMLSlotElement).assignedNodes();

    slotNodes
      .filter((el) => (el as HTMLElement).localName === 'sbb-title')
      .forEach((titleElement) => ((titleElement as SbbTitleElement).visualLevel = '5'));
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-sidebar" @animationend=${this._onAnimationEnd}>
      <div class="sbb-sidebar-title-container">
        <slot name="title" @slotchange=${this._syncTitleSize}></slot>${!this.hideCloseButton
          ? html`<sbb-secondary-button
              icon-name="cross-small"
              size="s"
              class="sbb-sidebar-close-button"
              @click=${() => this.close()}
              aria-label=${i18nCloseNavigation[this._language.current]}
            ></sbb-secondary-button>`
          : nothing}
      </div>
      <div class="sbb-sidebar-content"><slot></slot></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar': SbbSidebarElement;
  }
}
