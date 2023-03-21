import { Component, ComponentInterface, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

let nextId = 0;

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

  private _optGroupLabelId = `sbb-optgroup-label-${++nextId}`;

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
      <Host role="group" aria-labelledby={this._optGroupLabelId}>
        <span class="sbb-option-group__label" aria-hidden="true" id={this._optGroupLabelId}>
          {this.label}
        </span>
        <slot onSlotchange={() => this._updateOptions()} />
        {/* <div class="sbb-option-group__divider">
          <sbb-divider></sbb-divider>
        </div> */}
      </Host>
    );
  }
}
