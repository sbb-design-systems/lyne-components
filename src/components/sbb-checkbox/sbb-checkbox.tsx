import {
  Component,
  Prop,
  h,
  JSX,
  Element,
  State,
  ComponentInterface,
  Listen,
  EventEmitter,
  Event,
} from '@stencil/core';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
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
import { InterfaceSbbCheckboxAttributes } from './sbb-checkbox.custom';
import { forwardEventToHost } from '../../global/helpers/forward-event';
import { forwardHostEvent } from '../../global/interfaces/link-button-properties';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

/** Configuration for the attribute to look at if component is nested in a sbb-checkbox-group */
const checkboxObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-group-required', 'data-group-disabled'],
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
export class SbbCheckbox implements ComponentInterface, AccessibilityProperties {
  /** Value of checkbox. */
  @Prop() public value?: string;

  /** Whether the checkbox is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** Whether the checkbox is required. */
  @Prop() public required = false;

  /** Whether the checkbox is indeterminate. */
  @Prop({ reflect: true, mutable: true }) public indeterminate = false;

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from here https://lyne.sbb.ch/tokens/icons (optional).
   */
  @Prop() public iconName?: string;

  /** The label position relative to the labelIcon. Defaults to end */
  @Prop({ reflect: true }) public iconPlacement: InterfaceSbbCheckboxAttributes['iconPlacement'] =
    'end';

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string | undefined;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) public checked: boolean;

  /** Label size variant, either m or s. */
  @Prop({ reflect: true }) public size: InterfaceSbbCheckboxAttributes['size'] = 'm';

  /** Whether the component must be set disabled due disabled attribute on sbb-checkbox-group. */
  @State() private _disabledFromGroup = false;

  /** Whether the component must be set required due required attribute on sbb-checkbox-group. */
  @State() private _requiredFromGroup = false;

  private _checkbox: HTMLInputElement;

  /** MutationObserver on data attributes. */
  private _checkboxAttributeObserver = new MutationObserver(
    this._onCheckboxAttributesChange.bind(this)
  );

  @Element() private _element: HTMLElement;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  private _inputElement(): HTMLElement {
    return this._element.shadowRoot.querySelector('input');
  }

  // Set up the initial disabled/required values and start observe attributes changes.
  private _setupInitialStateAndAttributeObserver(): void {
    this._disabledFromGroup = !!this._element.dataset.groupDisabled;
    this._requiredFromGroup = !!this._element.dataset.groupRequired;
    this._checkboxAttributeObserver.observe(this._element, checkboxObserverConfig);
  }

  /** Observe changes on data attributes and set the appropriate values. */
  private _onCheckboxAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-group-disabled') {
        this._disabledFromGroup = !!isValidAttribute(this._element, 'data-group-disabled');
      }
      if (mutation.attributeName === 'data-group-required') {
        this._requiredFromGroup = !!isValidAttribute(this._element, 'data-group-required');
      }
    }
  }

  public connectedCallback(): void {
    toggleDatasetEntry(
      this._element,
      'withinSelectionPanel',
      !!this._element.closest('sbb-selection-panel')
    );
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._element.focus = (options: FocusOptions) => this._inputElement().focus(options);
    this._setupInitialStateAndAttributeObserver();
  }

  public disconnectedCallback(): void {
    this._checkboxAttributeObserver.disconnect();
  }

  @Listen('click')
  public handleClick(event: Event): void {
    forwardHostEvent(event, this._element, this._checkbox);
  }

  /** Method triggered on checkbox change. If not indeterminate, inverts the value; otherwise sets checked to true. */
  public checkedChanged(event: Event): void {
    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
    } else {
      this.checked = this._checkbox?.checked;
    }
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  public render(): JSX.Element {
    return (
      <span class="sbb-checkbox-wrapper">
        <label class="sbb-checkbox">
          <input
            ref={(checkbox: HTMLInputElement) => {
              this._checkbox = checkbox;
              // Forward indeterminate state to native input. As it is only a property, we have to set it programatically.
              this._checkbox.indeterminate = this.indeterminate;
            }}
            type="checkbox"
            disabled={this.disabled || this._disabledFromGroup}
            aria-disabled={this.disabled || this._disabledFromGroup}
            required={this.required || this._requiredFromGroup}
            checked={this.checked}
            value={this.value}
            {...getAccessibilityAttributeList(this)}
            onChange={(event: Event): void => this.checkedChanged(event)}
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
      </span>
    );
  }
}
