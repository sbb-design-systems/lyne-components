import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { type SinonStub, stub } from 'sinon';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualDiffStandardStates,
} from '../../core/testing/private.ts';
import { defaultDateAdapter } from '../../core.ts';

import '../../calendar.ts';

const calendarWithDays = (value?: Date): ReturnType<typeof html> => html`
  <sbb-calendar .value=${value}>
    ${repeat(new Array(31), (_, index) => {
      const slotName = defaultDateAdapter.toIso8601(new Date(`2025-01-${index + 1}`));
      return html`<sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
    })}
  </sbb-calendar>
`;

const calendarWithDaysAndContent = (value?: Date): ReturnType<typeof html> => html`
  <sbb-calendar .value=${value}>
    ${repeat(new Array(31), (_, index) => {
      const slotName = defaultDateAdapter.toIso8601(new Date(`2025-01-${index + 1}`));
      return html`<sbb-calendar-day slot=${slotName}>
        <span
          class="sbb-text-xxs"
          style="display: flex; flex-direction: column; justify-content: center; color: light-dark(var(--sbb-color-metal), var(--sbb-color-smoke));"
          >99.-</span
        >
      </sbb-calendar-day>`;
    })}
  </sbb-calendar>
`;

describe('sbb-calendar-day', () => {
  let todayStub: SinonStub;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').returns(new Date(2025, 0, 1, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-calendar
            .min=${defaultDateAdapter.toIso8601(new Date(2025, 0, 9))}
            .value=${defaultDateAdapter.toIso8601(new Date(2025, 0, 15))}
            .dateFilter=${(d: Date): boolean => d.getDate() % 2 === 1}
          >
            ${repeat(new Array(31), (_, index) => {
              const slotName = defaultDateAdapter.toIso8601(new Date(`2025-01-${index + 1}`));
              return html` <sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
            })}
          </sbb-calendar>`,
        );
      }),
    );

    for (const content of [false, true]) {
      describe(`content=${content}`, () => {
        for (const state of [visualDiffHover, visualDiffActive, visualDiffFocus]) {
          describe(`state=${state.name}`, () => {
            it(
              `today`,
              state.with(async (setup) => {
                await setup.withFixture(
                  content ? calendarWithDaysAndContent() : calendarWithDays(),
                );
                setup.withStateElement(
                  setup.snapshotElement.querySelector('sbb-calendar-day[slot="2025-01-01"]')!,
                );
              }),
            );

            it(
              `selected`,
              state.with(async (setup) => {
                await setup.withFixture(
                  content
                    ? calendarWithDaysAndContent(new Date('2025-01-15'))
                    : calendarWithDays(new Date('2025-01-15')),
                );
                setup.withStateElement(
                  setup.snapshotElement.querySelector('sbb-calendar-day[slot="2025-01-15"]')!,
                );
              }),
            );
          });
        }
      });
    }
  });

  describeViewports({ viewports: ['zero'] }, () => {
    for (const { forcedColors, darkMode } of [
      { forcedColors: false, darkMode: true },
      { forcedColors: true, darkMode: false },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        for (const state of visualDiffStandardStates) {
          describe(`state=${state.name}`, () => {
            it(
              `today`,
              state.with(async (setup) => {
                await setup.withFixture(calendarWithDays(), {
                  darkMode,
                  forcedColors,
                });
                setup.withStateElement(
                  setup.snapshotElement.querySelector('sbb-calendar-day[slot="2025-01-01"]')!,
                );
              }),
            );

            it(
              `selected`,
              state.with(async (setup) => {
                await setup.withFixture(calendarWithDays(new Date('2025-01-15')), {
                  darkMode,
                  forcedColors,
                });
                setup.withStateElement(
                  setup.snapshotElement.querySelector('sbb-calendar-day[slot="2025-01-15"]')!,
                );
              }),
            );
          });
        }
      });
    }
  });
});
