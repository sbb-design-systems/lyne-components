import { html, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { defaultDateAdapter } from '../../core/datetime.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './mini-calendar.component.js';
import '../mini-calendar-month.js';
import '../mini-calendar-day.js';

describe('sbb-mini-calendar', () => {
  const createDays = (year: number, month: number): TemplateResult => {
    const numDays = defaultDateAdapter.getNumDaysInMonth(new Date(year, month));
    return html`
      ${repeat(new Array(numDays), (_, index) => {
        const date = new Date(year, month, index + 1);
        return html`
          <sbb-mini-calendar-day
            date=${defaultDateAdapter.toIso8601(date)}
            marker=${defaultDateAdapter.getDayOfWeek(date) === 0 ||
            defaultDateAdapter.getDayOfWeek(date) === 6
              ? 'circle'
              : ''}
          ></sbb-mini-calendar-day>
        `;
      })}
    `;
  };
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const orientation of ['horizontal', 'vertical']) {
      it(
        `orientation=${orientation} start=January`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-mini-calendar orientation=${orientation}>
              ${repeat(new Array(13), (_, index) => {
                const realYear = index > 11 ? 2026 : 2025;
                const month = index % 12;
                const date = `${realYear}-${String(month + 1).padStart(2, '0')}`;
                return html`
                  <sbb-mini-calendar-month date=${date}>
                    ${createDays(realYear, month)}
                  </sbb-mini-calendar-month>
                `;
              })}
            </sbb-mini-calendar>
          `);
        }),
      );

      it(
        `orientation=${orientation} start=June`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-mini-calendar orientation=${orientation}>
              ${repeat(new Array(13), (_, index) => {
                const realYear = index > 6 ? 2026 : 2025;
                const month = (index + 5) % 12;
                const date = `${realYear}-${String(month + 1).padStart(2, '0')}`;
                return html`
                  <sbb-mini-calendar-month date=${date}>
                    ${createDays(realYear, month)}
                  </sbb-mini-calendar-month>
                `;
              })}
            </sbb-mini-calendar>
          `);
        }),
      );
    }
  });
});
