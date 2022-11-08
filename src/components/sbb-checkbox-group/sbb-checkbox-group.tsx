import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { InterfaceSbbCheckbox } from '../sbb-checkbox/sbb-checkbox.custom';

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
  @Prop() public sbbCheckboxGroupId = `sbb-checkbox-group-${++nextId}`;

  /**
   * Id of the checkbox group element - default name will be auto-generated.
   */
  @Prop() public name?: string = `${this.sbbCheckboxGroupId}-name`;

  /**
   * Whether the checkbox group is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Whether the checkbox group is required.
   */
  @Prop({ reflect: true }) public required = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  @Element() private _checkboxGroupElement!: HTMLElement;

  public connectedCallback(): void {
    this._updateCheckboxes();
    this._namedSlots = queryAndObserveNamedSlotState(this._checkboxGroupElement, this._namedSlots);
  }

  private _updateCheckboxes(): void {
    const checkboxes = this._checkboxes;

    for (const checkbox of checkboxes) {
      checkbox.name = this.name;
      checkbox.disabled = checkbox.disabled ?? this.disabled;
      checkbox.required = checkbox.required ?? this.required;
    }
  }

  private get _checkboxes(): InterfaceSbbCheckbox[] {
    return Array.from(
      this._checkboxGroupElement.querySelectorAll('sbb-checkbox')
    ) as InterfaceSbbCheckbox[];
  }

  public render(): JSX.Element {
    return (
      <Host aria-label={this.name}>
        <div class="sbb-checkbox-group">
          <slot />
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
