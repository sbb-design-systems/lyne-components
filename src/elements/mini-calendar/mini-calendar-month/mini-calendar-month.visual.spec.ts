import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './mini-calendar-month.component.js';
import '../mini-calendar-day.js';

describe('sbb-mini-calendar-month', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const orientation of ['horizontal', 'vertical']) {
      it(
        `orientation=${orientation} month=January`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-mini-calendar-month date="2025-01" data-orientation=${orientation}>
              ${repeat(
                new Array(31),
                (_, index) => html`
                  <sbb-mini-calendar-day
                    date=${`2025-01-${String(index + 1).padStart(2, '0')}`}
                  ></sbb-mini-calendar-day>
                `,
              )}
            </sbb-mini-calendar-month>
          `);
        }),
      );

      it(
        `orientation=${orientation} month=June`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-mini-calendar-month date="2025-06" data-orientation=${orientation}>
              ${repeat(
                new Array(30),
                (_, index) => html`
                  <sbb-mini-calendar-day
                    date=${`2025-06-${String(index + 1).padStart(2, '0')}`}
                  ></sbb-mini-calendar-day>
                `,
              )}
            </sbb-mini-calendar-month>
          `);
        }),
      );
    }
  });
});
