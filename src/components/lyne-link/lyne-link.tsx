import {
  Component,
  h,
  Prop
} from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-link.default.scss',
    shared: 'styles/lyne-link.shared.scss'
  },
  tag: 'lyne-link'
})

export class LyneLink {

  /** The link text we want to visually show */
  @Prop() public linkText!: string;

  public render(): JSX.Element {
    return (
      <a
        class={`lyne-link`}
      >
        {this.linkText}

      </a>
    );
  }
}
