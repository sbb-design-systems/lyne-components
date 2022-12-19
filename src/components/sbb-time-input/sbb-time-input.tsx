import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
} from '@stencil/core';
import { forwardEventToHost } from '../../global/helpers/forward-event';
import {
  AccessibilityProperties,
  getAccessibilityAttributeList,
} from '../../global/interfaces/accessibility-properties';

const REGEX_PATTERN = /[0-9]{3,4}/;
const REGEX_GROUPS_WITH_COLON = /([0-9]{1,2})[.:,\-;_hH]?([0-9]{1,2})?/;
const REGEX_GROUPS_WO_COLON = /([0-9]{1,2})([0-9]{2})/;

@Component({
  shadow: true,
  styleUrl: 'sbb-time-input.scss',
  tag: 'sbb-time-input',
})
export class SbbTimeInput implements ComponentInterface, AccessibilityProperties {
  /** Value for the inner HTMLInputElement. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Date value with the given time for the inner HTMLInputElement. */
  @Prop({ mutable: true }) public valueAsDate?: Date;

  /** The <form> element to associate the inner HTMLInputElement with. */
  @Prop() public form?: string;

  /** Readonly state for the inner HTMLInputElement. */
  @Prop() public readonly?: boolean = false;

  /** Disabled state for the inner HTMLInputElement. */
  @Prop() public disabled?: boolean = false;

  /** Required state for the inner HTMLInputElement. */
  @Prop() public required?: boolean = false;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  /** Host element */
  @Element() private _element!: HTMLElement;

  /** Placeholder for the inner HTMLInputElement.*/
  private _placeholder = 'HH:MM';

  private _inputElement(): HTMLInputElement {
    return this._element.shadowRoot.querySelector('input');
  }

  /** Applies the correct format to values and triggers event dispatch. */
  private _updateValueAndEmitChange(event): void {
    this._updateValue(event.target.value);
    this._emitChange(event);
  }

  /**
   * Updates `value` and `valueAsDate`. The direct update on the `_inputElement` is required
   * to force the input change when the typed value is the same of the current one.
   */
  private _updateValue(value: string): void {
    this.value = this._formatValue(value);
    this.valueAsDate = this._formatValueAsDate(value);
    this._inputElement().value = this.value;
  }

  /** Emits the change event. */
  private _emitChange(event): void {
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  /** Returns the right format for the `value` property . */
  private _formatValue(value: string): string {
    const regGroups = this._validateInput(value);
    if (!regGroups || regGroups.length <= 2) {
      return null;
    }

    const hours = this._parseHour(regGroups[1]);
    const minutes = this._parseMinute(regGroups[2]);
    return `${hours}:${minutes}`;
  }

  /**
   * Returns the right format for the `valueAsDate` property:
   * sets the start date at 01.01.1970, then adds the typed hours/minutes.
   */
  private _formatValueAsDate(value: string): Date {
    const regGroups = this._validateInput(value);
    if (!regGroups || regGroups.length <= 2) {
      return null;
    }

    return new Date(new Date(0).setHours(+regGroups[1], +regGroups[2] || 0, 0, 0));
  }

  /** Validate input against the defined RegExps. */
  private _validateInput(value: string): RegExpMatchArray {
    if (REGEX_PATTERN.test(value)) {
      // special case: the input is 3 or 4 digits; split like so: AB?:CD
      return value.match(REGEX_GROUPS_WO_COLON);
    } else if (value) {
      return value.match(REGEX_GROUPS_WITH_COLON);
    } else {
      return null;
    }
  }

  /** Parse the hours with two chars. */
  private _parseHour(regGroupHours: string): string {
    return regGroupHours.length > 1 ? regGroupHours : '0' + regGroupHours;
  }

  /** Parse the minutes with two chars. */
  private _parseMinute(regGroupMin: string): string {
    regGroupMin = regGroupMin || '00';
    return regGroupMin.length > 1 ? regGroupMin : '0' + regGroupMin;
  }

  public connectedCallback(): void {
    // Forward focus call to action element
    this._element.focus = (options: FocusOptions) => this._inputElement().focus(options);
  }

  public render(): JSX.Element {
    const inputAttributes = {
      form: this.form || null,
      disabled: this.disabled || null,
      readonly: this.readonly || null,
      required: this.required || null,
      valueAsDate: this._formatValueAsDate(this.value) || null,
      value: this._formatValue(this.value) || null,
      placeholder: this._placeholder,
      ...getAccessibilityAttributeList(this),
    };
    return (
      <input
        type="text"
        {...inputAttributes}
        onChange={(event: Event) => this._updateValueAndEmitChange(event)}
      />
    );
  }
}
