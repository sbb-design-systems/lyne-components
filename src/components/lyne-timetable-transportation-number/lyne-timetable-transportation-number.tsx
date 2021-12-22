import {
  Component,
  h,
  Prop
} from '@stencil/core';

import icons from '../../global/icons/timetable.json';
import { InterfaceLyneTimetableTransportationNumberAttributes } from './lyne-timetable-transportation-number.custom.d';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-transportation-number.default.scss',
    shared: 'styles/lyne-timetable-transportation-number.shared.scss'
  },
  tag: 'lyne-timetable-transportation-number'
})

export class LyneTimetableTransportationNumber {

  /**
   * Set the desired appearance of
   * the module.
   */
  @Prop() public appearance?: InterfaceLyneTimetableTransportationNumberAttributes['appearance'] = 'first-level';

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

  public render(): JSX.Element {

    const config = JSON.parse(this.config);
    const a11yLabel = `${config.meansOfTransport.text} ${config.product.text} ${config.marketingName} ${config.direction}`;

    const appearanceClasses = ` transportation-number--${this.appearance}`;

    /**
     * role='text' is used here to allow assistive
     * technologies to digest all text content at
     * once and skip the interpretation of the icons.
     * Even though it is not in the official list,
     * https://bit.ly/3oqOtei the role seems to work
     * fine and seems to be in use as well:
     * https://bit.ly/3n5tuhH
     */

    return (
      <p
        aria-label={a11yLabel}
        class={`transportation-number${appearanceClasses}`}
        role='text'
      >
        <span
          aria-hidden='true'
          class='transportation-number--visual'
          role='presentation'
        >
          <span
            class='transportation-number__means_of_transport'
            innerHTML={icons[config.meansOfTransport.picto]}
          >
          </span>
          {config.product.icon
            ? <span
              class='transportation-number__product-icon'
              innerHTML={icons[config.product.icon]}
            >
            </span>
            : <span class='transportation-number__product-text'>
              {config.product.text}
            </span>
          }
          <span class='transportation-number__direction'>
            <span class='transportation-number__direction_text'>
              {config.marketingName} {config.direction}
            </span>
          </span>
        </span>
        <span class='transportation-number--visually-hidden'>
          {a11yLabel}
        </span>
      </p>
    );
  }
}
