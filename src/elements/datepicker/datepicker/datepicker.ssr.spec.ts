import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { defaultDateAdapter } from '../../core/datetime.js';
import { ssrHydratedFixture } from '../../core/testing/private.js';
import type { SbbDateInputElement } from '../../date-input.js';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle.js';

import { SbbDatepickerElement } from './datepicker.component.js';

import '../../date-input.js';
import '../../datepicker.js';
import '../../form-field.js';

describe(`sbb-datepicker ssr`, () => {
  const asIso8601 = (date: Date): string => defaultDateAdapter.toIso8601(date);

  it('renders', async () => {
    const root = await ssrHydratedFixture(html`<sbb-datepicker></sbb-datepicker>`, {
      modules: ['./datepicker.component.js'],
    });
    assert.instanceOf(root, SbbDatepickerElement);
  });

  it('should render full datepicker component set', async () => {
    const root = await ssrHydratedFixture(
      html`
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-date-input value="01.01.2023"></sbb-date-input>
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `,
      {
        modules: ['../../date-input.js', '../../datepicker.js', '../../form-field.js'],
      },
    );

    const dateInput = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    expect(asIso8601(dateInput.valueAsDate!)).to.equal(asIso8601(new Date(2023, 0, 1)));

    const datepickerToggle =
      root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    await datepickerToggle.updateComplete;
    const datepicker = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    expect(datepickerToggle.datepicker).to.equal(datepicker);
    expect(datepicker!.shadowRoot?.querySelector('sbb-calendar')).to.not.be.null;

    // When opening the calendar
    datepicker.open();

    // Then the calendar should be displayed
    expect(datepicker.getAttribute('data-state')).not.to.be.equal('closed');
  });
});
