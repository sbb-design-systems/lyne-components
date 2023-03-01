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

    const tags = this._tags();

    if (this.multiple) {
      tags.forEach((tag) => (tag.checked = value.includes(tag.value)));
    } else {
      tags.forEach((tag) => (tag.checked = tag.value === value));
    }
  }

  private _ensureOnlyOneTagSelected(): void {
    if (this.multiple) {
      return;
    }

    // Ensure only one tag checked
    const checkedTags = this._tags().filter((tag) => tag.checked);
    if (checkedTags.length > 1) {
      checkedTags.slice(1).forEach((tag) => (tag.checked = false));
    }
  }

  @Listen('state-change', { passive: true })
  public handleStateChange(event: CustomEvent<TagStateChange>): void {
    const target: HTMLSbbTagElement = event.target as HTMLSbbTagElement;
    event.stopPropagation();

    // If multiple or if value was unchecked, read state from toggles
    if (this.multiple || (event.detail.type === 'checked' && !event.detail.checked)) {
      this._updateValueByReadingTags();
      // If a value has changed in exclusive mode (only checked are reported), directly assign it.
    } else if (event.detail.type === 'value') {
      this.value = event.detail.value;
      // If a value was checked in exclusive mode, assign this value directly.
    } else if (event.detail.type === 'checked' && event.detail.checked) {
      this.value = target.value;
    }
  }

  private _updateValueByReadingTags(): void {
    if (this.multiple) {
      const values = [];
      for (const tag of this._tags()) {
        if (tag.checked) {
          values.push(tag.value);
        }
      }
      this.value = values;
    } else {
      this.value = this._tags().find((tag) => tag.checked)?.value || null;
    }
  }

  public connectedCallback(): void {
    if (this.value) {
      this.valueChanged(this.value);
    }
  }

  private _tags(): HTMLSbbTagElement[] {
    return Array.from(this._element.querySelectorAll('sbb-tag')) as HTMLSbbTagElement[];
  }

  public render(): JSX.Element {
    return (
      <Host role="group">
        <div class="sbb-tag-group">
          <slot
            onSlotchange={() => {
              this._ensureOnlyOneTagSelected();
              this._updateValueByReadingTags();
            }}
          />
        </div>
      </Host>
    );
  }
}
