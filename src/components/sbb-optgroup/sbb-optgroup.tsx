import { Component, ComponentInterface, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { isSafari } from '../../global/helpers/platform';
import { SbbOptionVariant } from '../sbb-option/sbb-option.custom';

/**
 * @slot unnamed - Used to display options.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-optgroup.scss',
  tag: 'sbb-optgroup',
})
export class SbbOptGroup implements ComponentInterface {
  /** Option group label. */
  @Prop() public label: string;

  /** Whether the group is disabled. */
  @Prop() public disabled = false;

  @Element() private _element: HTMLElement;

  private _variant: SbbOptionVariant;

  /**
   * On safari, the groups labels are not read by VoiceOver.
   * To solve the problem, we remove the role="group" and add an hidden span containing the group name
   * We should periodically check if it has been solved and, if so, remove the property.
   */
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
        <div class="sbb-optgroup__divider">
          <sbb-divider></sbb-divider>
        </div>
        <div class="sbb-optgroup__label" aria-hidden="true">
          <div class="sbb-optgroup__icon-space" />
          <span>{this.label}</span>
        </div>
        <slot onSlotchange={() => this._proxyDisabledToOptions()} />
      </Host>
    );
  }
}
