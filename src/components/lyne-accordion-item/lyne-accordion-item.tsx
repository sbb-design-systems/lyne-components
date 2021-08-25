/**
 * TODO:
 *
 * - hover states
 * - a11y
 * - accordion container
 * - storybook
 * - Slot description is not rendering on readme
 * - chevron-down-small has different name in figma. check doku page
 */

import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import chevronIcon from 'lyne-icons/dist/icons/chevron-down-small.svg';
import { InterfaceAccordionItemAttributes } from './lyne-accordion-item.custom.d';

/**
 * @slot icon - Pass an svg to display an icon left to the title.
 * @slot content - Pass html-content to show as the content of the accordion.
 * Use flat html: `<p>Some text</p><p>Some other text</p>` is ok.
 * This instead would not be ok:
 * <div><p>Some text</p><p>Some other text</p></div>
 */

const iconSlotName = 'icon';

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion-item.scss',
  tag: 'lyne-accordion-item'
})

export class LyneAccordionItem {

  /**
   * Text to show as title for the accordion
   */
  @Prop() public heading!: string;

  /**
   * Heading level
   */
  @Prop() public headingLevel?: InterfaceAccordionItemAttributes['level'] = '1';

  /**
   * Set this attribute for the first item in an accordion
   */
  @Prop() public first?: boolean;

  /**
   * Set this attribute for the last item in an accordion
   */
  @Prop() public last?: boolean;

  /**
   * Set to true to open the accordion item. Set to false to close it.
   */
  @Prop({
    reflect: true
  }) public open?: boolean;

  @Element() private _element: HTMLElement;

  private _toggleAccordion(): void {
    this.open = !this.open;
  }

  public render(): JSX.Element {
    const HEADING_TAGNAME = `h${this.headingLevel}`;

    const hasIconInSlot = this._element.querySelector(`svg[slot="${iconSlotName}"`) !== null;

    const iconClass = hasIconInSlot
      ? ' accordion-item--has-icon'
      : '';

    let firstAndLastClass = '';

    if (this.first) {
      firstAndLastClass = ' accordion-item--first';
    } else if (this.last) {
      firstAndLastClass = ' accordion-item--last';
    }

    const openClass = this.open
      ? ' accordion-item--open'
      : ' accordion-item--closed';

    return (
      <div class={`accordion-item${firstAndLastClass}${iconClass}${openClass}`}>

        <HEADING_TAGNAME
          class='accordion-item__heading'
          onClick={(): void => this._toggleAccordion()}
        >

          <button class='accordion-item__button'>

            <div class='accordion-item__icon'>
              <slot name={iconSlotName} />
            </div>

            <span class='accordion-item__title'>{this.heading}</span>

            <div
              class='accordion-item__chevron'
              innerHTML={chevronIcon}
            />

          </button>

        </HEADING_TAGNAME>

        <div class='accordion-item__body'>
          <slot name='content' />
        </div>

      </div>
    );
  }
}
