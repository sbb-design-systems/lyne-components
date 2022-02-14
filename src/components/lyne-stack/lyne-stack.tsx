import {
  Component,
  h,
  Host,
  Prop
} from '@stencil/core';
import { InterfaceStackAttributes } from './lyne-stack.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-stack.default.scss',
    shared: 'styles/lyne-stack.shared.scss'
  },
  tag: 'lyne-stack'
})

export class LyneStack {

  /** Stack appearance */
  @Prop() public appearance?: InterfaceStackAttributes['appearance'] = 'vertical';

  /**
   * Stack gap horizontal, defines the space between each stack items in the
   * vertical direction. The spacing can be fixed or responsive (which then
   * depends on the breakpoint). The `x` in the fixed spacing scale is a
   * representation of the base spacing unit. E.g. `3 * base spacing unit`
   */
  @Prop() public gapHorizontal?: InterfaceStackAttributes['gap'] = 'fixed-3x';

  /**
   * Stack gap vertical, defines the space between each stack items in the
   * horizontal direction. The spacing can be fixed or responsive
   * (which then depends on the breakpoint). The `x` in the
   * fixed spacing scale is a representation of the base spacing unit.
   * E.g. `3 * base spacing unit`
   */
  @Prop() public gapVertical?: InterfaceStackAttributes['gap'] = 'fixed-3x';

  /**
   * Space before the stack
   */
  @Prop() public spaceLeading?: InterfaceStackAttributes['spaceLeading'];

  /**
   * Space before the stack
   */
  @Prop() public spaceTrailing?: InterfaceStackAttributes['spaceTrailing'];

  /**
   * Stack tag / HTML representation of the stack. If the stack represents
   * a list of items change the HTML representation to `ul` or `ol` tag. In this
   * case the only allowed stack items are `li` elements.
   */
  @Prop() public tag?: InterfaceStackAttributes['tag'] = 'div';

  public render(): JSX.Element {

    const className = `stack stack--${this.appearance}`;

    /*
     * Conditionally add the CSS properties depending on the component
     * properties
     */
    let inlineStyles = {};

    if (this.gapHorizontal) {
      inlineStyles = {
        ...inlineStyles,
        'column-gap': `calc(var(--spacing-${this.gapHorizontal}) / var(--typo-scale-default) * 1rem)`
      };
    }
    if (this.gapVertical) {
      inlineStyles = {
        ...inlineStyles,
        'row-gap': `calc(var(--spacing-${this.gapVertical}) / var(--typo-scale-default) * 1rem)`
      };
    }
    if (this.spaceLeading) {
      inlineStyles = {
        ...inlineStyles,
        'padding-block-start': `calc(var(--spacing-${this.spaceLeading}) / var(--typo-scale-default) * 1rem)`
      };
    }
    if (this.spaceTrailing) {
      inlineStyles = {
        ...inlineStyles,
        'padding-block-end': `calc(var(--spacing-${this.spaceTrailing}) / var(--typo-scale-default) * 1rem)`
      };
    }

    const TAGNAME = this.tag;

    const attrs = {
      class: className,
      style: inlineStyles
    };

    return (
      <Host>
        <TAGNAME {...attrs}
        >
          <slot />
        </TAGNAME>
      </Host>
    );
  }
}
