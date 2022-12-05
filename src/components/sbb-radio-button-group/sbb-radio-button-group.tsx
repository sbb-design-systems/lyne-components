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
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { InterfaceSbbRadioButtonGroupAttributes } from './sbb-radio-button-group.custom';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

let nextId = 0;

/**
 * @slot unnamed - Use this to provide radio buttons within the group.
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-radio-button-group.scss',
  tag: 'sbb-radio-button-group',
})
export class SbbRadioButtonGroup {
  /**
   * Id of the radio group element.
   */
  @Prop() public radioButtonGroupId = `sbb-radio-button-group-${++nextId}`;

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

  public connectedCallback(): void {
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
    if (!this._enabledRadios) {
      return;
    }

    const enabledRadios = this._enabledRadios;
    const checked = enabledRadios.findIndex((radio) => radio.checked);
    const cur = checked !== -1 ? checked : 0;
    const size = enabledRadios.length;
    const prev = cur === 0 ? size - 1 : cur - 1;
    const next = cur === size - 1 ? 0 : cur + 1;

    // don't trap nested handling
    if (
      (evt.target as HTMLElement) !== this._element &&
      (evt.target as HTMLElement).parentElement !== this._element
    ) {
      return;
    }

    const currentWritingMode = getDocumentWritingMode();
    const prevKey = currentWritingMode === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = currentWritingMode === 'rtl' ? 'ArrowLeft' : 'ArrowRight';

    if (evt.key === prevKey || evt.key === 'ArrowUp') {
      enabledRadios[prev].select();
      enabledRadios[prev].focus();
      evt.preventDefault();
    } else if (evt.key === nextKey || evt.key === 'ArrowDown') {
      enabledRadios[next].select();
      enabledRadios[next].focus();
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
