import { customElement } from 'lit/decorators.js';

import { SbbCalendarBaseElement } from '../calendar.ts';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-calendar-enhanced')
class SbbCalendarEnhancedElement extends SbbCalendarBaseElement {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar-enhanced': SbbCalendarEnhancedElement;
  }
}
