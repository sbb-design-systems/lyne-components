import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import {
  forceType,
  getOverride,
  hostAttributes,
  omitEmptyConverter,
  slotState,
} from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledTabIndexActionMixin,
} from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbTagGroupElement } from '../tag-group.js';

import style from './tag.scss?lit&inline';

export type SbbTagSize = 's' | 'm';

/**
 * It displays a selectable element which can be used as a filter.
 *
 * @slot - Use the unnamed slot to add content to the tag label.
 * @slot icon - Use this slot to display an icon at the component start, by providing a `sbb-icon` component.
 * @slot amount - Provide an amount to show it at the component end.
 * @event {CustomEvent<void>} input - Input event emitter
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {CustomEvent<void>} change - Change event emitter
 */
export
@customElement('sbb-tag')
@slotState()
@hostAttributes({
  'aria-pressed': 'false',
})
class SbbTagElement extends SbbIconNameMixin(SbbDisabledTabIndexActionMixin(SbbButtonBaseElement)) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    input: 'input',
    didChange: 'didChange',
    change: 'change',
  } as const;

  /** Amount displayed inside the tag. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor amount: string = '';

  /** Whether the tag is checked. */
  @property({ reflect: false, type: Boolean })
  public set checked(value: boolean) {
    this._checked = value;
    this.updateFormValue();
  }

  public get checked(): boolean {
    return this._checked;
  }

  private _checked = false;

  /**
   * Tag size, either s or m.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true })
  @getOverride((i, v) => i._group?.size ?? v)
  public accessor size: SbbTagSize = isLean() ? 's' : 'm';

  /** Reference to the connected tag group. */
  private _group: SbbTagGroupElement | null = null;

  /** Input event emitter */
  private _input: EventEmitter = new EventEmitter(this, SbbTagElement.events.input, {
    bubbles: true,
    composed: true,
  });

  /** @deprecated only used for React. Will probably be removed once React 19 is available. */
  private _didChange: EventEmitter = new EventEmitter(this, SbbTagElement.events.didChange, {
    bubbles: true,
  });

  /** Change event emitter */
  private _change: EventEmitter = new EventEmitter(this, SbbTagElement.events.change, {
    bubbles: true,
  });

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
    this._input.emit();
    this._change.emit();
    this._didChange.emit();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.setAttribute('aria-pressed', `${this.checked}`);
      this.toggleAttribute('data-checked', this.checked);
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
      this.internals.setFormValue(this.value, `${this.checked}`);
    } else {
      this.internals.setFormValue(null);
    }
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
