import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbButtonLikeBaseElement } from '../../core/base-elements.ts';
import { forceType, getOverride, omitEmptyConverter } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledTabIndexActionMixin,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import type { SbbTagGroupElement } from '../tag-group.ts';

import style from './tag.scss?lit&inline';

export type SbbTagSize = 's' | 'm';

/**
 * It displays a selectable element which can be used as a filter.
 *
 * @slot - Use the unnamed slot to add content to the tag label.
 * @slot icon - Use this slot to display an icon at the component start, by providing a `sbb-icon` component.
 * @slot amount - Provide an amount to show it at the component end.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-tag')
class SbbTagElement<T = string> extends SbbIconNameMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonLikeBaseElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    input: 'input',
    didChange: 'didChange',
    change: 'change',
  } as const;

  /** Value of the form element. */
  @property()
  public accessor value: T | null = null;

  /** Amount displayed inside the tag. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor amount: string = '';

  /** Whether the tag is checked. */
  @forceType()
  @property({ reflect: false, type: Boolean })
  public accessor checked: boolean = false;

  /**
   * Tag size, either s or m.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true })
  @getOverride((i, v) => i._group?.size ?? v)
  public accessor size: SbbTagSize = isLean() ? 's' : 'm';

  /** Reference to the connected tag group. */
  private _group: SbbTagGroupElement | null = null;

  public constructor() {
    super();
    this.addEventListener?.('click', () => this._handleClick());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._group = this.closest('sbb-tag-group') as SbbTagGroupElement;
  }

  protected override isDisabledExternally(): boolean {
    return this._group?.disabled ?? false;
  }

  /** Method triggered on button click. Inverts the checked value and emits events. */
  private _handleClick(): void {
    if (this.disabled) {
      return;
    }

    // Prevent deactivating on exclusive / radio mode
    const tagGroup = this.closest('sbb-tag-group');
    if (tagGroup && !tagGroup.multiple && this.checked) {
      return;
    }
    this.checked = !this.checked;

    /** The input event fires when the value has been changed as a direct result of a user action. */
    this.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        composed: true,
      }),
    );

    /**
     * The change event is fired when the user modifies the element's value.
     * Unlike the input event, the change event is not necessarily fired
     * for each alteration to an element's value.
     */
    this.dispatchEvent(new Event('change', { bubbles: true }));

    /**
     * Deprecated. Mirrors change event for React. Will be removed once React properly supports change events.
     * @deprecated
     */
    this.dispatchEvent(new Event('didChange', { bubbles: true }));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.internals.ariaPressed = `${this.checked}`;
      this.toggleState('checked', this.checked);
      this.updateFormValue();
    }

    const tagGroup = this.closest?.('sbb-tag-group');
    if (tagGroup && !tagGroup.multiple && changedProperties.has('checked') && this.checked) {
      tagGroup?.tags.filter((t) => t !== this).forEach((t) => (t.checked = false));
    }
  }

  /**
   * @internal
   */
  public override formResetCallback(): void {
    this.checked = this.hasAttribute('checked');
  }

  /**
   * @internal
   */
  public override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (state) {
      this.checked = state === 'true';
    }
  }

  protected override updateFormValue(): void {
    if (this.checked) {
      super.updateFormValue();
    } else {
      this.internals.setFormValue(null);
    }
  }

  protected override formState(): FormRestoreState {
    return `${this.checked}`;
  }

  protected override renderTemplate(): TemplateResult {
    return html`
      <span class="sbb-tag__icon sbb-tag--shift"> ${this.renderIconSlot()} </span>
      <span class="sbb-tag__text sbb-tag--shift">
        <slot></slot>
      </span>
      <span class="sbb-tag__amount sbb-tag--shift">
        <slot name="amount">${this.amount}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tag': SbbTagElement;
  }
}
