import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { guid } from '../../global/guid';
import { InterfaceLyneLinkListAttributes } from './lyne-link-list.custom.d';
import { InterfaceTitleAttributes } from '../lyne-title/lyne-title.custom.d';

/**
 * @slot link-list__item - Use this to render the
 * list items with the links inside
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
   * The direction in which the list will be shown.
   */
  @Prop() public listDirection: InterfaceLyneLinkListAttributes['direction'] = 'vertical';

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
  @Prop() public variant: InterfaceLyneLinkListAttributes['variant'] = 'positive';

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
            ? <lyne-title
              id={id}
              level={this.titleLevel}
              text={this.titleText}
              variant={this.variant}
              visual-level='5'
            >
            </lyne-title>
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
