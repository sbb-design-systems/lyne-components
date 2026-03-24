import { html, unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';

import { SbbElement } from '../../core.ts';

import style from './timetable-form.scss?inline';

/**
 * Serves as a building block of a sbb 'timetable-form'.
 * It automatically handles the styles and part of its behaviors
 *
 * @slot - Use the unnamed slot to add content to the 'timetable-form'
 */
export class SbbTimetableFormElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-timetable-form';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-form': SbbTimetableFormElement;
  }
}
