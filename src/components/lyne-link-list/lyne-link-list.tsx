import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { guid } from '../../global/guid';
import { InterfaceLyneLinkListAttributes } from './lyne-link-list.custom.d';
import { InterfaceTitleAttributes } from '../lyne-title/lyne-title.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-link-list.default.scss',
    shared: 'styles/lyne-link-list.shared.scss'
  },
  tag: 'lyne-link-list'
})

export class LyneLinkList {

  private _guid: string;

  /**
   * The title text we want to show
   * before the list
   */
  @Prop() public titleText?: string;

  /**
   * The semantic level of the title,
   * e.g. 3 = h3
   */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'] = '2';

  /**
   * Choose the link style variant
   */
  @Prop() public variant: InterfaceLyneLinkListAttributes['variant'] = 'positive';

  public componentWillLoad(): void {
    this._guid = guid();
  }

  public render(): JSX.Element {

    // const variantClass = ` link-list--${this.variant}`;
    const id = `title-${this._guid}`;

    return (
      <div>
        <lyne-title
          text={this.titleText}
          level={this.titleLevel}
          visual-level='5'
          id={id}
        >
        </lyne-title>
        <ul
          aria-labelledby={id}
          class='link-list'
          role='list' // this nonsense is needed for voice over
        >
          <slot name='link-list__item'/>
        </ul>
      </div>
    );
  }
}
