import type { CSSResultGroup, PropertyDeclaration, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isLean } from '../core/dom.ts';
import { SbbFormAssociatedCheckboxMixin } from '../core/mixins.ts';
import { boxSizingStyles } from '../core/styles.ts';
import { SbbIconNameMixin } from '../icon.ts';

import style from './toggle-check.scss?lit&inline';

/**
 * It displays a toggle checkbox.
 *
 * @slot - Use the unnamed slot to add content to the toggle label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @event {Event} change - The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires when the value has been changed as a direct result of a user action.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-toggle-check')
class SbbToggleCheckElement<T = string> extends SbbIconNameMixin(
  SbbFormAssociatedCheckboxMixin(LitElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Value of the form element. */
  @property()
  public accessor value: T | null = null;

  /**
   * Size variant, either m, s or xs.
   * @default 's' / 'xs' (lean)
   */
  @property({ reflect: true }) public accessor size: 'xs' | 's' | 'm' = isLean() ? 'xs' : 's';

  /** The label position relative to the toggle. Defaults to 'after' */
  @property({ attribute: 'label-position', reflect: true })
  public accessor labelPosition: 'before' | 'after' = 'after';

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (name === 'checked') {
      this.internals.ariaChecked = `${this.checked}`;
      // As SbbFormAssociatedCheckboxMixin does not reflect checked property, we add a checked state.
      this.toggleState('checked', this.checked);
    }
  }

  protected override renderIconName(): string {
    return super.renderIconName() || 'tick-small';
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-toggle-check">
        <span class="sbb-toggle-check__container">
          <span class="sbb-toggle-check__label">
            <slot></slot>
          </span>
          <span class="sbb-toggle-check__track">
            <span class="sbb-toggle-check__circle">
              <span class="sbb-toggle-check__icon"> ${this.renderIconSlot()} </span>
            </span>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-check': SbbToggleCheckElement;
  }
}
