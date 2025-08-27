import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSecondaryButtonElement } from '../../button/secondary-button.js';

import style from './timetable-form-swap-button.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-timetable-form-swap-button')
class SbbTimetableFormSwapButtonElement extends SbbSecondaryButtonElement {
  public static override styles: CSSResultGroup = [SbbSecondaryButtonElement.styles, style];

  public constructor() {
    super();
    this.iconName = 'arrow-change-small';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-form-swap-button': SbbTimetableFormSwapButtonElement;
  }
}
