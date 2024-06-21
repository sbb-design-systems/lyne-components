import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';
import './datepicker-previous-day.js';

import '../datepicker.js';
import '../../form-field.js';

describe(`sbb-datepicker-previous-day`, () => {
  const cases = [
    { name: 'no value', value: null },
    { name: 'with value', value: '15.02.2023' },
  ];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        `standalone ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          `);
        }),
      );

      for (const inputValue of cases) {
        it(
          `with picker ${inputValue.name} ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(html`
              <div style="display: flex; gap: 1em;">
                <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
                <input value="${inputValue.value || nothing}" id="datepicker-input" />
                <sbb-datepicker
                  id="datepicker"
                  input="datepicker-input"
                  now="2023-01-12T00:00:00Z"
                ></sbb-datepicker>
              </div>
            `);
          }),
        );

        describeEach({ negative: [true, false] }, ({ negative }) => {
          it(
            `with form-field ${inputValue.name} ${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-form-field ?negative=${negative}>
                  <input value=${inputValue.value || nothing} />
                  <sbb-datepicker-previous-day ?negative=${negative}></sbb-datepicker-previous-day>
                  <sbb-datepicker></sbb-datepicker>
                </sbb-form-field>
              `);
            }),
          );
        });
      }
    }
  });
});
