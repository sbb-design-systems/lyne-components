import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-transporation-number.default.scss',
    shared: 'styles/lyne-timetable-transporation-number.shared.scss'
  },
  tag: 'lyne-timetable-transporation-number'
})

export class LyneTimetableTransporationNumber {

  /**
   * Stringified JSON to define the different outputs of the
   * transportations number cell.
   * Format:
   * {
   *  "direction": "Richtung Bern Wankdorf, Bahnhof",
   *  "meansOfTransport": {
   *    "picto": "<svg width=\"24\" height=\"24\"...></svg>",
   *    "text": "Bus"
   *  },
   *  "product":{
   *    "icon": "",
   *    "text":"B 20"
   *  }
   * }
   */
  @Prop() public config!: string;

  public render(): JSX.Element {

    const config = JSON.parse(this.config);

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
        aria-label={`${config.meansOfTransport.text}.${config.product.text}.${config.direction}`}
        class='transportation-number'
        role='text'
      >
        <span
          class='transportation-number__means_of_transport'
          innerHTML={config.meansOfTransport.picto}
          role='presentation'
        ></span>
        {config.product.icon
          ? <span
            class='transportation-number__product-icon'
            innerHTML={config.product.icon}
            role='presentation'
          >
          </span>
          : <span class='transportation-number__product-text'
          >
            {config.product.text}
          </span>
        }
        <span class='transportation-number__direction'>
          <span class='transportation-number__direction_text'>
            {config.direction}
          </span>
        </span>
      </p>
    );
  }
}
