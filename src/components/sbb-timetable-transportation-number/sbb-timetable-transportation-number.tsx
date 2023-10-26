import icons from '../core/timetable/icons.json';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './sbb-timetable-transportation-number.scss?lit&inline';
import { SbbTimetableAppearance } from '../core/interfaces';

@customElement('sbb-timetable-transportation-number')
export class SbbTimetableTransportationNumber extends LitElement {
  public static override styles: CSSResult = style;

  /**
   * Set the desired appearance of
   * the component.
   */
  @property()
  public appearance?: SbbTimetableAppearance = 'first-level';

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @property() public config!: string;

  protected override render(): TemplateResult {
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

    return html`
      <p aria-label=${a11yLabel} class=${`transportation-number${appearanceClasses}`} role="text">
        <span aria-hidden="true" class="transportation-number--visual" role="presentation">
          <span
            class="transportation-number__means-of-transport"
            .innerHTML=${icons[config.meansOfTransport.picto]}
          ></span>
          ${config.product.icon
            ? html`<span
                class="transportation-number__product-icon"
                .innerHTML=${icons[config.product.icon]}
              ></span>`
            : html`<span class="transportation-number__product-text">${config.product.text}</span>`}
          <span class="transportation-number__direction">
            <span class="transportation-number__direction-text">
              ${config.marketingName} ${config.direction}
            </span>
          </span>
        </span>
        <span class="transportation-number--visually-hidden">${a11yLabel}</span>
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-transportation-number': SbbTimetableTransportationNumber;
  }
}
