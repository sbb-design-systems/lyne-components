import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { panelCommonStyle, SbbPanelMixin, SbbUpdateSchedulerMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { radioButtonCommonStyle, SbbRadioButtonCommonElementMixin } from '../common.ts';

import '../../screen-reader-only.ts';

/**
 /**
 * It displays a radio button enhanced with the panel design.
 *
 * @slot - Use the unnamed slot to add content to the radio label.
 * @slot subtext - Slot used to render a subtext under the label.
 * @slot suffix - Slot used to render additional content after the label.
 * @slot badge - Use this slot to provide a `sbb-card-badge` (optional).
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-radio-button-panel')
class SbbRadioButtonPanelElement<T = string> extends SbbPanelMixin(
  SbbRadioButtonCommonElementMixin(SbbUpdateSchedulerMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    radioButtonCommonStyle,
    panelCommonStyle,
  ];

  // TODO: fix using ...super.events requires: https://github.com/sbb-design-systems/lyne-components/issues/2600
  public static readonly events = {
    change: 'change',
    input: 'input',
  } as const;

  /**
   * The value of the form element
   */
  @property()
  public accessor value: T | null = null;

  private _hasSelectionPanelElement: boolean = false;

  public override connectedCallback(): void {
    super.connectedCallback();
    this._hasSelectionPanelElement = !!this.closest?.(
      'sbb-selection-expansion-panel, sbb-selection-action-panel',
    );
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.toggleState('checked', this.checked);
    }
  }

  /**
   * As an exception, panels with a selection-panel attached are always focusable
   */
  protected override updateFocusableRadios(): void {
    super.updateFocusableRadios();
    const radios = Array.from(this.associatedRadioButtons ?? []) as SbbRadioButtonPanelElement[];

    radios
      .filter((r) => !r.disabled && r._hasSelectionPanelElement)
      .forEach((r) => (r.tabIndex = 0));
  }

  /**
   * As an exception, radio-panels with a selection-panel attached are not checked automatically when navigating by keyboard
   */
  protected override async navigateByKeyboard(next: SbbRadioButtonPanelElement): Promise<void> {
    if (!this._hasSelectionPanelElement) {
      await super.navigateByKeyboard(next);
    } else {
      next.focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-selection-panel">
        <div class="sbb-selection-panel__badge">
          <slot name="badge"></slot>
        </div>
        <span class="sbb-radio-button">
          <span class="sbb-radio-button__label-slot">
            <slot></slot>
            <slot name="suffix"></slot>
          </span>
          <slot name="subtext"></slot>
          ${this.expansionState
            ? html`<sbb-screen-reader-only>${this.expansionState}</sbb-screen-reader-only>`
            : nothing}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-radio-button-panel': SbbRadioButtonPanelElement;
  }
}
