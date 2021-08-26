/**
 * TODO:
 *
 * - hover states
 * - a11y
 * - accordion container
 * - storybook
 * - Slot description is not rendering on readme
 * - chevron-down-small has different name in figma. check doku page
 * - anchor
 * - when accordion is composed, check guid's
 * - make sure last-child slot has no padding bottom
 * - get animation properties from css
 * - focus style
 * - hover style
 * - don't animate on init open
 * - animate when prop changes from outside
 * - if init open, check animation for close
 */

import {
  Component,
  Element,
  h,
  Prop,
  State
} from '@stencil/core';
import anime from 'animejs/lib/anime.es.js';
import chevronIcon from 'lyne-icons/dist/icons/chevron-down-small.svg';
import guid from '../../global/guid';
import { InterfaceAccordionItemAttributes } from './lyne-accordion-item.custom.d';

/**
 * @slot icon - Pass an svg to display an icon left to the title.
 * @slot content - Pass html-content to show as the content of the accordion.
 * Use flat html: `<p>Some text</p><p>Some other text</p>` is ok.
 * This instead would not be ok:
 * <div><p>Some text</p><p>Some other text</p></div>
 */

const iconSlotName = 'icon';

const uniqueId = guid();

// !TODO!: missing design tokens
const animationDuration = '300ms';
const animationTimingFunction = 'cubicBezier(0.785, 0.135, 0.15, 0.86)';

@Component({
  shadow: true,
  styleUrl: 'lyne-accordion-item.scss',
  tag: 'lyne-accordion-item'
})

export class LyneAccordionItem {

  /**
   * Text to show as title for the accordion.
   */
  @Prop() public heading!: string;

  /**
   * Heading level.
   */
  @Prop() public headingLevel?: InterfaceAccordionItemAttributes['level'] = '1';

  /**
   * Set this attribute for the first item in an accordion.
   */
  @Prop() public first?: boolean;

  /**
   * Set this attribute for the last item in an accordion.
   */
  @Prop() public last?: boolean;

  /**
   * Set to true to open the accordion item. Set to false to close it.
   */
  @Prop({
    reflect: true
  }) public open?: boolean;

  @State() private _isAnimating = false;

  @Element() private _element: HTMLElement;

  private _accordionBody!: HTMLElement;

  private _toggleAccordion(): void {
    if (this._isAnimating) {
      return;
    }

    this._isAnimating = true;

    let newHeight = 0;

    if (this.open) {
      const initHeight = this._accordionBody.getBoundingClientRect().height;

      this._accordionBody.style.setProperty('height', `${initHeight}px`);
    } else {
      this._accordionBody.style.setProperty('height', 'auto');
      this._accordionBody.style.setProperty('display', 'block');
      this._accordionBody.style.setProperty('opacity', '0');

      newHeight = this._accordionBody.getBoundingClientRect().height;

      this._accordionBody.style.removeProperty('height');
    }

    this.open = !this.open;

    anime({
      complete: () => {
        if (this.open) {
          this._accordionBody.style.setProperty('height', 'auto');
        } else {
          this._accordionBody.style.setProperty('height', '0');
        }

        this._isAnimating = false;
      },
      duration: animationDuration,
      easing: animationTimingFunction,
      height: newHeight,
      opacity: 1,
      targets: this._accordionBody
    });

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

    const ariaHidden = this.open
      ? 'false'
      : 'true';

    return (
      <div class={`accordion-item${firstAndLastClass}${iconClass}${openClass}`}>

        <HEADING_TAGNAME
          class='accordion-item__heading'
          onClick={(): void => this._toggleAccordion()}
        >

          <button
            class='accordion-item__button'
            aria-label={this.heading}
            aria-expanded={this.open}
            aria-controls={`${uniqueId}_body`}
          >

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

        <div
          class='accordion-item__body'
          id={`${uniqueId}_body`}
          aria-hidden={ariaHidden}
          ref={(el): void => {
            this._accordionBody = el;
          }}
        >
          <div class='accordion-item__body-inner'>
            <slot name='content' />
          </div>
        </div>

      </div>
    );
  }
}
