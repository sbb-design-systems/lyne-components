import { Component, ComponentInterface, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { isSafari } from '../../global/helpers/platform';
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

  private _variant: SbbOptionVariant;
  // TODO: the problem that the `_inertAriaGroups` option resolves is only present on Safari using VoiceOver.
  private _inertAriaGroups = isSafari();

  @Watch('disabled')
  public updateDisabled(): void {
    this._proxyDisabledToOptions();
  }

  @Watch('label')
  public proxyGroupLabelToOptions(): void {
    if (!this._inertAriaGroups) {
      return;
    }

    for (const option of this._options) {
      option.setGroupLabel(this.label);
    }
  }

  public connectedCallback(): void {
    this._setVariantByContext();
    this.proxyGroupLabelToOptions();
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

  private _proxyDisabledToOptions(): void {
    for (const option of this._options) {
      toggleDatasetEntry(option, 'groupDisabled', this.disabled);
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        role={!this._inertAriaGroups ? 'group' : null}
        data-variant={this._variant}
        aria-label={!this._inertAriaGroups && this.label}
        aria-disabled={!this._inertAriaGroups && this.disabled.toString()}
      >
        <div class="sbb-option-group__divider">
          <sbb-divider></sbb-divider>
        </div>
        <span class="sbb-option-group__label" aria-hidden="true">
          {this.label}
        </span>
        <slot onSlotchange={() => this._proxyDisabledToOptions()} />
      </Host>
    );
  }
}
