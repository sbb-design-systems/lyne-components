import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { type CSSResultGroup, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbOpenCloseBaseElement } from '../../core/base-elements.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { forceType } from '../../core/decorators.js';
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

  /** Mode of the sidebar; one of 'over' or 'side'. */
  @property({ reflect: true })
  public accessor mode: 'over' | 'side' = 'side';

  // TODO: Discuss conflicts with data-state, isOpen and whether it should be reflected.
  /**
   * Whether the sidebar is opened or closed.
   * Can be used to initially set the opened state.
   * The animation will be skipped.
   */
  @forceType()
  @property({ type: Boolean, reflect: true })
  public accessor opened: boolean = false;

  /** The side that the sidebar is attached to. */
  @property({ reflect: true })
  public set position(value: 'start' | 'end') {
    // Make sure we have a valid value.
    value = value === 'end' ? 'end' : 'start';

    if (value !== this._position) {
      const oldPosition = this._position!;
      this._position = value;
      this._updateContentMargins(oldPosition);
    }
  }
  public get position(): 'start' | 'end' {
    return this._position!;
  }
  private _position?: 'start' | 'end';

  @property({ reflect: true })
  public accessor color: 'white' | 'milk' = 'white';

  /** Whether the close button should be hidden. */
  @forceType()
  @property({ attribute: 'hide-close-button', type: Boolean })
  public accessor hideCloseButton: boolean = false;

  /** Returns the SbbSidebarContainerElement where this sidebar is contained. */
  public get container(): SbbSidebarContainerElement | null {
    return this.closest?.('sbb-sidebar-container');
  }

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.position ||= 'start';
    new ResizeController(this, {
      skipInitial: true,
      callback: () => this._updateContentMargins(),
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._updateContentMargins();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.container?.style.removeProperty(`--sbb-sidebar-container-${this.position}-width`);
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('opened')) {
      if (this.opened && this.state === 'closed') {
        this.open(true);
      } else if (!this.opened && this.state === 'opened') {
        this.close(true);
      }
    }
  }

  /**
   * Opens the sidebar.
   * @param skipAnimation whether to skip the animation
   */
  public open(skipAnimation = false): void {
    if (this.state !== 'closed' || !this.willOpen.emit()) {
      return;
    }

    if (skipAnimation || this._isZeroAnimationDuration()) {
      this.toggleAttribute('data-skip-animation', true);
    }

    this.state = 'opening';
    this.opened = true;

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (skipAnimation || this._isZeroAnimationDuration()) {
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
    this.didOpen.emit();
  }

  /**
   * Closes the sidebar.
   * @param skipAnimation whether to skip the animation
   */
  public close(skipAnimation = false): void {
    if (this.state !== 'opened' || !this.willClose.emit()) {
      return;
    }

    if (skipAnimation || this._isZeroAnimationDuration()) {
      // We have to ensure that removing the animation skip instruction is done a tick later.
      // Otherwise, it's removed too early and it doesn't have any effect.
      this.toggleAttribute('data-skip-animation', true);
    }

    this.state = 'closing';

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (skipAnimation || this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _handleClosing(): void {
    this.state = 'closed';
    this.opened = false;
    setTimeout(() => this.toggleAttribute('data-skip-animation', false));
    this.didClose.emit();
  }

  private _updateContentMargins(oldPosition?: 'start' | 'end'): void {
    const container = this.container;
    if (!container) {
      return;
    }

    if (oldPosition) {
      container.style.removeProperty(`--sbb-sidebar-container-${oldPosition}-width`);
    }

    const width = this.offsetWidth ?? 0;
    if (width === 0) {
      return;
    }

    const newValue = `${width}px`;
    const actualValue = getComputedStyle(container).getPropertyValue(
      `--sbb-sidebar-container-${this.position}-width`,
    );

    if (actualValue === newValue) {
      return;
    }

    container.style.setProperty(`--sbb-sidebar-container-${this.position}-width`, newValue);
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
