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
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';

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

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  /** Host element */
  @Element() private _element!: HTMLElement;

  private _placeholder = 'HH:MM';

  private _inputElement(): HTMLElement {
    return this._element.shadowRoot.querySelector('input');
  }

  /** Emits the change event. */
  private _emitChange(event): void {
    forwardEventToHost(event, this._element);
    this.didChange.emit();
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
      valueAsDate: this.valueAsDate || null,
      value: this.value || null,
      placeholder: this._placeholder,
      'aria-label': this.accessibilityLabel || null,
      'aria-describedby': this.accessibilityDescribedby || null,
      'aria-labelledby': this.accessibilityLabelledby || null,
    };
    return (
      <input
        type="text"
        {...inputAttributes}
        onChange={(event: Event) => this._emitChange(event)}
      />
    );
  }
}
