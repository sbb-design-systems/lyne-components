import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  JSX,
  Element,
  State,
  ComponentInterface,
  Listen,
} from '@stencil/core';
import { hostContext } from '../../global/helpers/host-context';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import {
  AccessibilityProperties,
  getAccessibilityAttributeList,
} from '../../global/interfaces/accessibility-properties';
import { InterfaceCheckboxAttributes, SbbCheckboxChange } from './sbb-checkbox.custom';

let nextId = 0;

/** Configuration for the attribute to look at if component is nested in a sbb-checkbox-group */
const checkboxObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-required', 'data-disabled'],
};

/**
 * @slot icon - Slot used to render the checkbox icon.
 * @slot unnamed - Slot used to render the checkbox label's text.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-checkbox.scss',
  tag: 'sbb-checkbox',
})
export class SbbCheckbox implements AccessibilityProperties, ComponentInterface {
  private _checkbox: HTMLInputElement;

  /** MutationObserver on data attributes. */
  private _checkboxAttributeObserver = new MutationObserver(
    this._onCheckboxAttributesChange.bind(this)
  );

  /** Whether the component must be set disabled due disabled attribute on sbb-checkbox-group. */
  @State() private _disabledFromGroup = false;

  /** Whether the component must be set required due required attribute on sbb-checkbox-group. */
  @State() private _requiredFromGroup = false;

  /** Size of the checkbox. */
  @Prop({ reflect: true }) public size: InterfaceCheckboxAttributes['size'] = 's';

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) public checked: boolean;

  /** Value of checkbox. */
  @Prop({ reflect: true }) public value?: string;

  /** Name of the checkbox */
  @Prop() public name?: string;

  /** Id of the internal input element - default id will be set automatically. */
  @Prop() public inputId = `sbb-checkbox-${++nextId}`;

  /** The disabled prop for the disabled state. */
  @Prop({ reflect: true }) public disabled = false;

  /** The required prop for the required state. */
  @Prop({ reflect: true }) public required = false;

  /** Whether the checkbox is indeterminate. */
  @Prop({ reflect: true }) public indeterminate = false;

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from here https://lyne.sbb.ch/tokens/icons (optional).
   */
  @Prop() public iconName?: string;

  /** The label position relative to the labelIcon. Defaults to end */
  @Prop({ reflect: true }) public iconPlacement: InterfaceCheckboxAttributes['iconPlacement'] =
    'end';

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string | undefined;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public accessibilityDescribedby: string | undefined;

  @Element() private _element!: HTMLElement;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  /** Event for emitting whenever selection is changed. */
  @Event() public sbbChange: EventEmitter<SbbCheckboxChange>;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  /** Set up the initial disabled/required values and start observe attributes changes. */
  private _setupInitialStateAndAttributeObserver(): void {
    if (hostContext('sbb-checkbox-group', this._element)) {
      this._disabledFromGroup = !!this._element.dataset.disabled;
      this._requiredFromGroup = !!this._element.dataset.required;
    }
    this._checkboxAttributeObserver.observe(this._element, checkboxObserverConfig);
  }

  /** Observe changes on data attributes and set the appropriate values. */
  private _onCheckboxAttributesChange(mutationsList): void {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'attributes') {
        return;
      }
      if (mutation.attributeName === 'data-disabled') {
        this._disabledFromGroup = true;
      }
      if (mutation.attributeName === 'data-required') {
        this._requiredFromGroup = true;
      }
    }
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._setupInitialStateAndAttributeObserver();
  }

  public disconnectedCallback(): void {
    this._checkboxAttributeObserver.disconnect();
  }

  /** Method triggered on checkbox change. If not indeterminate, inverts the value; otherwise sets checked to true. */
  public checkedChanged(): void {
    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
    } else {
      this.checked = this._checkbox?.checked;
    }
    this.sbbChange.emit({
      checked: this.checked,
      value: this.value,
    });
  }

  public render(): JSX.Element {
    return (
      <label class="sbb-checkbox" htmlFor={this.inputId}>
        <input
          ref={(checkbox: HTMLInputElement) => (this._checkbox = checkbox)}
          type="checkbox"
          name={this.name}
          id={this.inputId}
          disabled={this.disabled || this._disabledFromGroup}
          required={this.required || this._requiredFromGroup}
          checked={this.checked}
          value={this.value}
          {...getAccessibilityAttributeList(this)}
          onChange={(): void => this.checkedChanged()}
        />
        <span class="sbb-checkbox__inner">
          <span class="sbb-checkbox__aligner">
            <span class="sbb-checkbox__selection">
              <span class="sbb-checkbox__icon">
                {(this.checked || this.indeterminate) && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={this.indeterminate ? 'M9 12H15' : 'M8 12.3304L10.4615 15L16 9'}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </span>
            </span>
          </span>
          <span class="sbb-checkbox__label">
            <slot />
            {(this.iconName || this._namedSlots.icon) && (
              <span class="sbb-checkbox__label--icon">
                <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
              </span>
            )}
          </span>
        </span>
      </label>
    );
  }
}
