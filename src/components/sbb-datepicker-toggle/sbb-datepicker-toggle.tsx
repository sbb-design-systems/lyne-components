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
import { SbbCalendarCustomEvent } from '../../components';
import { getDatePicker } from '../sbb-datepicker/sbb-datepicker.helper';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-toggle.scss',
  tag: 'sbb-datepicker-toggle',
})
export class SbbDatepickerToggle implements ComponentInterface {
  /** Datepicker reference */
  @Prop() public datePicker?: string | HTMLElement;

  @Element() private _element: HTMLSbbDatepickerToggleElement;

  @State() private _triggerElement: HTMLElement;

  private _datePicker: HTMLSbbDatepickerElement;

  private _calendarElement: HTMLSbbCalendarElement;

  private _openedByKeyboard = false;

  private _datePickerController: AbortController;

  @Watch('datePicker')
  public findDatePicker(newValue: string | HTMLElement, oldValue: string | HTMLElement): void {
    if (newValue !== oldValue) {
      this._init(this.datePicker);
    }
  }

  public connectedCallback(): void {
    this._datePickerController = new AbortController();
    this._init(this.datePicker);
  }

  public componentDidLoad(): void {
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.code === 'Enter' || event.code === 'Space') {
          this._openedByKeyboard = true;
        }
      },
      { signal: this._datePickerController.signal }
    );
  }

  public disconnectedCallback(): void {
    this._datePickerController.abort();
  }

  private _init(trigger?: string | HTMLElement): void {
    this._datePicker = getDatePicker(this._element, trigger);
    this._datePicker?.addEventListener(
      'change',
      () => {
        if (this._datePicker.valueAsDate !== this._calendarElement.selectedDate) {
          this._calendarElement.selectedDate = this._datePicker.valueAsDate;
        }
      },
      { signal: this._datePickerController.signal }
    );
  }

  private _resolveArgs(): Record<string, any> {
    return {
      min: this._datePicker?.min,
      max: this._datePicker?.max,
      wide: this._datePicker?.wide,
      dateFilter: this._datePicker?.dateFilter,
    };
  }

  public render(): JSX.Element {
    const disabled = !this._datePicker || this._datePicker.disabled || this._datePicker.readonly;
    return (
      <Host slot="prefix">
        <sbb-tooltip-trigger
          ref={(el) => (this._triggerElement = el)}
          iconName="calendar-small"
          disabled={disabled}
        />
        <sbb-tooltip
          onDid-close={() => {
            this._openedByKeyboard = false;
          }}
          onDid-open={() => {
            this._openedByKeyboard && this._calendarElement.focusCell();
          }}
          trigger={this._triggerElement}
          data-hide-close-button
        >
          <sbb-calendar
            {...this._resolveArgs()}
            ref={(calendar: HTMLSbbCalendarElement) => {
              this._calendarElement = calendar;
              this._calendarElement.selectedDate = this._datePicker?.valueAsDate;
            }}
            onDate-selected={(d: SbbCalendarCustomEvent<Date>) => {
              this._datePicker.valueAsDate = d.detail;
            }}
          ></sbb-calendar>
        </sbb-tooltip>
      </Host>
    );
  }
}
