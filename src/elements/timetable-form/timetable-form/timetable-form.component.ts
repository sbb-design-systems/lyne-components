import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './timetable-form.scss?lit&inline';

/**
 * Serves as a building block of a sbb 'timetable-form'.
 * It automatically handles the styles and part of its behaviors
 *
 * @slot - Use the unnamed slot to add content to the 'timetable-form'
 */
export
@customElement('sbb-timetable-form')
class SbbTimetableFormElement extends LitElement {
  public static override styles: CSSResultGroup = style;

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
