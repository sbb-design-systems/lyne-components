import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { SbbElement } from '../../core.ts';

import style from './timetable-form-details.scss?inline';

/**
 * Wraps the details section of the `sbb-timetable-form`.
 *
 * @slot - Use the unnamed slot to add content to the details section.
 */
export class SbbTimetableFormDetailsElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-timetable-form-details';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-form-details': SbbTimetableFormDetailsElement;
  }
}
