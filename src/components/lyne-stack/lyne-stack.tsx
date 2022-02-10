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
   * Stack gap, defines the space between each stack items. The spacing can be
   * fixed or responsive (which then depends on the breakpoint). The `x` in the
   * fixed spacing scale is a representation of the base spacing unit.
   * E.g. `3 * base spacing unit`
   */
  @Prop() public gap?: InterfaceStackAttributes['gap'] = 'fixed-3x';

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

    if (this.gap) {
      inlineStyles = {
        ...inlineStyles,
        gap: `calc(var(--spacing-${this.gap}) / var(--typo-scale-default) * 1rem)`
      };
    }
    if (this.spaceLeading) {
      inlineStyles = {
        ...inlineStyles,
        'padding-top': `calc(var(--spacing-${this.spaceLeading}) / var(--typo-scale-default) * 1rem)`
      };
    }
    if (this.spaceTrailing) {
      inlineStyles = {
        ...inlineStyles,
        'padding-bottom': `calc(var(--spacing-${this.spaceTrailing}) / var(--typo-scale-default) * 1rem)`
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
