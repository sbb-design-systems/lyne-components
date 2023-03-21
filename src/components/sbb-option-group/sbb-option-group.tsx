import { Component, ComponentInterface, Element, h, JSX, Prop, Watch } from '@stencil/core';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

/**
 * @slot unnamed - Used to display options.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-option-group.scss',
  tag: 'sbb-option-group',
})
export class SbbOptionGroup implements ComponentInterface {
  /** Option group label. */
  @Prop() public label: string;

  /** Whether the group is disabled. */
  @Prop() public disabled = false;

  @Element() private _element: HTMLElement;

  @Watch('disabled')
  public updateDisabled(): void {
    for (const option of this._options) {
      toggleDatasetEntry(option, 'groupDisabled', this.disabled);
    }
  }

  private get _options(): HTMLSbbOptionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-option')) as HTMLSbbOptionElement[];
  }

  private _updateOptions(): void {
    const options = this._options;

    for (const option of options) {
      toggleDatasetEntry(option, 'groupDisabled', this.disabled);
    }
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-option-group">
        <div class="sbb-option-group__label">{this.label}</div>
        <div class="sbb-option-group__options">
          <slot onSlotchange={() => this._updateOptions()} />
        </div>
        <div class="sbb-option-group__divider">
          <sbb-divider></sbb-divider>
        </div>
      </div>
    );
  }
}
