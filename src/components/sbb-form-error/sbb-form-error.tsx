import { Component, h, Host, Prop } from '@stencil/core';
import { InterfaceSbbFormErrorAttributes } from './sbb-form-error.custom';

let nextId = 0;
@Component({
  shadow: true,
  styleUrl: './sbb-form-error.scss',
  tag: 'sbb-form-error',
})
export class SbbFormError {
  /**
   * Add a specific space if the `<sbb-error>` is present.
   */
  @Prop() public errorSpace?: InterfaceSbbFormErrorAttributes['errorSpace'] = 'default';

  public render(): JSX.Element {
    const cssClassErrorSpace = `form-error--error-space-${this.errorSpace}`;
    const cssClass = `input-label-error__icon ${cssClassErrorSpace}`;

    return (
      <Host
        aria-live="polite"
        ref={(host): void => {
          if (!host.id) {
            host.id = `sbb-form-error-${++nextId}`;
          }
        }}
      >
        <span class={cssClass}>
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
