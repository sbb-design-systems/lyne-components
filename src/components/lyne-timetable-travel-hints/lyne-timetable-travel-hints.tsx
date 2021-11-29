import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceLyneTimetableTravelHintsAttributes } from './lyne-timetable-travel-hints.custom.d';

@Component({
  shadow: false,
  styleUrls: {
    default: 'styles/lyne-timetable-travel-hints.default.scss',
    shared: 'styles/lyne-timetable-travel-hints.shared.scss'
  },
  tag: 'lyne-timetable-travel-hints'
})

export class LyneTimetableTravelHints {

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
   * Variant of the Travel Hints display,
   * can either be used on level 1 or
   * level 2 of the timetable
   */
  @Prop() public variant?: InterfaceLyneTimetableTravelHintsAttributes['variant'] = 'first-level-list';

  public render(): JSX.Element {

    const {
      travelHintsItems
    } = JSON.parse(this.config);

    const variantClass = `travel-hints--${this.variant}`;

    return (
      <div
        class={`travel-hints ${variantClass}`}
      >
        <ul
          class='travel-hints__list'
          role='list'
        >
          {travelHintsItems.map((travelHintItem) => {

            return (
              <li class='travel-hints__list-item'>
                <span
                  aria-label={travelHintItem.text}
                  class='travel-hints__icon'
                  role='text'
                  title={travelHintItem.text}
                >
                  <svg
                    class={`icon--${travelHintItem.icon}`}
                  >
                    <use xlinkHref={`#${travelHintItem.icon}`}></use>
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
