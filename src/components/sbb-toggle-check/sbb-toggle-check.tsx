import { Component, ComponentInterface, Element, EventEmitter, Event, h, JSX, Prop, State } from '@stencil/core';
import { forwardEventToHost } from '../../global/helpers/forward-event';
import { InterfaceToggleCheckAttributes } from './sbb-toggle-check.custom';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';

let nextId = 0;
@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-check.scss',
  tag: 'sbb-toggle-check',
})
export class SbbToggleCheck implements ComponentInterface, AccessibilityProperties {
  private _checkbox: HTMLInputElement;

  /** Whether the toggle-check is checked. */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /** Value of toggle-check. */
  @Prop() public value?: string;

  /** Name of the toggle-check. */
  @Prop() public name?: string;

  /** Id of the internal input element - default id will be set automatically. */
  @Prop() public inputId = `sbb-toggle-checkbox-${++nextId}`;

  /** The svg name for the true state - default -> 'tick-small' */
  @Prop() public icon = 'tick-small';

  /** The disabled prop for the disabled state. */
  @Prop({ reflect: true }) public disabled = false;

  /** The required prop for the required state. */
  @Prop() public required = false;

  /** The label position relative to the toggle. Defaults to 'after' */
  @Prop({ reflect: true }) public labelPosition?: InterfaceToggleCheckAttributes['labelPosition'] =
    'after';

  /** The aria-label prop for the hidden input. */
  @Prop() public accessibilityLabel: string | undefined;

  /** The aria-labelledby prop for the hidden input. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /** The aria-describedby prop for the hidden input. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  @Event({ bubbles: true, cancelable: true }) public didChange: EventEmitter;

  @Element() private _element!: HTMLElement;

  @State() private _hasLabelText = false;

  /** Method triggered on toggle change. */
  public checkedChanged(event: Event): void {
    this.checked = this._checkbox?.checked;
    forwardEventToHost(event, this._element);
    this.didChange.emit();
  }

  public connectedCallback(): void {
    this._hasLabelText = Array.from(this._element.childNodes).some(
      (n: ChildNode) => !(n as Element).slot && n.textContent
    );
  }

  private _onLabelSlotChange(event: Event): void {
    this._hasLabelText = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some((n: Node) => !!n.textContent.trim());
  }

  public render(): JSX.Element {
    return (
      <label class="sbb-toggle-check" htmlFor={this.inputId}>
        <input
          ref={(checkbox: HTMLInputElement): HTMLInputElement => (this._checkbox = checkbox)}
          type="checkbox"
          name={this.name}
          id={this.inputId}
          disabled={this.disabled}
          aria-disabled={this.disabled}
          required={this.required}
          checked={this.checked}
          value={this.value}
          onChange={(event: Event): void => this.checkedChanged(event)}
          aria-label={this.accessibilityLabel}
          aria-describedby={this.accessibilityDescribedby}
          aria-labelledby={this.accessibilityLabelledby}
        />
        <span class="sbb-toggle-check__container">
          <span class="sbb-toggle-check__label" hidden={!this._hasLabelText}>
            <slot onSlotchange={(event): void => this._onLabelSlotChange(event)} />
          </span>
          <span class="sbb-toggle-check__slider">
            <span class="sbb-toggle-check__circle">
              <slot name="icon">
                <sbb-icon name={this.icon}></sbb-icon>
              </slot>
            </span>
          </span>
        </span>
      </label>
    );
  }
}
