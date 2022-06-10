import {
  Component,
  Element,
  h, Host,
  Prop
} from '@stencil/core';
import events from './sbb-form-field.events';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-form-field.default.scss',
    shared: 'styles/sbb-form-field.shared.scss'
  },
  tag: 'sbb-form-field'
})

export class SbbFormField {

  private _id = '';

  @Prop() public label: string;

  @Prop() public optional?: boolean;

  @Element() private _element: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private _clickHandler = (): void => {

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: 'some event detail'
    });

    this._element.dispatchEvent(event);
  };

  public componentWillLoad(): void {
    this._element.querySelector('[slot="input"]')
      .setAttribute('id', 'input');
    this._id = this._element.querySelector('[slot="input"]')
      .getAttribute('id');
  }

  private _setFocus(): void {
    const input = this._element.querySelector('[slot="input"]') as HTMLElement;

    input.focus();
  }

  public render(): JSX.Element {
    const optional = this.optional
      ? ' (Optional)'
      : '';

    /* eslint-disable */
    return (
      <Host>
        <div>
          <label
            onClick={() => this._setFocus()}
            htmlFor={this._id}>
            <slot name='label'>
              <span>{ this.label }</span>
            </slot> {optional}
          </label>
        </div>
        <div>
          <slot name='input'></slot>
        </div>
        <div>
          <slot name='error'></slot>
        </div>
      </Host>
    );
  }
}
