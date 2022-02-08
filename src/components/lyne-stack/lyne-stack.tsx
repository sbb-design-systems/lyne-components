import {
  Component,
  h,
  Host,
  Prop
} from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
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

    const inlineStyles = {
      'gap': `calc(var(--spacing-${this.gap}) / var(--typo-scale-default) * 1rem)`,
      'padding-bottom': `calc(var(--spacing-${this.spaceTrailing}) / var(--typo-scale-default) * 1rem)`,
      'padding-top': `calc(var(--spacing-${this.spaceLeading}) / var(--typo-scale-default) * 1rem)`
    };

    // TODO: only inject inline styles if corresponding properties were set
    // {this._hasIconSlot
    //   ? <span class='card-product__icon'><slot name='icon'/></span>
    //   : ''
    // }

    const TAGNAME = this.tag;

    const currentWritingMode = getDocumentWritingMode();

    const attrs = {
      class: className,
      style: inlineStyles
    };

    return (
      <Host>
        <TAGNAME {...attrs}
          dir={currentWritingMode}
        >
          <slot />
        </TAGNAME>
      </Host>
    );
  }
}
