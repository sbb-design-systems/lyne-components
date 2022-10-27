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

let nextId = 0;

/**
 * @slot unnamed - Use this to document a slot.
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
  @Prop() public sbbRadioButtonGroupId = `sbb-radio-button-group-${++nextId}`;

  /**
   * Id of the radio group element - default name will be auto-generated.
   */
  @Prop() public name?: string = `${this.sbbRadioButtonGroupId}-name`;

  /**
   * Whether the radios can be deselected.
   */
  @Prop() public allowEmptySelection = false;

  /**
   * Whether the radio group is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Whether the radio group is required.
   */
  @Prop({ reflect: true }) public required = false;

  /**
   * The value of the radio group.
   */
  @Prop({ mutable: true, reflect: true }) public value?: any | null;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  @Element() private _element!: HTMLElement;

  @Watch('value')
  public valueChanged(value: any | undefined): void {
    this._updateRadios();
    this.didChange.emit({ value });
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
    if (this.value === undefined) {
      const radio = this._radioButtons.find((radio) => radio.checked) as
        | InterfaceSbbRadioButton
        | undefined;
      this.value = radio?.value;
    } else {
      this._updateRadios();
    }
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  private _updateRadios(): void {
    const radios = this._radioButtons;

    for (const radio of radios) {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      radio.disabled = radio.disabled ? radio.disabled : this.disabled;
      radio.required = radio.required ? radio.required : this.required;
      radio.tabIndex = radio.checked ? 0 : -1;
    }
  }

  private get _radioButtons(): InterfaceSbbRadioButton[] {
    return Array.from(
      this._element.querySelectorAll('sbb-radio-button')
    ) as InterfaceSbbRadioButton[];
  }

  private _getEnabledRadios(): InterfaceSbbRadioButton[] {
    return this._radioButtons.filter((r) => !r.hasAttribute('disabled'));
  }

  @Listen('click')
  public handleClick(event: Event): void {
    const radio = event.target as InterfaceSbbRadioButton | undefined;
    if (radio?.tagName !== 'SBB-RADIO-BUTTON') {
      return;
    }
    this._select(radio);
    event.preventDefault();
  }

  private _select(radio: InterfaceSbbRadioButton): void {
    if (this.allowEmptySelection) {
      radio.checked = !radio.checked;
    } else if (!radio.checked) {
      radio.checked = true;
    }
    this.value = radio.checked ? radio.value : null;
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledRadios = this._getEnabledRadios();
    const cur = enabledRadios.findIndex((t) => t.checked);
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
      this._select(enabledRadios[prev]);
      enabledRadios[prev].focus();
      evt.preventDefault();
    } else if (evt.key === nextKey || evt.key === 'ArrowDown') {
      this._select(enabledRadios[next]);
      enabledRadios[next].focus();
      evt.preventDefault();
    }
  }

  public render(): JSX.Element {
    return (
      <Host role="radiogroup" aria-label={this.name}>
        <div class="sbb-radio-group">
          <slot />
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
