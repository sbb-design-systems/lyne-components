import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { InterfaceSbbCheckboxGroupAttributes } from './sbb-checkbox-group.custom';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

/**
 * @slot unnamed - Slot used to render the <sbb-checkbox> inside the <sbb-checkbox-group>.
 * @slot error - Slot used to render the <sbb-form-error> inside the <sbb-checkbox-group>.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox-group.scss',
  tag: 'sbb-checkbox-group',
})
export class SbbCheckboxGroup implements ComponentInterface {
  /**
   * Whether the checkbox group is disabled.
   */
  @Prop() public disabled = false;

  /**
   * Whether the checkbox group is required.
   */
  @Prop() public required = false;

  /**
   * Size variant, either m or s.
   */
  @Prop() public size: InterfaceSbbCheckboxGroupAttributes['size'] = 'm';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @Prop({ reflect: true })
  public horizontalFrom?: InterfaceSbbCheckboxGroupAttributes['horizontalFrom'];

  /**
   * Indicates the orientation of the checkboxes inside the `<sbb-checkbox-group>`.
   */
  @Prop({ reflect: true }) public orientation: InterfaceSbbCheckboxGroupAttributes['orientation'] =
    'horizontal';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  @Element() private _element!: HTMLElement;

  @Watch('disabled')
  public updateDisabled(): void {
    for (const checkbox of this._checkboxes) {
      toggleDatasetEntry(checkbox, 'groupDisabled', this.disabled);
    }
  }

  @Watch('required')
  public updateRequired(): void {
    for (const checkbox of this._checkboxes) {
      toggleDatasetEntry(checkbox, 'groupRequired', this.required);
    }
  }

  @Watch('size')
  public updateSize(): void {
    for (const checkbox of this._checkboxes) {
      checkbox.size = this.size;
    }
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  private _updateCheckboxes(): void {
    const checkboxes = this._checkboxes;

    for (const checkbox of checkboxes) {
      checkbox.size = this.size;
      toggleDatasetEntry(checkbox, 'groupDisabled', this.disabled);
      toggleDatasetEntry(checkbox, 'groupRequired', this.required);
    }
  }

  private get _checkboxes(): HTMLSbbCheckboxElement[] {
    return Array.from(this._element.querySelectorAll('sbb-checkbox')) as HTMLSbbCheckboxElement[];
  }

  public render(): JSX.Element {
    return (
      <Host>
        <div class="sbb-checkbox-group">
          <slot onSlotchange={() => this._updateCheckboxes()} />
        </div>
        {this._namedSlots.error && (
          <div class="sbb-checkbox-group__error">
            <slot name="error" />
          </div>
        )}
      </Host>
    );
  }
}
