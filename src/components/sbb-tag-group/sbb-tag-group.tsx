import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';
import { TagStateChange } from '../sbb-tag/sbb-tag.custom';

/**
 * @slot unnamed - Provide one or more 'sbb-tag' to add to the group.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tag-group.scss',
  tag: 'sbb-tag-group',
})
export class SbbTagGroup implements ComponentInterface {
  @Element() private _element: HTMLElement;

  /**
   * This will be forwarded as aria-label to the inner list.
   */
  @Prop() public listAccessibilityLabel?: string;

  /**
   * If set multiple to false, the selection is exclusive and the value is a string (or null).
   * If set multiple to true, the selection can have multiple values and therefore value is an array.
   *
   * Changing multiple during run time is not supported.
   */
  @Prop() public multiple = false;

  /**
   * Value of the sbb-tag-group.
   * If set multiple to false, the value is a string (or null).
   * If set multiple to true, the value is an array.
   */
  @Prop({ mutable: true }) public value: string | string[] | null = null;

  @Watch('value')
  public valueChanged(value: string | string[] | null): void {
    if (Array.isArray(value) && !this.multiple) {
      console.warn(
        'Trying to set array value for sbb-tag-group but multiple mode is not activated.',
        value
      );
      return;
    } else if (!Array.isArray(value) && this.multiple) {
      try {
        // If possible, try to parse JSON and restart to assign value.
        this.value = JSON.parse(value);
      } catch {
        console.warn(
          'Expected value to be an array because sbb-tag-group multiple mode is activated.',
          value
        );
      }
      return;
    }

    const isChecked: (tag: HTMLSbbTagElement) => boolean = this.multiple
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

  @Listen('state-change', { passive: true })
  public handleStateChange(event: CustomEvent<TagStateChange>): void {
    const target: HTMLSbbTagElement = event.target as HTMLSbbTagElement;
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

  public connectedCallback(): void {
    if (this.value) {
      this.valueChanged(this.value);
    }
  }

  private get _tags(): HTMLSbbTagElement[] {
    return Array.from(this._element.querySelectorAll('sbb-tag')) as HTMLSbbTagElement[];
  }

  public render(): JSX.Element {
    this._tags.forEach((tag, index) => tag.setAttribute('slot', `tag-${index}`));
    return (
      <Host role={this.listAccessibilityLabel ? '' : 'group'}>
        <div class="sbb-tag-group">
          <ul class="sbb-tag-group__list" aria-label={this.listAccessibilityLabel}>
            {this._tags.map((_, index) => (
              <li class="sbb-tag-group__list-item">
                <slot
                  name={`tag-${index}`}
                  onSlotchange={(): void => {
                    this._ensureOnlyOneTagSelected();
                    this._updateValueByReadingTags();
                  }}
                />
              </li>
            ))}
          </ul>
          <span hidden>
            <slot
              onSlotchange={() => {
                this._ensureOnlyOneTagSelected();
                this._updateValueByReadingTags();
              }}
            />
          </span>
        </div>
      </Host>
    );
  }
}
