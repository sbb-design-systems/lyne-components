import {
  LitElement,
  html,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { SbbLanguageController, SbbSlotStateController } from '../../core/controllers.js';
import { i18nCollapsed, i18nExpanded } from '../../core/i18n.js';
import { SbbUpdateSchedulerMixin } from '../../core/mixins.js';
import type { SbbSelectionExpansionPanelElement } from '../../selection-expansion-panel.js';
import { SbbCheckboxCommonElementMixin, commonStyle } from '../common.js';

import '../../screen-reader-only.js';
import '../../visual-checkbox.js';

import checkboxPanelStyle from './checkbox-panel.scss?lit&inline';

/**
 * It displays a checkbox enhanced with selection panel design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-checkbox`.
 * @slot subtext - Slot used to render a subtext under the label (only visible within a selection panel).
 * @slot suffix - Slot used to render additional content after the label (only visible within a selection panel).
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {Event} change - Event fired on change.
 * @event {InputEvent} input - Event fired on input.
 */
@customElement('sbb-checkbox-panel')
export class SbbCheckboxPanelElement extends SbbCheckboxCommonElementMixin(
  SbbUpdateSchedulerMixin(LitElement),
) {
  public static override styles: CSSResultGroup = [commonStyle, checkboxPanelStyle];

  /**
   * Whether the input is the main input of a selection panel.
   * @internal
   */
  public get isSelectionPanelInput(): boolean {
    return this.hasAttribute('data-is-selection-panel-input');
  }

  /** The label describing whether the selection panel is expanded (for screen readers only). */
  @state() private _selectionPanelExpandedLabel!: string;

  private _selectionPanelElement: SbbSelectionExpansionPanelElement | null = null;
  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // We can use closest here, as we expect the parent sbb-selection-expansion-panel to be in light DOM.
    this._selectionPanelElement = this.closest?.('sbb-selection-expansion-panel');
    this.toggleAttribute('data-is-inside-selection-panel', !!this._selectionPanelElement);
    this.toggleAttribute(
      'data-is-selection-panel-input',
      !!this._selectionPanelElement &&
        !this.closest?.('sbb-selection-expansion-panel [slot="content"]'),
    );

    this.checkboxLoaded.emit();

    // We need to call requestUpdate to update the reflected attributes
    ['disabled', 'required'].forEach((p) => this.requestUpdate(p));
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    // We need to wait for the selection-panel to be fully initialized
    this.startUpdate();
    setTimeout(() => {
      this.isSelectionPanelInput && this._updateExpandedLabel();
      this.completeUpdate();
    });
  }

  protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      if (this.isSelectionPanelInput && this.checked !== changedProperties.get('checked')!) {
        this.stateChange.emit({ type: 'checked', checked: this.checked });
        this._updateExpandedLabel();
      }
    }
    if (changedProperties.has('disabled')) {
      if (this.isSelectionPanelInput && this.disabled !== changedProperties.get('disabled')!) {
        this.stateChange.emit({ type: 'disabled', disabled: this.disabled });
      }
    }
  }

  private async _updateExpandedLabel(): Promise<void> {
    await this.hydrationComplete;
    if (!this._selectionPanelElement?.hasContent) {
      this._selectionPanelExpandedLabel = '';
      this.removeAttribute('data-has-selection-expansion-panel-label');
      return;
    }

    this._selectionPanelExpandedLabel = this.checked
      ? ', ' + i18nExpanded[this._language.current]
      : ', ' + i18nCollapsed[this._language.current];
    this.toggleAttribute('data-has-selection-expansion-panel-label', true);
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-checkbox-wrapper">
        <span class="sbb-checkbox">
          <span class="sbb-checkbox__inner">
            <span class="sbb-checkbox__aligner">
              <sbb-visual-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled || this.formDisabled}
              ></sbb-visual-checkbox>
            </span>
            <span class="sbb-checkbox__label">
              <slot></slot>
              <slot name="suffix"></slot>
            </span>
          </span>
          <slot name="subtext"></slot>
          <sbb-screen-reader-only class="sbb-checkbox__expanded-label">
            ${this._selectionPanelExpandedLabel}
          </sbb-screen-reader-only>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox-panel': SbbCheckboxPanelElement;
  }
}
