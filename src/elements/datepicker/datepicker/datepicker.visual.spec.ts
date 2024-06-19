import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../datepicker-previous-day.js';
import '../datepicker-next-day.js';
import '../datepicker-toggle.js';
import './datepicker.js';
import '../../form-field.js';
import '../../calendar.js';

describe(`sbb-datepicker`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    states: [
      { disabled: false, readonly: false },
      { disabled: true, readonly: false },
      { disabled: false, readonly: true },
    ],
  };

  const handlingFunctions = [
    {
      name: 'ISO String (YYYY-MM-DD)',
      dateParser: (s: string) => new Date(s),
      format: (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
          d.getDate(),
        ).padStart(2, '0')}`,
    },
    {
      name: 'Business (DDMMYY)',
      dateParser: (s: string) =>
        new Date(+s.substring(4, s.length), +s.substring(2, 4) - 1, +s.substring(0, 2)),
      format: (d: Date) =>
        `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(
          2,
          '0',
        )}${d.getFullYear()}`,
    },
  ];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative, states }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-form-field ?negative=${negative} width="collapse">
            <label>Label</label>
            <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
            <sbb-datepicker-next-day></sbb-datepicker-next-day>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <input ?disabled=${states.disabled} ?readonly=${states.readonly} value="12.02.2023" />
            <sbb-datepicker now="12.02.2023"></sbb-datepicker>
          </sbb-form-field>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    for (const dateHandling of handlingFunctions) {
      it(
        `${dateHandling.name} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-form-field width="collapse">
              <label>Label</label>
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-datepicker-next-day></sbb-datepicker-next-day>
              <sbb-datepicker-toggle></sbb-datepicker-toggle>
              <input value="12.02.2023" />
              <sbb-datepicker
                now="12.02.2023"
                .dateParser=${dateHandling.dateParser}
                .format=${dateHandling.format}
              ></sbb-datepicker>
            </sbb-form-field>
          `);
        }),
      );
    }
  });
});
