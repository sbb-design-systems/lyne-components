import { Component, ComponentInterface, h, JSX, Prop } from '@stencil/core';
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

  public render(): JSX.Element {
    return (
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element">
          {this.variant === 'window' && (
            <div>
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </span>
      </span>
    );
  }
}
