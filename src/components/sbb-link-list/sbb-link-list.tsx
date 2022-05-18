import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { guid } from '../../global/guid';
import { InterfaceLinkListAttributes } from './sbb-link-list.custom';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom.d';

/**
 * @slot link-list__item - Use this to render the
 * list items with the links inside
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-link-list.default.scss',
    shared: 'styles/sbb-link-list.shared.scss'
  },
  tag: 'sbb-link-list'
})

export class SbbLinkList {

  private _guid: string;

  /**
   * The direction in which the list will be shown. "-from-large" indicates that
   * the list will be horizontal from above large breakpoint. Below it has the
   * default behaviour which is a vertical list.
   */
  @Prop() public listDirection: InterfaceLinkListAttributes['direction'] = 'vertical';

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
   * Choose the link list style. This
   * does not refer to light or dark
   * mode, but the background color
   * on which the list is placed. Light
   * and dark mode styling will be applied
   * differently.
   */
  @Prop() public variant: InterfaceLinkListAttributes['variant'] = 'positive';

  public componentWillLoad(): void {
    this._guid = guid();
  }

  public render(): JSX.Element {
    let additionalAttributes = {};

    const id = `title-${this._guid}`;

    if (this.titleText) {
      additionalAttributes = {
        'aria-labelledby': id
      };
    }

    return (
      // the role="list" is needed for voice over: https://bit.ly/3CDiZaG
      <div>
        {
          this.titleText
            ? <sbb-title
              id={id}
              level={this.titleLevel}
              text={this.titleText}
              variant={this.variant}
              visual-level='5'
            >
            </sbb-title>
            : ''
        }
        <ul
          {...additionalAttributes}
          class={
            `link-list link-list--${this.listDirection}`
          }
          role='list'
        >
          <slot name='link-list__item'/>
        </ul>
      </div>
    );
  }
}
