import { Component, h, Host, Prop } from '@stencil/core';
import { InterfaceFooterAttributes } from './sbb-footer.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-footer.scss',
  tag: 'sbb-footer',
})
export class SbbFooter {
  /**
   * Negative coloring variant flag
   */
  @Prop() public negative: boolean;

  @Prop() public variant?: InterfaceFooterAttributes['variant'] = 'default';

  /** Footer title text, visually hidden,  necessary for screenreaders */
  @Prop() public accessibilityTitle!: string;

  public render(): JSX.Element {
    const variantClass = this.variant !== 'default' ? ' footer--clock-columns' : '';
    const negativeClass = this.negative ? ' footer--negative' : '';

    const attrs = {
      class: `footer${variantClass}${negativeClass}`,
    };

    return (
      <Host>
        <footer role="contentinfo" {...attrs}>
          {this.accessibilityTitle.length && (
            <sbb-title level="1" visually-hidden="true">
              <span slot="title">{this.accessibilityTitle}</span>
            </sbb-title>
          )}
          <slot />
        </footer>
      </Host>
    );
  }
}
