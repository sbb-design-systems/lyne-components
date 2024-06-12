import {
  LitElement,
  html,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSlotStateController } from '../../core/controllers.js';
import { EventEmitter } from '../../core/eventing.js';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces/types.js';
import { SbbPanelMixin, SbbUpdateSchedulerMixin, panelCommonStyle } from '../../core/mixins.js';
import { SbbCheckboxCommonElementMixin, checkboxCommonStyle } from '../common.js';

import '../../visual-checkbox.js';

export type SbbCheckboxPanelStateChange = Extract<
  SbbStateChange,
  SbbDisabledStateChange | SbbCheckedStateChange
>;

/**
 * It displays a checkbox enhanced with selection panel design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-checkbox`.
 * @slot subtext - Slot used to render a subtext under the label (only visible within a selection panel).
 * @slot suffix - Slot used to render additional content after the label (only visible within a selection panel).
 * @slot badge - Use this slot to provide a `sbb-card-badge` (optional).
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {Event} change - Event fired on change.
 * @event {InputEvent} input - Event fired on input.
 */
@customElement('sbb-checkbox-panel')
export class SbbCheckboxPanelElement extends SbbPanelMixin(
  SbbCheckboxCommonElementMixin(SbbUpdateSchedulerMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [checkboxCommonStyle, panelCommonStyle];

  public static readonly events = {
    didChange: 'didChange',
    stateChange: 'stateChange',
    checkboxLoaded: 'checkboxLoaded',
  } as const;

  /**
   * @internal
   * Internal event that emits whenever the state of the checkbox
   * in relation to the parent selection panel changes.
   */
  protected stateChange: EventEmitter<SbbCheckboxPanelStateChange> = new EventEmitter(
    this,
    SbbCheckboxPanelElement.events.stateChange,
    { bubbles: true },
  );

  /**
   * @internal
   * Internal event that emits when the checkbox is loaded.
   */
  private _checkboxLoaded: EventEmitter<void> = new EventEmitter(
    this,
    SbbCheckboxPanelElement.events.checkboxLoaded,
    { bubbles: true },
  );

  public constructor() {
    super();
    new SbbSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._checkboxLoaded.emit();
  }

  protected override async willUpdate(changedProperties: PropertyValues<this>): Promise<void> {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      // As SbbFormAssociatedCheckboxMixin does not reflect checked property, we add a data-checked.
      this.toggleAttribute('data-checked', this.checked);

      if (this.checked !== changedProperties.get('checked')!) {
        this.stateChange.emit({ type: 'checked', checked: this.checked });
      }
    }
    if (changedProperties.has('disabled')) {
      if (this.disabled !== changedProperties.get('disabled')!) {
        this.stateChange.emit({ type: 'disabled', disabled: this.disabled });
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-selection-panel">
        <div class="sbb-selection-expansion-panel__badge">
          <slot name="badge"></slot>
        </div>
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
          </span>
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
