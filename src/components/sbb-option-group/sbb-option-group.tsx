import { Component, ComponentInterface, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { SbbOptionVariant } from '../sbb-option/sbb-option.custom';

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

  private _variant: SbbOptionVariant;

  public connectedCallback(): void {
    this._setVariantByContext();
  }

  private get _options(): HTMLSbbOptionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-option')) as HTMLSbbOptionElement[];
  }

  private _setVariantByContext(): void {
    if (this._element.closest('sbb-autocomplete')) {
      this._variant = 'autocomplete';
    } else if (this._element.closest('sbb-select')) {
      this._variant = 'select';
    }
  }

  private _updateOptions(): void {
    const options = this._options;

    for (const option of options) {
      toggleDatasetEntry(option, 'groupDisabled', this.disabled);
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        role="group"
        data-variant={this._variant}
        aria-label={this.label}
        aria-disabled={this.disabled.toString()}
      >
        <span class="sbb-option-group__label" aria-hidden="true">
          {this.label}
        </span>
        <slot onSlotchange={() => this._updateOptions()} />
        <div class="sbb-option-group__divider">
          <sbb-divider></sbb-divider>
        </div>
      </Host>
    );
  }
}
