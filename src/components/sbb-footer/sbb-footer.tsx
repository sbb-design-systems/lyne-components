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
  @Prop({ reflect: true }) public negative = false;

  /**
   * Variants to display the footer. The default, displays the content in regular block element
   * approach. The clock-columns, used a css-grid for displaying the content over different
   * breakpoints.
   */
  @Prop({ reflect: true }) public variant: InterfaceFooterAttributes['variant'] = 'default';

  /** Footer title text, visually hidden,  necessary for screenreaders */
  @Prop() public accessibilityTitle?: string;

  public render(): JSX.Element {
    return (
      <Host>
        <footer role="contentinfo" class="footer">
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
