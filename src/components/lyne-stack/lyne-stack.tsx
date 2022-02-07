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
   * Stack tag / HTML representation of the stack. If the stack represents
   * a list of items change the HTML representation to `ul` or `ol` tag. In this
   * case the only allowed stack items are `li` elements.
   */
  @Prop() public tag?: InterfaceStackAttributes['tag'] = 'div';

  public render(): JSX.Element {

    const className = `stack stack--${this.appearance}`;

    const TAGNAME = this.tag;

    const currentWritingMode = getDocumentWritingMode();

    const attrs = {
      class: className
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
