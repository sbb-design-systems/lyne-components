import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import './mini-calendar-month.component.ts';
import '../mini-calendar-day.ts';
import '../mini-calendar.ts';

describe('sbb-mini-calendar-month', () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const orientation of ['horizontal', 'vertical']) {
      it(
        `orientation=${orientation} month=January`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-mini-calendar orientation=${orientation}>
              <sbb-mini-calendar-month date="2025-01">
                ${repeat(
                  new Array(31),
                  (_, index) => html`
                    <sbb-mini-calendar-day
                      date=${`2025-01-${String(index + 1).padStart(2, '0')}`}
                    ></sbb-mini-calendar-day>
                  `,
                )}
              </sbb-mini-calendar-month>
            </sbb-mini-calendar>
          `);
        }),
      );

      it(
        `orientation=${orientation} month=June`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-mini-calendar orientation=${orientation}>
              <sbb-mini-calendar-month date="2025-06">
                ${repeat(
                  new Array(30),
                  (_, index) => html`
                    <sbb-mini-calendar-day
                      date=${`2025-06-${String(index + 1).padStart(2, '0')}`}
                    ></sbb-mini-calendar-day>
                  `,
                )}
              </sbb-mini-calendar-month>
            </sbb-mini-calendar>
          `);
        }),
      );
    }

    it(
      'darkMode=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-mini-calendar>
              <sbb-mini-calendar-month date="2025-01">
                ${repeat(
                  new Array(31),
                  (_, index) => html`
                    <sbb-mini-calendar-day
                      date=${`2025-01-${String(index + 1).padStart(2, '0')}`}
                    ></sbb-mini-calendar-day>
                  `,
                )}
              </sbb-mini-calendar-month>
            </sbb-mini-calendar>
          `,
          { darkMode: true },
        );
      }),
    );
  });
});
