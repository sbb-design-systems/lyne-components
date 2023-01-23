import { Component, h, JSX, Prop, State } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-datepicker.scss',
  tag: 'sbb-datepicker',
})
export class SbbDatepicker {
  /** If set to true, two months are displayed */
  @Prop() public wide = false;

  /** The minimum valid date. */
  @Prop() public min: Date | string | number;

  /** The maximum valid date. */
  @Prop() public max: Date | string | number;

  /** A function used to filter out dates. */
  @Prop() public dateFilter: (date: Date | null) => boolean = () => true;

  public connectedCallback(): void {
    this._datePickerController = new AbortController();
  }

  private _registerTrigger(el: HTMLElement): void {
    this._trigger = el;
    this._trigger.addEventListener(
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private _resolveArgs() {
    return {
      min: this.min,
      max: this.max,
      wide: this.wide,
      dateFilter: this.dateFilter,
    };
  }

  @State() private _trigger: HTMLElement;
  private _calendarElement: HTMLSbbCalendarElement;
  private _openedByKeyboard = false;
  private _datePickerController: AbortController;

  public render(): JSX.Element {
    const args = this._resolveArgs();

    return [
      <sbb-button
        variant="transparent"
        ref={(el) => {
          this._registerTrigger(el);
        }}
        iconName="calendar-small"
      >
      </sbb-button>,
      <sbb-tooltip
        onDid-close={() => {
          this._openedByKeyboard = false;
        }}
        onDid-open={() => {
          this._openedByKeyboard && this._calendarElement.focus();
        }}
        trigger={this._trigger}
        hide-close-button={true}
      >
        <sbb-calendar
          {...args}
          ref={(calendar: HTMLSbbCalendarElement) => (this._calendarElement = calendar)}
        ></sbb-calendar>
      </sbb-tooltip>,
    ];
  }
}
