import { CSSResultGroup, html, LitElement, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { setAttribute } from '../../core/dom';
import { ConnectedAbortController } from '../../core/eventing';
import type { SbbTag, SbbTagStateChange } from '../tag';

import style from './tag-group.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-tag`.
 *
 * @slot - Use the unnamed slot to add one or more 'sbb-tag' elements to the `sbb-tag-group`.
 */
@customElement('sbb-tag-group')
export class SbbTagGroup extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * This will be forwarded as aria-label to the inner list.
   */
  @property({ attribute: 'list-accessibility-label' }) public listAccessibilityLabel?: string;

  /**
   * If set multiple to false, the selection is exclusive and the value is a string (or null).
   * If set multiple to true, the selection can have multiple values and therefore value is an array.
   *
   * Changing multiple during run time is not supported.
   */
  @property({ type: Boolean }) public multiple = false;

  /**
   * Value of the sbb-tag-group.
   * If set multiple to false, the value is a string (or null).
   * If set multiple to true, the value is an array.
   */
  @property()
  public set value(value: string | string[] | null) {
    this._value = value;
    this._valueChanged(this._value);
  }
  public get value(): string | string[] | null {
    return this._value;
  }
  private _value: string | string[] | null = null;

  private _abort = new ConnectedAbortController(this);

  /**
   * We hold the slotted elements in a separate state than the tags itself.
   * In rare usages, consumers need to slot other elements than tags into the tag group.
   */
  @state() private _slottedElements: HTMLElement[];

  private _valueChanged(value: string | string[] | null): void {
    if (this._tags.some((tag) => !tag.value)) {
      return;
    }

    if (Array.isArray(value) && !this.multiple) {
      console.warn(
        'Trying to set array value for sbb-tag-group but multiple mode is not activated.',
        value,
      );
      return;
    } else if (!Array.isArray(value) && this.multiple) {
      try {
        // If possible, try to parse JSON and restart to assign value.
        this.value = JSON.parse(value);
      } catch {
        console.warn(
          'Expected value to be an array because sbb-tag-group multiple mode is activated.',
          value,
        );
      }
      return;
    }

    const isChecked: (tag: SbbTag) => boolean = this.multiple
      ? (t) => value.includes(t.value)
      : (t) => t.value === value;

    this._tags.forEach((tag) => (tag.checked = isChecked(tag)));
  }

  private _ensureOnlyOneTagSelected(): void {
    if (this.multiple) {
      return;
    }

    // Ensure only one tag checked
    this._tags
      .filter((tag) => tag.checked)
      .slice(1)
      .forEach((tag) => (tag.checked = false));
  }

  private _handleStateChange(event: CustomEvent<SbbTagStateChange>): void {
    const target = event.target as SbbTag;
    event.stopPropagation();

    if (this.multiple || (event.detail.type === 'checked' && !event.detail.checked)) {
      // If multiple or if value was unchecked, read state from toggles
      this._updateValueByReadingTags();
    } else if (event.detail.type === 'value') {
      // If a value has changed in exclusive mode (only checked are reported), directly assign it.
      this.value = event.detail.value;
    } else if (event.detail.type === 'checked' && event.detail.checked) {
      // If a value was checked in exclusive mode, assign this value directly.
      this.value = target.value;
    }
  }

  private _updateValueByReadingTags(): void {
    if (this.multiple) {
      this.value = this._tags.filter((tag) => tag.checked).map((tag) => tag.value);
    } else {
      this.value = this._tags.find((tag) => tag.checked)?.value || null;
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._readSlottedElements();
    const signal = this._abort.signal;
    this.addEventListener(
      'state-change',
      (e: CustomEvent<SbbTagStateChange>) => this._handleStateChange(e),
      {
        signal,
        passive: true,
      },
    );
    if (this.value) {
      this._valueChanged(this.value);
    }
  }

  private get _tags(): SbbTag[] {
    return Array.from(this.querySelectorAll?.('sbb-tag') ?? []) as SbbTag[];
  }

  private _readSlottedElements(): void {
    this._slottedElements = Array.from(this.children ?? []).filter(
      (e): e is HTMLElement => e instanceof window.HTMLElement,
    );
  }

  protected override render(): TemplateResult {
    this._slottedElements.forEach((tag, index) => tag.setAttribute('slot', `tag-${index}`));

    setAttribute(this, 'role', this.listAccessibilityLabel ? '' : 'group');

    return html`
      <div class="sbb-tag-group">
        <ul class="sbb-tag-group__list" aria-label=${this.listAccessibilityLabel ?? nothing}>
          ${this._slottedElements.map(
            (_, index) =>
              html`<li class="sbb-tag-group__list-item">
                <slot
                  name=${`tag-${index}`}
                  @slotchange=${(): void => {
                    this._readSlottedElements();
                    this._ensureOnlyOneTagSelected();
                    this._updateValueByReadingTags();
                  }}
                ></slot>
              </li>`,
          )}
        </ul>
        <span hidden>
          <slot
            @slotchange=${() => {
              this._readSlottedElements();
              this._ensureOnlyOneTagSelected();
              this._updateValueByReadingTags();
            }}
          ></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tag-group': SbbTagGroup;
  }
}
