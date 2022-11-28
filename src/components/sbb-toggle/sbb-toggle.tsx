import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';
import { InterfaceSbbToggleOption } from '../sbb-toggle-option/sbb-toggle-option.custom';

let nextId = 0;

/**
 * @slot unnamed - Slot used to render the `<sbb-toggle-option>`.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-toggle.scss',
  tag: 'sbb-toggle',
})
export class SbbToggle {
  /**
   * Id of the toggle element.
   */
  @Prop() public sbbToggleId = `sbb-toggle-${++nextId}`;

  /**
   * Id of the toggle element - default name will be auto-generated.
   */
  @Prop() public name?: string = `${this.sbbToggleId}-name`;

  /**
   * Whether the toggle is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Set the width of the component.
   */
  @Prop() public even: boolean;

  /**
   * Size variant, either m or s.
   */
  @Prop() public size?: InterfaceSbbToggleOption['size'] = 'm';

  /**
   * The value of the toggle.
   */
  @Prop({ mutable: true, reflect: true }) public value: any | null;

  private _toggleElement: HTMLElement;

  private get _options(): InterfaceSbbToggleOption[] {
    return Array.from(
      this._element.querySelectorAll('sbb-toggle-option')
    ) as InterfaceSbbToggleOption[];
  }

  private get _checked(): InterfaceSbbToggleOption {
    return this._options.find((toggle) => toggle.checked);
  }

  @Element() private _element!: HTMLElement;

  @Listen('resize', { target: 'window', passive: true })
  private _setCheckedPillPosition(): void {
    const checked = this._checked;

    if (!checked) {
      return;
    }

    // Set checked pill position
    this._element.style.setProperty(
      '--sbb-toggle-width',
      `${this._options[0].clientWidth + this._options[1].clientWidth}px`
    );

    this._element.style.setProperty('--sbb-toggle-option-left', `${checked?.offsetLeft + 2}px`);
    this._element.style.setProperty(
      '--sbb-toggle-option-right',
      `${this._toggleElement.clientWidth - (checked?.offsetLeft + checked?.clientWidth) + 2}px`
    );
  }

  @Watch('value')
  public valueChanged(value: any | undefined): void {
    for (const toggleOption of this._options) {
      toggleOption.checked = toggleOption.value === value;
      toggleOption.tabIndex = this._getOptionTabIndex(toggleOption);
    }
    this._setFocusableOption();
    this._setCheckedPillPosition();
    this.didChange.emit({ value });
  }

  /**
   * Emits whenever the toggle value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-toggle_did-change',
  })
  public didChange: EventEmitter<any>;

  @Listen('sbb-toggle-option_did-select', { passive: true })
  public onToggleOptionSelect(event: CustomEvent<Set<string>>): void {
    this.value = event.detail;
  }

  public componentDidLoad(): void {
    this._setCheckedPillPosition();
  }

  private _updateToggle(): void {
    const options = this._options;
    const value = this.value ?? options.find((toggleOption) => toggleOption.checked)?.value;

    for (const toggleOption of options) {
      toggleOption.checked = toggleOption.value === value;
      toggleOption.disabled = toggleOption.disabled ? toggleOption.disabled : this.disabled;
      toggleOption.tabIndex = this._getOptionTabIndex(toggleOption);
    }

    this._setFocusableOption();
  }

  private _setFocusableOption(): void {
    if (!this._checked) {
      this._options[0].tabIndex = 0;
    }
  }

  private _getOptionTabIndex(option: InterfaceSbbToggleOption): number {
    return option.checked && !option.disabled && !this.disabled ? 0 : -1;
  }

  public render(): JSX.Element {
    return (
      <Host aria-label={this.name}>
        <div class="sbb-toggle" ref={(toggle) => (this._toggleElement = toggle)}>
          <slot onSlotchange={() => this._updateToggle()} />
        </div>
      </Host>
    );
  }
}
