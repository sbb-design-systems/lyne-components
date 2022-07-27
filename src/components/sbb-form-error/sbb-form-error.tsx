import { Component, h, Host } from '@stencil/core';
import { assignId } from '../../global/helpers/assign-id';

let nextId = 0;
@Component({
  shadow: true,
  styleUrl: './sbb-form-error.scss',
  tag: 'sbb-form-error',
})
export class SbbFormError {

  public render(): JSX.Element {

    return (
      <Host aria-live="polite" ref={assignId(() => `sbb-form-error-${++nextId}`)}>
        <span>
          <slot name="icon">
            <sbb-icon name="circle-information-small" />
          </slot>
        </span>
        <span class="input-label-error">
          <slot />
        </span>
      </Host>
    );
  }
}
