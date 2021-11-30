import {
  Component,
  h,
  Prop
} from '@stencil/core';

/**
 * @slot pre-text - placeholder to put content inline before the item text
 * @slot post-text - placeholder to put content inline after the item text
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-autocomplete-item.default.scss',
    shared: 'styles/lyne-autocomplete-item.shared.scss'
  },
  tag: 'lyne-autocomplete-item'
})

export class LyneAutocompleteItem {

  /**
   * Text to show as content of the autocomplete item
   */
  @Prop() public text!: string;

  public render(): JSX.Element {
    return (
      <li class='autocomplete__list-item'>
        <slot name='pre-text' />
        <span>{this.text}</span>
        <slot name='post-text' />
      </li>
    );
  }
}
