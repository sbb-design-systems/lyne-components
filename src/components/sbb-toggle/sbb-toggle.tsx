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
  State,
  Watch,
} from '@stencil/core';
import { InterfaceSbbToggleAttributes } from './sbb-toggle.custom';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

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
   * Whether the toggle is disabled.
   */
  @Prop() public disabled = false;

  /**
   * Set the width of the component.
   */
  @Prop() public even: boolean;

  /**
   * Size variant, either m or s.
   */
  @Prop() public size?: InterfaceSbbToggleAttributes['size'] = 'm';

  /**
   * Set the width of the component.
   */
  @Prop() public even: boolean;

  /**
   * The value of the toggle.
   */
  @Prop({ mutable: true, reflect: true }) public value: any | null;

  /**
   * Whether the list has an active action.
   */
  @State() private _hasCheckedOption = false;

  @Element() private _element: HTMLElement;

  private _toggleElement: HTMLElement;
  private _toggleResizeObserver = new ResizeObserver(() => this._setCheckedPillPosition());

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

  @Watch('disabled')
  public updateDisabled(): void {
    for (const toggleOption of this._options) {
      toggleOption.disabled = toggleOption.disabled ? toggleOption.disabled : this.disabled;
      toggleOption.tabIndex = this._getOptionTabIndex(toggleOption);
    }
    this._setFocusableOption();
  }

  /**
   * Emits whenever the toggle value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-change',
  })
  public didChange: EventEmitter<any>;

  private get _options(): HTMLSbbToggleOptionElement[] {
    return Array.from(
      this._element.querySelectorAll('sbb-toggle-option')
    ) as HTMLSbbToggleOptionElement[];
  }

  private get _checked(): HTMLSbbToggleOptionElement {
    return this._options.find((toggle) => toggle.checked);
  }

  @Listen('did-select', { passive: true })
  public onToggleOptionSelect(event: CustomEvent<Set<string>>): void {
    this.value = event.detail;
  }

  private _setCheckedPillPosition(): void {
    const checked = this._checked;

    if (!checked) {
      return;
    }
    this._hasCheckedOption = true;
    this._element.style.setProperty('--sbb-toggle-option-left', `${checked?.offsetLeft - 2}px`);
    this._element.style.setProperty(
      '--sbb-toggle-option-right',
      `${this._toggleElement.clientWidth - (checked?.offsetLeft + checked?.clientWidth) - 2}px`
    );
  }

  public connectedCallback(): void {
    this._toggleResizeObserver.observe(this._element.firstElementChild);
  }

  public disconnectedCallback(): void {
    this._toggleResizeObserver.disconnect();
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

  private _getOptionTabIndex(option: HTMLSbbToggleOptionElement): number {
    return option.checked && !option.disabled && !this.disabled ? 0 : -1;
  }

  public render(): JSX.Element {
    return (
      <Host class={{ 'sbb-toggle--checked': this._hasCheckedOption }}>
        <div class="sbb-toggle" ref={(toggle) => (this._toggleElement = toggle)}>
          <slot onSlotchange={() => this._updateToggle()} />
        </div>
      </Host>
    );
  }
}
