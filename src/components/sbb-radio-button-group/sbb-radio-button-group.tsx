import {
  Component,
  ComponentInterface,
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
import { getNextElementIndex, isArrowKeyPressed } from '../../global/helpers/arrow-navigation';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { InterfaceSbbRadioButtonGroupAttributes } from './sbb-radio-button-group.custom';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

/**
 * @slot unnamed - Use this to provide radio buttons within the group.
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-radio-button-group.scss',
  tag: 'sbb-radio-button-group',
})
export class SbbRadioButtonGroup implements ComponentInterface {
  /**
   * Whether the radios can be deselected.
   */
  @Prop() public allowEmptySelection = false;

  /**
   * Whether the radio group is disabled.
   */
  @Prop() public disabled = false;

  /**
   * Whether the radio group is required.
   */
  @Prop() public required = false;

  /**
   * The value of the radio group.
   */
  @Prop({ mutable: true }) public value?: any | null;

  /**
   * Size variant, either m or s.
   */
  @Prop() public size: InterfaceSbbRadioButtonGroupAttributes['size'] = 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @Prop({ reflect: true })
  public horizontalFrom?: InterfaceSbbRadioButtonGroupAttributes['horizontalFrom'];

  /**
   * Radio group's orientation, either horizontal or vertical.
   */
  @Prop({ reflect: true })
  public orientation: InterfaceSbbRadioButtonGroupAttributes['orientation'] = 'horizontal';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  @Element() private _element!: HTMLElement;

  @Watch('value')
  public valueChanged(value: any | undefined): void {
    for (const radio of this._radioButtons) {
      radio.checked = radio.value === value;
      radio.tabIndex = this._getRadioTabIndex(radio);
    }
    this._setFocusableRadio();
    this.change.emit({ value });
    this.input.emit({ value });
    this.didChange.emit({ value });
  }

  @Watch('disabled')
  public updateDisabled(): void {
    for (const radio of this._radioButtons) {
      toggleDatasetEntry(radio, 'groupDisabled', this.disabled);
      radio.tabIndex = this._getRadioTabIndex(radio);
    }
    this._setFocusableRadio();
  }

  @Watch('required')
  public updateRequired(): void {
    for (const radio of this._radioButtons) {
      toggleDatasetEntry(radio, 'groupRequired', this.required);
    }
  }

  @Watch('size')
  public updateSize(): void {
    for (const radio of this._radioButtons) {
      radio.size = this.size;
    }
  }

  @Watch('allowEmptySelection')
  public updateAllowEmptySelection(): void {
    for (const radio of this._radioButtons) {
      radio.allowEmptySelection = this.allowEmptySelection;
    }
  }

  /**
   * Emits whenever the radio group value changes.
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public didChange: EventEmitter;

  /**
   * Emits whenever the radio group value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public change: EventEmitter;

  /**
   * Emits whenever the radio group value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
  })
  public input: EventEmitter;

  public connectedCallback(): void {
    toggleDatasetEntry(
      this._element,
      'hasSelectionPanel',
      !!this._element.querySelector('sbb-selection-panel')
    );
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('did-select', { passive: true })
  public onRadioButtonSelect(event: CustomEvent<string>): void {
    this.value = event.detail;
  }

  private _updateRadios(): void {
    const value = this.value ?? this._radioButtons.find((radio) => radio.checked)?.value;

    for (const radio of this._radioButtons) {
      radio.checked = radio.value === value;
      radio.size = this.size;
      radio.allowEmptySelection = this.allowEmptySelection;

      toggleDatasetEntry(radio, 'groupDisabled', this.disabled);
      toggleDatasetEntry(radio, 'groupRequired', this.required);

      radio.tabIndex = this._getRadioTabIndex(radio);
    }

    this._setFocusableRadio();
  }

  private get _radioButtons(): HTMLSbbRadioButtonElement[] {
    return Array.from(
      this._element.querySelectorAll('sbb-radio-button')
    ) as HTMLSbbRadioButtonElement[];
  }

  private get _enabledRadios(): HTMLSbbRadioButtonElement[] | undefined {
    if (!this.disabled) {
      return this._radioButtons.filter((r) => !r.disabled);
    }
  }

  private _setFocusableRadio(): void {
    const checked = this._radioButtons.find((radio) => radio.checked);

    if (!checked && this._enabledRadios) {
      this._enabledRadios[0].tabIndex = 0;
    }
  }

  private _getRadioTabIndex(radio: HTMLSbbRadioButtonElement): number {
    return radio.checked && !radio.disabled && !this.disabled ? 0 : -1;
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledRadios: HTMLSbbRadioButtonElement[] = this._enabledRadios;

    if (
      !enabledRadios ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this._element &&
        (evt.target as HTMLElement).parentElement !== this._element &&
        (evt.target as HTMLElement).parentElement.nodeName !== 'SBB-SELECTION-PANEL')
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const checked: number = enabledRadios.findIndex(
        (radio: HTMLSbbRadioButtonElement) => radio.checked
      );
      const current: number = checked !== -1 ? checked : 0;
      const nextIndex: number = getNextElementIndex(evt, current, enabledRadios.length);
      enabledRadios[nextIndex].select();
      enabledRadios[nextIndex].focus();
      evt.preventDefault();
    }
  }

  public render(): JSX.Element {
    return (
      <Host role="radiogroup">
        <div class="sbb-radio-group">
          <slot onSlotchange={() => this._updateRadios()} />
        </div>
        {this._namedSlots.error && (
          <div class="sbb-radio-group__error">
            <slot name="error" />
          </div>
        )}
      </Host>
    );
  }
}
