import { Component, ComponentInterface, h, JSX, Prop } from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-loading-indicator.scss',
  tag: 'sbb-loading-indicator',
})
export class SbbLoadingIndicator implements ComponentInterface {
  @Prop({ reflect: true }) public type?: 'window' | 'circle';

  @Prop({ reflect: true }) public size?: 'small' | 'large';

  public componentWillLoad(): void {
    console.log('type: ' + this.type);
  }

  public render(): JSX.Element {
    return (
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element">
          {this.type === 'window' && (
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
