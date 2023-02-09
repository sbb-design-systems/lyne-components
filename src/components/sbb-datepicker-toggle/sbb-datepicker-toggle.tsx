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
import { hostContext } from '../../global/helpers/host-context';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker-toggle.scss',
  tag: 'sbb-datepicker-toggle',
})
export class SbbDatepickerToggle implements ComponentInterface {
  /** Datepicker reference */
  @Prop() public datePicker?: string | HTMLElement;

  @Element() private _element: HTMLElement;

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
    this._init(this.datePicker);
    this._datePickerController = new AbortController();
  }

  public disconnectedCallback(): void {
    this._datePickerController.abort();
  }

  private _init(trigger?: string | HTMLElement): void {
    if (!trigger) {
      const parent = hostContext('sbb-form-field', this._element);
      this._datePicker = parent.querySelector('sbb-datepicker') as HTMLSbbDatepickerElement;
    } else {
      // Check whether it's a string or an HTMLElement
      if (typeof trigger === 'string') {
        this._datePicker = document.getElementById(trigger) as HTMLSbbDatepickerElement;
      } else if (trigger instanceof window.Element) {
        this._datePicker = trigger as HTMLSbbDatepickerElement;
      }
    }

    this._datePicker.addEventListener('change', () => {
      if (this._datePicker.valueAsDate !== this._calendarElement.selectedDate) {
        this._calendarElement.selectedDate = this._datePicker.valueAsDate;
      }
    });
  }

  private _resolveArgs(): Record<string, any> {
    return {
      min: this._datePicker.min,
      max: this._datePicker.max,
      wide: this._datePicker.wide,
      dateFilter: this._datePicker.dateFilter,
    };
  }

  private _registerTrigger(el: HTMLElement): void {
    this._triggerElement = el;
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

  public render(): JSX.Element {
    return (
      <Host slot="prefix">
        <sbb-tooltip-trigger ref={(e) => this._registerTrigger(e)} iconName="calendar-small" />
        <sbb-tooltip
          onDid-close={() => {
            this._openedByKeyboard = false;
          }}
          onDid-open={() => {
            this._openedByKeyboard && this._calendarElement.focus();
          }}
          trigger={this._triggerElement}
          data-hide-close-button
        >
          <sbb-calendar
            {...this._resolveArgs()}
            ref={(calendar: HTMLSbbCalendarElement) => {
              this._calendarElement = calendar;
              this._calendarElement.selectedDate = this._datePicker.valueAsDate;
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
