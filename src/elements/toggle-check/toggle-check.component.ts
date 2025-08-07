import type { CSSResultGroup, PropertyDeclaration, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, slotState } from '../core/decorators.js';
import { isLean } from '../core/dom.js';
import { SbbFormAssociatedCheckboxMixin } from '../core/mixins.js';
import { SbbIconNameMixin } from '../icon.js';

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
@slotState()
class SbbToggleCheckElement<T = string> extends SbbFormAssociatedCheckboxMixin(
  SbbIconNameMixin(LitElement),
) {
  public static override styles: CSSResultGroup = style;

  /** Value of the form element. */
  @property()
  public accessor value: T | null = null;

  /**
   * Size variant, either m, s or xs.
   * @default 's' / 'xs' (lean)
   */
  @property({ reflect: true }) public accessor size: 'xs' | 's' | 'm' = isLean() ? 'xs' : 's';

  /** The svg name for the true state - default -> 'tick-small' */
  @forceType()
  @property({ attribute: 'icon-name' })
  public override accessor iconName: string = 'tick-small';

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
      // As SbbFormAssociatedCheckboxMixin does not reflect checked property, we add a data-checked.
      this.toggleAttribute('data-checked', this.checked);
    }
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
