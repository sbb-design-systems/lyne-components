import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getOverride } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import type {
  SbbCheckedStateChange,
  SbbDisabledStateChange,
  SbbStateChange,
} from '../../core/interfaces/types.ts';
import {
  panelCommonStyle,
  SbbPanelMixin,
  type SbbPanelSize,
  SbbUpdateSchedulerMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { checkboxCommonStyle, SbbCheckboxCommonElementMixin } from '../common.ts';

import '../../screen-reader-only.ts';
import '../../visual-checkbox.ts';

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
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-checkbox-panel')
class SbbCheckboxPanelElement<T = string> extends SbbPanelMixin(
  SbbCheckboxCommonElementMixin(SbbUpdateSchedulerMixin(LitElement)),
) {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    checkboxCommonStyle,
    panelCommonStyle,
  ];

  /** Value of the form element. */
  @property()
  public accessor value: T | null = null;

  /**
   * Size variant, either m or s.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true })
  @getOverride((i, v) => (i.group?.size ? (i.group.size === 'xs' ? 's' : i.group.size) : v))
  public accessor size: SbbPanelSize = isLean() ? 's' : 'm';

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (name === 'checked') {
      this.internals.ariaChecked = `${this.checked}`;
      // As SbbFormAssociatedCheckboxMixin does not reflect checked property, we add a data-checked.
      this.toggleAttribute('data-checked', this.checked);
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      if (this.checked !== changedProperties.get('checked')!) {
        this._dispatchStateChange({ type: 'checked', checked: this.checked });
      }
    }
    if (changedProperties.has('disabled')) {
      if (this.disabled !== changedProperties.get('disabled')!) {
        this._dispatchStateChange({ type: 'disabled', disabled: this.disabled });
      }
    }
  }

  private _dispatchStateChange(detail: SbbCheckboxPanelStateChange): boolean {
    /**
     * @internal
     * Internal event that emits whenever the state of the checkbox
     * in relation to the parent selection panel changes.
     */
    return this.dispatchEvent(
      new CustomEvent<SbbCheckboxPanelStateChange>('statechange', { detail, bubbles: true }),
    );
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-selection-panel">
        <div class="sbb-selection-panel__badge">
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
            ${this.expansionState
              ? html`<sbb-screen-reader-only>${this.expansionState}</sbb-screen-reader-only>`
              : nothing}
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

  interface GlobalEventHandlersEventMap {
    statechange: CustomEvent<SbbStateChange>;
  }
}
