import { Component, h, JSX, Host } from '@stencil/core';
import { assignId } from '../../global/a11y';

let nextId = 0;

@Component({
  shadow: true,
  styleUrl: './sbb-form-error.scss',
  tag: 'sbb-form-error',
})
export class SbbFormError {
  public render(): JSX.Element {
    return (
      <Host ref={assignId(() => `sbb-form-error-${++nextId}`)}>
        <span class="form-error__icon">
          <slot name="icon">
            <svg
              class="form-error__icon-svg"
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="7" y1="3" x2="7" y2="8.5" />
              <line x1="7" y1="10" x2="7" y2="11" />
              <circle cx="7" cy="7" r="6.5" />
            </svg>
          </slot>
        </span>
        <span class="form-error-content">
          <slot />
        </span>
      </Host>
    );
  }
}
