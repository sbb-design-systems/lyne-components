import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { hostContext } from '../../global/helpers/host-context';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { InterfaceSbbRadioButton } from './sbb-radio-button.custom';

let nextId = 0;

/** Configuration for the attribute to look at if component is nested in a sbb-radio-button-group */
const radioButtonObserverConfig: MutationObserverInit = {
  attributeFilter: ['data-required', 'data-disabled'],
};

/**
 * @slot unnamed - Use this slot to provide the radio label.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-radio-button.scss',
  tag: 'sbb-radio-button',
})
export class SbbRadioButton {
  /**
   * Id of the internal input element - default id will be set automatically.
   */
  @Prop() public radioButtonId = `sbb-radio-button-${++nextId}`;

  /**
   * Name of the radio button.
   */
  @Prop() public name: string;

  /**
   * Whether the radio can be deselected.
   */
  @Prop() public allowEmptySelection = false;

  /**
   * Value of radio button.
   */
  @Prop() public value: string;

  /**
   * Whether the radio button is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Whether the radio button is required.
   */
  @Prop() public required = false;

  /**
   * Whether the radio button is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Label size variant, either m or s.
   */
  @Prop({ reflect: true }) public size?: InterfaceSbbRadioButton['size'] = 'm';

  /**
   * Whether the component must be set disabled due disabled attribute on sbb-radio-button-group.
   */
  @State() private _disabledFromGroup = false;

  /**
   * Whether the component must be set required due required attribute on sbb-radio-button-group.
   */
  @State() private _requiredFromGroup = false;

  /**
   * Emits whenever the radio group value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-radio-button_did-select',
  })
  public didSelect: EventEmitter<any>;

  private _radioButtonLabelId = `sbb-radio-button-label-${++nextId}`;
  private _radioButtonAttributeObserver = new MutationObserver(
    this._onRadioButtonAttributesChange.bind(this)
  );

  @Element() private _element: HTMLElement;

  @Listen('click')
  public handleClick(event: Event): void {
    this.select();
    event.preventDefault();
  }

  @Method()
  public async select(): Promise<void> {
    if (this.disabled) {
      return;
    }

    let value = this.value;

    if (this.allowEmptySelection) {
      this.checked = !this.checked;
      value = this.checked ? value : undefined;
      this.didSelect.emit(value);
    } else if (!this.checked) {
      this.checked = true;
      this.didSelect.emit(value);
    }
  }

  public connectedCallback(): void {
    this._setupInitialStateAndAttributeObserver();
  }

  public disconnectedCallback(): void {
    this._radioButtonAttributeObserver.disconnect();
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    evt.code === 'Space' && this.select();
  }

  // Set up the initial disabled/required values and start observe attributes changes.
  private _setupInitialStateAndAttributeObserver(): void {
    if (hostContext('sbb-radio-button-group', this._element)) {
      this._disabledFromGroup = !!this._element.dataset.disabled;
      this._requiredFromGroup = !!this._element.dataset.required;
    }
    this._radioButtonAttributeObserver.observe(this._element, radioButtonObserverConfig);
  }

  // Observe changes on data attributes and set the appropriate values.
  private _onRadioButtonAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'data-disabled') {
        this._disabledFromGroup = true;
      }
      if (mutation.attributeName === 'data-required') {
        this._requiredFromGroup = true;
      }
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-checked={`${this.checked}`}
        aria-labelledby={this._radioButtonLabelId}
        role="radio"
      >
        <label
          id={this._radioButtonLabelId}
          htmlFor={this.radioButtonId}
          class="sbb-radio-button__label"
        >
          <input
            type="radio"
            aria-hidden="true"
            tabindex="-1"
            name={this.name}
            id={this.radioButtonId}
            disabled={this.disabled || this._disabledFromGroup}
            required={this.required || this._requiredFromGroup}
            checked={this.checked}
            value={this.value}
            class="sbb-radio-button"
          />
          <span class="sbb-radio-button__label-slot">
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}
