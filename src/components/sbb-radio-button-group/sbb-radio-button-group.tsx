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
import { InterfaceSbbRadioButton } from '../sbb-radio-button/sbb-radio-button.custom';
import { InterfaceSbbRadioButtonGroup } from './sbb-radio-button-group.custom';

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
   * Id of the radio group element - default name will be auto-generated.
   */
  @Prop() public name?: string = `${this.radioButtonGroupId}-name`;

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
  @Prop() public size?: InterfaceSbbRadioButtonGroup['size'] = 'm';

  /**
   * Radio group's orientation, either horizontal or vertical.
   */
  @Prop() public orientation?: string = 'horizontal';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  @Element() private _element!: HTMLElement;

  @Watch('value')
  public valueChanged(value: any | undefined): void {
    for (const radio of this._radioButtons) {
      radio.checked = radio.value === value;
      radio.tabIndex = radio.checked && !radio.disabled ? 0 : -1;
    }
    this._setFocusableRadio();
    this.didChange.emit({ value });
  }

  @Watch('disabled')
  public updateDisabled(): void {
    for (const radio of this._radioButtons) {
      if (this.disabled) {
        radio.dataset.disabled = '';
      } else {
        delete radio.dataset.disabled;
      }

      radio.tabIndex = !this.disabled ? radio.tabIndex : -1;
    }
  }

  @Watch('required')
  public updateRequired(): void {
    for (const radio of this._radioButtons) {
      if (this.required) {
        radio.dataset.required = '';
      } else {
        delete radio.dataset.required;
      }
    }
  }

  @Watch('size')
  public updateSize(): void {
    for (const radio of this._radioButtons) {
      radio.size = this.size;
    }
  }

  @Watch('name')
  public updateName(): void {
    for (const radio of this._radioButtons) {
      radio.name = this.name;
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
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-radio-button-group_did-change',
  })
  public didChange: EventEmitter<any>;

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  @Listen('sbb-radio-button_did-select', { passive: true })
  public onRadioButtonSelect(event: CustomEvent<Set<string>>): void {
    this.value = event.detail;
  }

  private _updateRadios(): void {
    const value = this.value ?? this._radioButtons.find((radio) => radio.checked)?.value;

    for (const radio of this._radioButtons) {
      radio.name = this.name;
      radio.checked = radio.value === value;
      radio.size = this.size;
      radio.allowEmptySelection = this.allowEmptySelection;

      if (this.disabled) {
        radio.dataset.disabled = '';
      } else {
        delete radio.dataset.disabled;
      }

      if (this.required) {
        radio.dataset.required = '';
      } else {
        delete radio.dataset.required;
      }

      radio.tabIndex = radio.checked && !radio.disabled ? 0 : -1;
    }

    this._setFocusableRadio();
  }

  private get _radioButtons(): InterfaceSbbRadioButton[] {
    return Array.from(
      this._element.querySelectorAll('sbb-radio-button')
    ) as InterfaceSbbRadioButton[];
  }

  private _getEnabledRadios(): InterfaceSbbRadioButton[] {
    return this._radioButtons.filter((r) => !r.hasAttribute('disabled'));
  }

  private _setFocusableRadio(): void {
    const checked = this._radioButtons.find((radio) => radio.checked);
    !checked && (this._getEnabledRadios()[0].tabIndex = 0);
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledRadios = this._getEnabledRadios();
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
      <Host role="radiogroup" aria-label={this.name}>
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
