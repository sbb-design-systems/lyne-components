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
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { InterfaceSbbCheckbox } from '../sbb-checkbox/sbb-checkbox.custom';
import { InterfaceSbbCheckboxGroupAttributes } from './sbb-checkbox-group.custom';

let nextId = 0;

/**
 * @slot unnamed - Slot used to render the <sbb-checkbox> inside the <sbb-checkbox-group>.
 * @slot error - Slot use to render the <sbb-form-error> inside the <sbb-checkbox-group>.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox-group.scss',
  tag: 'sbb-checkbox-group',
})
export class SbbCheckboxGroup implements ComponentInterface {
  /**
   * Id of the checkbox group element.
   */
  @Prop() public checkboxGroupId = `sbb-checkbox-group-${++nextId}`;

  /**
   * Whether the checkbox group is disabled.
   */
  @Prop() public disabled = false;

  /**
   * Whether the checkbox group is required.
   */
  @Prop() public required = false;

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @Prop({ reflect: true })
  public horizontalFrom?: InterfaceSbbCheckboxGroupAttributes['horizontalFrom'];

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @Prop({ reflect: true }) public orientation: InterfaceSbbCheckboxGroupAttributes['orientation'] =
    'horizontal';

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  @Element() private _checkboxGroupElement!: HTMLElement;

  public connectedCallback(): void {
    this._updateCheckboxes();
    this._namedSlots = queryAndObserveNamedSlotState(this._checkboxGroupElement, this._namedSlots);
  }

  @Watch('required')
  @Watch('disabled')
  private _updateCheckboxes(): void {
    const checkboxes = this._checkboxes;

    for (const checkbox of checkboxes) {
      if (this.disabled) {
        checkbox.dataset.disabled = '';
      } else {
        delete checkbox.dataset.disabled;
      }

      if (this.required) {
        checkbox.dataset.required = '';
      } else {
        delete checkbox.dataset.required;
      }
    }
  }

  private get _checkboxes(): InterfaceSbbCheckbox[] {
    return Array.from(
      this._checkboxGroupElement.querySelectorAll('sbb-checkbox')
    ) as InterfaceSbbCheckbox[];
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
