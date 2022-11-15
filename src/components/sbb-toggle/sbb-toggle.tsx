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
 * @slot unnamed - Use this to document a slot.
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
   * The value of the toggle.
   */
  @Prop({ mutable: true, reflect: true }) public value?: any | null;

  @Element() private _sbbToggle!: HTMLElement;

  @Watch('value')
  public valueChanged(value: any | undefined): void {
    this._updateToggle();
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

  public connectedCallback(): void {
    this._updateToggle();
  }

  @Listen('sbb-toggle-option_did-select', { passive: true })
  public onToggleOptionSelect(event: CustomEvent<Set<string>>): void {
    this.value = event.detail;
  }

  private _updateToggle(): void {
    const toggle = this._toggleOptions;
    const value = this.value ?? toggle.find((toggleOption) => toggleOption.checked)?.value;

    for (const toggleOption of toggle) {
      toggleOption.checked = toggleOption.value === value;
      toggleOption.disabled = toggleOption.disabled ? toggleOption.disabled : this.disabled;
      toggleOption.tabIndex = toggleOption.checked && !toggleOption.disabled ? 0 : -1;
    }

    toggle.length && (toggle[0].tabIndex = value || toggle[0].disabled ? toggle[0].tabIndex : 0);
  }

  private get _toggleOptions(): InterfaceSbbToggleOption[] {
    return Array.from(
      this._sbbToggle.querySelectorAll('sbb-toggle-option')
    ) as InterfaceSbbToggleOption[];
  }

  public render(): JSX.Element {
    return (
      <Host aria-label={this.name}>
        <div class="sbb-toggle">
          <slot />
        </div>
      </Host>
    );
  }
}
