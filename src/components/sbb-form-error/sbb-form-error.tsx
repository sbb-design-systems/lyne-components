import {
  Component,
  h, Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-form-error.default.scss',
    shared: 'styles/sbb-form-error.shared.scss'
  },
  tag: 'sbb-form-error'
})

export class SbbFormError {

  @Prop() public id: string;

  public render(): JSX.Element {
    return (
      <div id={this.id}>
        <slot></slot>
      </div>
    );
  }
}
