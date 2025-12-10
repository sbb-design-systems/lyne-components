import { customElement } from 'lit/decorators.js';

import { SbbCalendarBaseElement } from './calendar-base-element.ts';

/**
 * It displays a calendar which allows choosing a date.
 */
export
@customElement('sbb-calendar')
class SbbCalendarElement extends SbbCalendarBaseElement {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar': SbbCalendarElement;
  }
}
