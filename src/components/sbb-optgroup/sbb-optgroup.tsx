import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { SbbOptionVariant } from '../sbb-option/sbb-option.custom';
import { isSafari, isValidAttribute, toggleDatasetEntry } from '../../global/dom';
import { AgnosticMutationObserver } from '../../global/observers';

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

  @State() private _negative = false;

  private _negativeObserver = new AgnosticMutationObserver(() => this._onNegativeChange());

  private _variant: SbbOptionVariant;

  /**
   * On Safari, the groups labels are not read by VoiceOver.
   * To solve the problem, we remove the role="group" and add a hidden span containing the group name
   * TODO: We should periodically check if it has been solved and, if so, remove the property.
   */
  private _inertAriaGroups = isSafari();

  private get _isMultiple(): boolean {
    return (
      this._variant === 'select' && this._element.closest('sbb-select')?.hasAttribute('multiple')
    );
  }

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
    this._negativeObserver?.disconnect();
    this._negative = !!this._element.closest(
      // :is() selector not possible due to test environment
      `sbb-autocomplete[negative]:not([negative='false']),sbb-select[negative]:not([negative='false']),sbb-form-field[negative]:not([negative='false'])`,
    );
    toggleDatasetEntry(this._element, 'negative', this._negative);

    this._negativeObserver.observe(this._element, {
      attributes: true,
      attributeFilter: ['data-negative'],
    });

    this._setVariantByContext();
    this.proxyGroupLabelToOptions();
  }

  public disconnectedCallback(): void {
    this._negativeObserver?.disconnect();
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

  private _onNegativeChange(): void {
    this._negative = isValidAttribute(this._element, 'data-negative');
  }

  public render(): JSX.Element {
    return (
      <Host
        role={!this._inertAriaGroups ? 'group' : null}
        data-variant={this._variant}
        data-multiple={this._isMultiple}
        aria-label={!this._inertAriaGroups && this.label}
        aria-disabled={!this._inertAriaGroups && this.disabled.toString()}
      >
        <div class="sbb-optgroup__divider">
          <sbb-divider negative={this._negative}></sbb-divider>
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
