import { Component, h, JSX, Prop, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row-button.scss',
  tag: 'sbb-timetable-row-button',
})
export class SbbTimetableRowButton {
  private _button!: HTMLElement;

  /**
   * Set to true to initially show the
   * state, which would get set by pressing
   * the button.
   */
  @Prop({
    reflect: true,
  })
  public expanded?: boolean;

  /** The aria-label prop for the button. */
  @Prop() public accessibilityLabel?: string;

  /** The aria-controls prop for the button. */
  @Prop() public accessibilityControls?: string;

  /** The aria-haspopup prop for the button. */
  @Prop() public accessibilityHaspopup?: string;

  /** The disabled prop for the button. */
  @Prop() public disabled?: boolean;

  /** The tabIndex prop for the button. */
  @Prop() public tab?: number;

  /** The role prop for the button. */
  @Prop() public role?: string;

  /** The name prop for the button. */
  @Prop() public name?: string;

  /** Event for emiting whenever state is changed. */
  @Event() public sbbTimetableRowButtonClick: EventEmitter;

  /** watches the expanded attribute*/
  @Watch('expanded')
  public watchStateHandler(newValue: boolean): void {
    this.sbbTimetableRowButtonClick.emit();
    this.expanded = newValue;
    this._toggleAriaAttributes(false);
  }

  /** toggles the expanded attribute */
  private _toggleAriaAttributes(click: boolean): void {
    if (click) {
      this.expanded = !this.expanded;
    }

    const expand = String(this.expanded);

    this._button.setAttribute('aria-expanded', expand);
  }

  /** toggles the expanded attribute onClick*/
  private _clickHandler = (): void => {
    this._toggleAriaAttributes(true);
  };

  public render(): JSX.Element {
    return (
      <button
        disabled={this.disabled}
        tabIndex={this.tab}
        aria-expanded="false"
        aria-haspopup={this.accessibilityHaspopup}
        aria-label={this.accessibilityLabel}
        aria-controls={this.accessibilityControls}
        onClick={this._clickHandler}
        ref={(el) => (this._button = el)}
        type="button"
        role={this.role}
        name={this.name}
      >
        <slot />
      </button>
    );
  }
}
