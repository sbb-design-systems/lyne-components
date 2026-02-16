import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import '../../button/button.ts';
import '../../datepicker.ts';
import '../../divider.ts';
import '../../icon.ts';
import '../../signet.ts';
import '../../time-input.ts';
import '../../toggle.ts';
import '../timetable-form-field.ts';
import '../timetable-form-swap-button.ts';
import '../timetable-form-details.ts';
import './timetable-form.component.ts';

const fromToFields = (opt: { hasVia?: boolean } = {}): TemplateResult => html`
  <sbb-timetable-form-field>
    <label>From</label>
    <input type="text" name="from" />
  </sbb-timetable-form-field>
  <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
  ${opt.hasVia
    ? html`
        <sbb-timetable-form-field>
          <label>Via</label>
          <input type="text" name="via" />
        </sbb-timetable-form-field>
      `
    : nothing}
  <sbb-timetable-form-field>
    <label>To</label>
    <input type="text" name="to" />
  </sbb-timetable-form-field>
`;

const datepicker = (): TemplateResult => html`
  <sbb-form-field width="collapse" size="l" borderless class="sbb-timetable-form-mobile-block">
    <sbb-date-input
      value="2023-01-01"
      min="2000-01-01"
      max="2050-12-31"
      name="date"
    ></sbb-date-input>
    <sbb-datepicker-previous-day
      class="sbb-timetable-form-mobile-hidden"
    ></sbb-datepicker-previous-day>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
    <sbb-datepicker-next-day class="sbb-timetable-form-mobile-hidden"></sbb-datepicker-next-day>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
  <sbb-divider orientation="vertical" class="sbb-timetable-form-mobile-hidden"></sbb-divider>
`;

const expandedDatepicker = (): TemplateResult => html`
  <sbb-form-field width="collapse" size="l" borderless class="sbb-timetable-form-block">
    <sbb-date-input
      value="2023-01-01"
      min="2000-01-01"
      max="2050-12-31"
      name="date"
    ></sbb-date-input>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
`;

const timetableDetails = (opt: { expandedDatepicker?: boolean } = {}): TemplateResult => html`
  <sbb-timetable-form-details>
    ${opt.expandedDatepicker ? expandedDatepicker() : datepicker()}
    <sbb-form-field width="collapse" size="l" borderless>
      <sbb-time-input value="13:30"></sbb-time-input>
    </sbb-form-field>
    <sbb-toggle size="s" name="departure-arrival">
      <sbb-toggle-option value="departure">Dep</sbb-toggle-option>
      <sbb-toggle-option value="arrival">Arr</sbb-toggle-option>
    </sbb-toggle>
    <div style="flex-grow: 1;"></div>
    <sbb-button type="submit" size="m">Search</sbb-button>
  </sbb-timetable-form-details>
`;

const defaultTemplate = (): TemplateResult => html`
  <form class="sbb-timetable-form">
    <sbb-signet></sbb-signet>
    <sbb-timetable-form>${fromToFields()} ${timetableDetails()}</sbb-timetable-form>
  </form>
`;

describe('sbb-timetable-form', () => {
  describeViewports(() => {
    it(
      `${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(defaultTemplate());
      }),
    );

    it(
      `with via`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <form class="sbb-timetable-form">
            <sbb-signet></sbb-signet>
            <sbb-timetable-form
              >${fromToFields({ hasVia: true })} ${timetableDetails()}</sbb-timetable-form
            >
          </form>
        `);
      }),
    );

    it(
      `expanded datepicker`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <form class="sbb-timetable-form">
            <sbb-signet></sbb-signet>
            <sbb-timetable-form
              >${fromToFields()}
              ${timetableDetails({ expandedDatepicker: true })}</sbb-timetable-form
            >
          </form>
        `);
      }),
    );

    it(
      `with via_expanded datepicker`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <form class="sbb-timetable-form">
            <sbb-signet></sbb-signet>
            <sbb-timetable-form
              >${fromToFields({ hasVia: true })}
              ${timetableDetails({ expandedDatepicker: true })}</sbb-timetable-form
            >
          </form>
        `);
      }),
    );
  });

  describeViewports({ viewports: ['large'] }, () => {
    it(
      `from field_${visualDiffFocus.name}`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(defaultTemplate());
        setup.withStateElement(setup.snapshotElement.querySelector('sbb-timetable-form-field')!);
      }),
    );

    it(
      `swap button_${visualDiffFocus.name}`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(defaultTemplate());
        setup.withStateElement(
          setup.snapshotElement.querySelector('sbb-timetable-form-swap-button')!,
        );
      }),
    );

    it(
      `darkMode=true`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(defaultTemplate(), { darkMode: true });
        setup.withStateElement(
          setup.snapshotElement.querySelector('sbb-timetable-form-swap-button')!,
        );
      }),
    );

    it(
      `datepicker_${visualDiffFocus.name}`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(defaultTemplate());
        setup.withStateElement(setup.snapshotElement.querySelector('sbb-date-input')!);
      }),
    );
  });
});
