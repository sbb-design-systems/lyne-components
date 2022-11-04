import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { createNamedSlotState, queryAndObserveNamedSlotState } from '../../global/helpers/observe-named-slot-changes';
import { InterfaceCheckboxAttributes } from '../sbb-checkbox/sbb-checkbox.custom';

let nextId = 0;

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox-group.scss',
  tag: 'sbb-checkbox-group',
})
export class SbbCheckboxGroup {
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

  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
      this._updateCheckboxs();
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  private _updateCheckboxs(): void {
    const checkboxs = this._checkboxs;

    for (const checkbox of checkboxs) {
      checkbox.name = this.name;
      checkbox.iconPlacement = checkbox.iconPlacement ?? 'start';
      checkbox.disabled = checkbox.disabled ? checkbox.disabled : this.disabled;
      checkbox.required = checkbox.required ? checkbox.required : this.required;
    }
  }

  private get _checkboxs(): InterfaceCheckboxAttributes[] {
    return Array.from(
      this._element.querySelectorAll('sbb-checkbox')
    ) as InterfaceCheckboxAttributes[];
  }

  public render(): JSX.Element {
    return (
      <Host role="checkboxgroup" aria-label={this.name}>
        <div class='sbb-checkbox-group'>
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
