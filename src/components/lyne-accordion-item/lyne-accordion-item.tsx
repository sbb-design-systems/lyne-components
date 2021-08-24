import {
  Component,
  h,
  Prop
} from '@stencil/core';
import chevronIcon from 'lyne-icons/dist/icons/chevron-down-small.svg';
import { InterfaceAccordionItemAttributes } from './lyne-accordion-item.custom.d';

/**
 * @slot icon - Pass an svg to display an icon left to the title
 * @slot content - Pass html-content to show as the content of the accordion
 */

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

  public render(): JSX.Element {
    const HEADING_TAGNAME = `h${this.headingLevel}`;

    return (
      <div class='accordion-item'>

        <HEADING_TAGNAME class='accordion-item__heading'>

          <button class='accordion-item__button'>

            <div class='accordion-item__icon'>
              <slot name='icon' />
            </div>

            <span class='accordion-item__title'>{this.heading}</span>

            <div
              class='accordion-item__arrow'
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
