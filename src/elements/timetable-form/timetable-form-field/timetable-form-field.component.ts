import { type CSSResultGroup, html, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbFormFieldElement } from '../../form-field/form-field.ts';

import style from './timetable-form-field.scss?lit&inline';

/**
 * Extends the `sbb-form-field`. Meant to be used inside a `sbb-timetable-form`.
 */
export
@customElement('sbb-timetable-form-field')
class SbbTimetableFormFieldElement extends SbbFormFieldElement {
  public static override styles: CSSResultGroup = [SbbFormFieldElement.styles, style];

  private _routeIcon = false;

  public constructor() {
    super();
    this.borderless = true;
    this.floatingLabel = true;
    this.width = 'collapse';
    this.size = 'l';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (isServer) {
      return;
    }
    this.hydrationComplete.then(
      () => (this._routeIcon = this.matches(':first-of-type, :last-of-type')),
    );
  }

  public override render(): TemplateResult {
    return html`
      ${this._routeIcon
        ? html` <sbb-icon
            name="route-circle-start-small"
            class="sbb-timetable-form-field__start-route-icon"
          ></sbb-icon>`
        : html` <span class="sbb-timetable-form-field__via-route-icon"></span> `}
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
