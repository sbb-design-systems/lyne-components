import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceLyneTimetableCusHimAttributes } from './lyne-timetable-cus-him.custom.d';

@Component({
  shadow: false,
  styleUrls: {
    default: 'styles/lyne-timetable-cus-him.default.scss',
    shared: 'styles/lyne-timetable-cus-him.shared.scss'
  },
  tag: 'lyne-timetable-cus-him'
})

export class LyneTimetableCusHim {

  /**
   * Stringified JSON to define the different outputs of the
   * occupancy predicition cell.
   * Format:
   * occupancyItems: [
   * {
   *    class: '1',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'low'
   * },
   * {
   *    class: '2',
   *    icon: "<svg width="19" height="16"...></svg>",,
   *    occupancy: 'medium'
   *  }
   * ]
   */
  @Prop() public config!: string;

  /**
   * Variant of the Cus Him display,
   * can either be an icon only list
   * variant or a single icon with text
   */
  @Prop() public variant?: InterfaceLyneTimetableCusHimAttributes['variant'] = 'first-level-list';

  public render(): JSX.Element {

    const {
      cusHimItems
    } = JSON.parse(this.config);

    const variantClass = `cus-him--${this.variant}`;

    return (
      <div
        class={`cus-him ${variantClass}`}
      >
        <ul
          class='cus-him__list'
          role='list'
        >
          {cusHimItems.map((cusHimItem) => {

            return (
              <li class='cus-him__list-item'>
                <span
                  aria-label={cusHimItem.text}
                  class='cus-him__icon'
                  role='text'
                >
                  <svg><use xlinkHref={`#${cusHimItem.icon}`}></use></svg>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
