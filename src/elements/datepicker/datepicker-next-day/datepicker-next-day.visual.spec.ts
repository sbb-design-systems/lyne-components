import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';
import './datepicker-next-day.js';

import '../datepicker.js';
import '../../form-field.js';

describe(`sbb-datepicker-next-day`, () => {
  const cases = [
    { name: 'no value', value: null },
    { name: 'with value', value: '15.02.2023' },
  ];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        `standalone ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html` <sbb-datepicker-next-day></sbb-datepicker-next-day> `);
        }),
      );

      for (const inputValue of cases) {
        it(
          `with picker ${inputValue.name} ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(html`
              <div style="display: flex; gap: 1em;">
                <input value="${inputValue.value || nothing}" id="datepicker-input" />
                <sbb-datepicker
                  id="datepicker"
                  input="datepicker-input"
                  now="2023-01-12T00:00:00Z"
                ></sbb-datepicker>
                <sbb-datepicker-next-day></sbb-datepicker-next-day>
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
                  <sbb-datepicker></sbb-datepicker>
                  <sbb-datepicker-next-day ?negative=${negative}></sbb-datepicker-next-day>
                </sbb-form-field>
              `);
            }),
          );
        });
      }
    }
  });
});
