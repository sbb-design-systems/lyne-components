import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';
import { InterfaceSbbLoadingIndicatorAttributes } from './sbb-loading-indicator.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-loading-indicator.scss',
  tag: 'sbb-loading-indicator',
})
export class SbbLoadingIndicator implements ComponentInterface {
  /** Variant of the loading indicator; `circle` is meant to be used inline, while `window` as overlay. */
  @Prop({ reflect: true }) public variant?: InterfaceSbbLoadingIndicatorAttributes['variant'];

  /** Size variant, either s or m. */
  @Prop({ reflect: true }) public size: InterfaceSbbLoadingIndicatorAttributes['size'] = 's';

  /** Whether the animation is enabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

  public render(): JSX.Element {
    return (
      <Host role="progressbar" aria-busy="true">
        <span class="sbb-loading-indicator">
          <span class="sbb-loading-indicator__animated-element">
            {this.variant === 'window' && (
              <span>
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>
            )}
          </span>
        </span>
      </Host>
    );
  }
}
