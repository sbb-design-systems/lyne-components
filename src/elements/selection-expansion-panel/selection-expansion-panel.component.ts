import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { SbbCheckboxPanelElement } from '../checkbox.js';
import { SbbLanguageController } from '../core/controllers.js';
import { forceType, slotState } from '../core/decorators.js';
import { isZeroAnimationDuration } from '../core/dom.js';
import { boxSizingStyles } from '../core/host.js';
import { i18nCollapsed, i18nExpanded } from '../core/i18n.js';
import type { SbbOpenedClosedState, SbbStateChange } from '../core/interfaces.js';
import { SbbHydrationMixin, SbbSelectionPanelMixin } from '../core/mixins.js';
import type { SbbRadioButtonPanelElement } from '../radio-button.js';

import style from './selection-expansion-panel.scss?lit&inline';

import '../divider.js';

/**
 * It displays an expandable panel connected to a `sbb-checkbox` or to a `sbb-radio-button`.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox` or `sbb-radio-button` elements to the `sbb-selection-expansion-panel`.
 * @slot content - Use this slot to provide custom content for the panel (optional).
 */
export
@customElement('sbb-selection-expansion-panel')
@slotState()
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

  /** The state of the selection panel. */
  @state()
  private set _state(state: SbbOpenedClosedState) {
    this.setAttribute('data-state', state);
  }
  private get _state(): SbbOpenedClosedState {
    return this.getAttribute('data-state') as SbbOpenedClosedState;
  }

  private _language = new SbbLanguageController(this);

  /** Whether it has an expandable content */
  private get _hasContent(): boolean {
    // We cannot use the NamedSlots because it's too slow to initialize
    return this.querySelectorAll?.('[slot="content"]').length > 0;
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._state ||= 'closed';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('forceOpen')) {
      this._updateState();
    }
  }

  protected override initFromInput(event: Event): void {
    super.initFromInput(event);
    this._updateState();
  }

  protected override onInputStateChange(event: CustomEvent<SbbStateChange>): void {
    super.onInputStateChange(event);
    this._updateState();
  }

  private _updateState(): void {
    if (!this._hasContent) {
      return;
    }

    if (this.forceOpen || this.checked) {
      this._open();
    } else {
      this._close();
    }
    this._updateExpandedLabel(this.forceOpen || this.checked);
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

    const panelElement = this.querySelector<SbbRadioButtonPanelElement | SbbCheckboxPanelElement>(
      'sbb-radio-button-panel, sbb-checkbox-panel',
    );
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
      <div class="sbb-selection-expansion-panel">
        <div class="sbb-selection-expansion-panel__input" @statechange=${this.onInputStateChange}>
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
