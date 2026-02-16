import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbLanguageController } from '../core/controllers.ts';
import { forceType } from '../core/decorators.ts';
import { isZeroAnimationDuration } from '../core/dom.ts';
import { i18nCollapsed, i18nExpanded } from '../core/i18n.ts';
import type { SbbOpenedClosedState } from '../core/interfaces.ts';
import { SbbHydrationMixin, SbbSelectionPanelMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';

import style from './selection-expansion-panel.scss?lit&inline';

import '../divider.ts';

/**
 * It displays an expandable panel connected to a `sbb-checkbox` or to a `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox-panel` or `sbb-radio-button-panel` elements to the `sbb-selection-expansion-panel`.
 * @slot content - Use this slot to provide custom content for the panel (optional).
 */
export
@customElement('sbb-selection-expansion-panel')
class SbbSelectionExpansionPanelElement extends SbbSelectionPanelMixin(
  SbbHydrationMixin(LitElement),
) {
  // TODO: fix inheriting from SbbOpenCloseBaseElement requires: https://github.com/open-wc/custom-elements-manifest/issues/253
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    beforeopen: 'beforeopen',
    open: 'open',
    beforeclose: 'beforeclose',
    close: 'close',
  } as const;

  /** Whether the content section is always visible. */
  @forceType()
  @property({ attribute: 'force-open', type: Boolean })
  public accessor forceOpen: boolean = false;

  /** The state of the component. */
  @state()
  private set _state(state: SbbOpenedClosedState) {
    if (this._stateInternal) {
      this.internals.states.delete(`state-${this._stateInternal}`);
    }
    this._stateInternal = state;
    if (this._stateInternal) {
      this.internals.states.add(`state-${this._stateInternal}`);
    }
  }
  private get _state(): SbbOpenedClosedState {
    return this._stateInternal;
  }
  private _stateInternal!: SbbOpenedClosedState;

  private _language = new SbbLanguageController(this);

  /** Whether it has an expandable content */
  private get _hasContent(): boolean {
    // We cannot use the NamedSlots because it's too slow to initialize
    return this.querySelectorAll?.('[slot="content"]').length > 0;
  }

  public constructor() {
    super();

    this._state = 'closed';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('forceOpen')) {
      this._updateState();
    }
  }

  protected override onInputStateChange(): void {
    this._updateState();
  }

  private _updateState(): void {
    if (!this._hasContent) {
      return;
    }

    if (this.forceOpen || this.matches(':state(checked)')) {
      this._open();
    } else {
      this._close();
    }
    this._updateExpandedLabel(this.forceOpen || this.matches(':state(checked)'));
  }

  private _open(): void {
    if (this._state !== 'closed' && this._state !== 'closing') {
      return;
    }

    this._state = 'opening';
    /** Emits whenever the content section starts the opening transition. */
    this.dispatchEvent(new Event('beforeopen', { cancelable: true }));

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (!this.hasUpdated || this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  private _close(): void {
    if (this._state !== 'opened' && this._state !== 'opening') {
      return;
    }

    this._state = 'closing';
    /** Emits whenever the content section begins the closing transition. */
    this.dispatchEvent(new Event('beforeclose', { cancelable: true }));

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-selection-expansion-panel-animation-duration');
  }

  private _handleClosing(): void {
    this._state = 'closed';
    /** Emits whenever the content section is closed. */
    this.dispatchEvent(new Event('close'));
  }

  private _handleOpening(): void {
    this._state = 'opened';
    /** Emits whenever the content section is opened. */
    this.dispatchEvent(new Event('open'));
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open-opacity' && this._state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._handleClosing();
    }
  }

  private async _updateExpandedLabel(open: boolean): Promise<void> {
    await this.hydrationComplete;

    const panelElement = this.panel;
    if (!panelElement) {
      return;
    }

    if (!this._hasContent) {
      panelElement.expansionState = '';
      return;
    }

    panelElement.expansionState = open
      ? ', ' + i18nExpanded[this._language.current]
      : ', ' + i18nCollapsed[this._language.current];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-selection-expansion-panel__input">
        <slot></slot>
      </div>
      <div
        class="sbb-selection-expansion-panel__content--wrapper"
        ?inert=${this._state !== 'opened'}
        @animationend=${this._onAnimationEnd}
      >
        <div class="sbb-selection-expansion-panel__content">
          <sbb-divider></sbb-divider>
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-selection-expansion-panel': SbbSelectionExpansionPanelElement;
  }
}
