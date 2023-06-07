import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceFooterAttributes } from './sbb-footer.custom';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-footer.scss',
  tag: 'sbb-footer',
})
export class SbbFooter {
  /**
   * Variants to display the footer. The default, displays the content in regular block element
   * approach. The clock-columns, used a css-grid for displaying the content over different
   * breakpoints.
   */
  @Prop({ reflect: true }) public variant: InterfaceFooterAttributes['variant'] = 'default';

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  /**
   * Whether to allow the footer content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @Prop({ reflect: true }) public expanded = false;

  /** Footer title text, visually hidden, necessary for screen readers. */
  @Prop() public accessibilityTitle?: string;

  /** Level of the accessibility title, will be rendered as heading tag (e.g. h1). Defaults to level 1. */
  @Prop() public accessibilityTitleLevel: InterfaceTitleAttributes['level'] = '1';

  public render(): JSX.Element {
    const TITLE_TAG_NAME = `h${this.accessibilityTitleLevel}`;

    return (
      <footer class="sbb-footer">
        <div class="sbb-footer-wrapper">
          {this.accessibilityTitle && (
            <TITLE_TAG_NAME class="sbb-footer__title">{this.accessibilityTitle}</TITLE_TAG_NAME>
          )}
          <slot />
        </div>
      </footer>
    );
  }
}
