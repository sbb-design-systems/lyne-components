import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './timetable-row-header.scss?lit&inline';

/**
 * Used in `sbb-timetable-row`, it displays information for screen-readers.
 */
@customElement('sbb-timetable-row-header')
export class SbbTimetableRowHeader extends LitElement {
  public static override styles: CSSResult = style;

  @property() public config!: string;

  protected override render(): TemplateResult {
    /**
     * Stringified JSON which defines most of the
     * content of the component. Please check the
     * individual stories to get an idea of the
     * structure.
     */
    const config = JSON.parse(this.config);

    const output = `${config.departure.time} ${config.departure.productText} ${config.departure.productMarketingName} ${config.departure.direction}.`;
    return html` <h3 class="row-header">${output}</h3> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-row-header': SbbTimetableRowHeader;
  }
}
