import { type CSSResultGroup, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbFormFieldElement } from '../../form-field/form-field.js';

import style from './timetable-form-field.scss?lit&inline';

/**
 * Extends the `sbb-form-field`. Meant to be used inside a `sbb-timetable-form`.
 *
 * @slot - Use this slot to render an input/select or a supported non-native element.
 * @slot label - Use this slot to render a label.
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @slot error - Use this slot to render an error.
 *
 * @cssprop [--sbb-form-field-outline-offset] - To override the focus outline offset,
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
      <sbb-icon
        name="route-circle-start-small"
        class="sbb-timetable-form-field__route-icon"
      ></sbb-icon>
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
