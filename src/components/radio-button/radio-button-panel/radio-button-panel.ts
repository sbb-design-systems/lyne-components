import { LitElement, html, nothing, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { SbbLanguageController, SbbSlotStateController } from '../../core/controllers.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import { i18nCollapsed, i18nExpanded } from '../../core/i18n.js';
import { SbbUpdateSchedulerMixin } from '../../core/mixins.js';
import type { SbbSelectionExpansionPanelElement } from '../../selection-expansion-panel.js';
import {
  SbbRadioButtonCommonElementMixin,
  commonStyle,
  type SbbRadioButtonStateChange,
} from '../common/index.js';

import '../../screen-reader-only.js';
import radioButtonPanelStyle from './radio-button-panel.scss?lit&inline';

/**
 /**
 * It displays a radio button enhanced with the selection panel design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @slot subtext - Slot used to render a subtext under the label (only visible within a `sbb-selection-expansion-panel`).
 * @slot suffix - Slot used to render additional content after the label (only visible within a `sbb-selection-expansion-panel`).
 */
@customElement('sbb-radio-button-panel')
export class SbbRadioButtonPanelElement extends SbbRadioButtonCommonElementMixin(
  SbbUpdateSchedulerMixin(LitElement),
) {
  public static override styles: CSSResultGroup = [commonStyle, radioButtonPanelStyle];
  public static readonly events = {
    stateChange: 'stateChange',
    radioButtonLoaded: 'radioButtonLoaded',
  } as const;

  /**
   * Whether the input is the main input of a selection panel.
   * @internal
   */
  public get isSelectionPanelInput(): boolean {
    return this._isSelectionPanelInput;
  }
  @state() private _isSelectionPanelInput = false;

  /**
   * The label describing whether the selection panel is expanded (for screen readers only).
   */
  @state() private _selectionPanelExpandedLabel?: string;

  private _selectionPanelElement: SbbSelectionExpansionPanelElement | null = null;
  private _language = new SbbLanguageController(this);

  /**
   * @internal
   * Internal event that emits whenever the state of the radio option
   * in relation to the parent selection panel changes.
   */
  private _stateChange: EventEmitter<SbbRadioButtonStateChange> = new EventEmitter(
    this,
    SbbRadioButtonPanelElement.events.stateChange,
    { bubbles: true },
  );

  /**
   * @internal
   * Internal event that emits when the radio button is loaded.
   */
  private _radioButtonLoaded: EventEmitter<void> = new EventEmitter(
    this,
    SbbRadioButtonPanelElement.events.radioButtonLoaded,
    { bubbles: true },
  );

  protected override handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this.setAttribute('aria-checked', `${currentValue}`);
      this._stateChange.emit({ type: 'checked', checked: currentValue });
      this._isSelectionPanelInput && this._updateExpandedLabel();
    }
  }

  protected override handleDisabledChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      setOrRemoveAttribute(this, 'aria-disabled', currentValue ? 'true' : null);
      this._stateChange.emit({ type: 'disabled', disabled: currentValue });
    }
  }

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // We can use closest here, as we expect the parent sbb-selection-expansion-panel to be in light DOM.
    this._selectionPanelElement = this.closest('sbb-selection-expansion-panel');
    this._isSelectionPanelInput =
      !!this._selectionPanelElement &&
      !this.closest('sbb-selection-expansion-panel [slot="content"]');

    this.toggleAttribute('data-is-selection-panel-input', this._isSelectionPanelInput);

    this._radioButtonLoaded.emit();

    // We need to call requestUpdate to update the reflected attributes
    ['disabled', 'required'].forEach((p) => this.requestUpdate(p));
  }

  protected override firstUpdated(): void {
    // We need to wait for the selection-panel to be fully initialized
    this.startUpdate();
    setTimeout(() => {
      this._isSelectionPanelInput && this._updateExpandedLabel();
      this.completeUpdate();
    });
  }

  private _updateExpandedLabel(): void {
    if (!this._selectionPanelElement?.hasContent) {
      this._selectionPanelExpandedLabel = '';
      return;
    }

    this._selectionPanelExpandedLabel = this.checked
      ? ', ' + i18nExpanded[this._language.current]
      : ', ' + i18nCollapsed[this._language.current];
  }

  protected override render(): TemplateResult {
    return html`
      <label class="sbb-radio-button">
        <input
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?checked=${this.checked}
          value=${this.value || nothing}
          class="sbb-radio-button__input"
        />
        <span class="sbb-radio-button__label-slot">
          <slot></slot>
          <slot name="suffix"></slot>
        </span>
        <slot name="subtext"></slot>
        ${this._selectionPanelExpandedLabel
          ? html`<sbb-screen-reader-only>
              ${this._selectionPanelExpandedLabel}
            </sbb-screen-reader-only>`
          : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-panel': SbbRadioButtonPanelElement;
  }
}
