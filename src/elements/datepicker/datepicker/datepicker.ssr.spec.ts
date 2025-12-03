import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { defaultDateAdapter } from '../../core/datetime.ts';
import { ssrHydratedFixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import type { SbbDateInputElement } from '../../date-input.ts';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle.ts';

import { SbbDatepickerElement } from './datepicker.component.ts';

import '../../date-input.ts';
import '../../datepicker.ts';
import '../../form-field.ts';

describe(`sbb-datepicker ssr`, () => {
  const asIso8601 = (date: Date): string => defaultDateAdapter.toIso8601(date);

  let root: SbbDatepickerElement;

  beforeEach(async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);
    root = await ssrHydratedFixture(
      html`
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-date-input value="01.01.2023"></sbb-date-input>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `,
      {
        modules: ['../../date-input.js', '../../datepicker.js', '../../form-field.js'],
      },
    );
  });

  it('should render full datepicker component set', async () => {
    const datepicker = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    assert.instanceOf(datepicker, SbbDatepickerElement);

    const dateInput = root.querySelector<SbbDateInputElement>('sbb-date-input')!;
    expect(asIso8601(dateInput.valueAsDate!)).to.equal(asIso8601(new Date(2023, 0, 1)));

    const datepickerToggle =
      root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    await datepickerToggle.updateComplete;
    expect(datepickerToggle.datepicker).to.equal(datepicker);
    await waitForLitRender(datepicker);
    expect(datepicker!.shadowRoot?.querySelector('sbb-calendar')).to.not.be.null;

    // When opening the calendar
    datepicker.open();

    // Then the calendar should be displayed
    expect(datepicker).not.to.match(':state(state-closed)');
  });
});
