import { Component, h, JSX, Host, Prop } from '@stencil/core';
import { InterfaceStackAttributes } from './sbb-stack.custom';

@Component({
  shadow: true,
  styleUrl: 'sbb-stack.scss',
  tag: 'sbb-stack',
})
export class SbbStack {
  /** Stack appearance */
  @Prop() public appearance?: InterfaceStackAttributes['appearance'] = 'vertical';

  /**
   * Collapse horizontal stack into vertical layout below a
   * certain breakpoint. This has only an effect for horizontal appearances.
   */
  @Prop()
  public collapseHorizontalBelow?: InterfaceStackAttributes['collapseHorizontalBelow'];

  /**
   * Stack gap horizontal, defines the space between each stack items in the
   * vertical direction. The spacing can be fixed or responsive (which then
   * depends on the breakpoint). The `x` in the fixed spacing scale is a
   * representation of the base spacing unit. E.g. `3 * base spacing unit`
   */
  @Prop() public gapHorizontal?: InterfaceStackAttributes['spacing'] = 'fixed-3x';

  /**
   * Stack gap vertical, defines the space between each stack items in the
   * horizontal direction. The spacing can be fixed or responsive
   * (which then depends on the breakpoint). The `x` in the
   * fixed spacing scale is a representation of the base spacing unit.
   * E.g. `3 * base spacing unit`
   */
  @Prop() public gapVertical?: InterfaceStackAttributes['spacing'] = 'fixed-3x';

  /** Render stack as placeholder */
  @Prop() public isPlaceholder?: boolean;

  /** Render horizontal stack as non-wrapping stack */
  @Prop() public noWrap?: boolean;

  /**
   * Space before the stack
   */
  @Prop() public spaceLeading?: InterfaceStackAttributes['spacing'];

  /**
   * Space before the stack
   */
  @Prop() public spaceTrailing?: InterfaceStackAttributes['spacing'];

  /**
   * Stack height, reflects CSS property `height` and accepts all
   * appropriate/valid CSS height values
   */
  @Prop() public stackHeight?: string;

  /**
   * Stack width, reflects CSS property `width` and accepts all
   * appropriate/valid CSS width values
   */
  @Prop() public stackWidth?: string;

  /**
   * Stack tag / HTML representation of the stack. If the stack represents
   * a list of items change the HTML representation to `ul` or `ol` tag. In this
   * case the only allowed stack items are `li` elements.
   */
  @Prop() public tag?: InterfaceStackAttributes['tag'] = 'div';

  public render(): JSX.Element {
    let className = `stack stack--${this.appearance}`;

    if (this.collapseHorizontalBelow) {
      className += ` stack--horizontal--collapse-below--${this.collapseHorizontalBelow}`;
    }

    if (this.isPlaceholder) {
      className += ' stack--is-placeholder';
    }

    if (this.noWrap) {
      className += ' stack--is-non-wrapping';
    }

    /*
     * Conditionally add the CSS properties depending on the component
     * properties
     */
    let inlineStyles = {};

    if (this.gapHorizontal) {
      inlineStyles = {
        ...inlineStyles,
        'column-gap': `var(--sbb-spacing-${this.gapHorizontal})`,
      };
    }
    if (this.gapVertical) {
      inlineStyles = {
        ...inlineStyles,
        'row-gap': `var(--sbb-spacing-${this.gapVertical})`,
      };
    }
    if (this.spaceLeading) {
      inlineStyles = {
        ...inlineStyles,
        'margin-block-start': `var(--sbb-spacing-${this.spaceLeading})`,
      };
    }
    if (this.spaceTrailing) {
      inlineStyles = {
        ...inlineStyles,
        'margin-block-end': `var(--sbb-spacing-${this.spaceTrailing})`,
      };
    }
    if (this.stackWidth) {
      inlineStyles = {
        ...inlineStyles,
        width: `${this.stackWidth}`,
      };
    }
    if (this.stackHeight) {
      inlineStyles = {
        ...inlineStyles,
        height: `${this.stackHeight}`,
      };
    }

    const TAGNAME = this.tag;

    const attrs = {
      class: className,
      style: inlineStyles,
    };

    return (
      <Host>
        <TAGNAME {...attrs}>
          <slot />
        </TAGNAME>
      </Host>
    );
  }
}
