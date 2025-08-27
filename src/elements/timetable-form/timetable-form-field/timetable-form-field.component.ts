import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbFormFieldElement } from '../../form-field/form-field.js';

import style from './timetable-form-field.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('sbb-timetable-form-field')
class SbbTimetableFormFieldElement extends SbbFormFieldElement {
  public static override styles: CSSResultGroup = [SbbFormFieldElement.styles, style];

  public constructor() {
    super();
    this.borderless = true;
    this.floatingLabel = true;
    this.width = 'collapse';
    this.size = 'l';
  }

  public override render(): TemplateResult {
    return html`
      <sbb-icon name="route-circle-start-small"></sbb-icon>
      ${super.render()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-form-field': SbbTimetableFormFieldElement;
  }
}
