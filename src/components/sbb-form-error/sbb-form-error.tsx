import {
  Component,
  h
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

  public render(): JSX.Element {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }
}
