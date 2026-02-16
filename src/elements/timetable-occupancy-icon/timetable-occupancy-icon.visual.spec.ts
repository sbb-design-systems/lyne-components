import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './timetable-occupancy-icon.component.ts';

describe(`sbb-timetable-occupancy-icon`, () => {
  const cases = {
    occupancy: ['high', 'medium', 'low', 'none'],
    negative: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ occupancy, negative, emulateMedia: { forcedColors, darkMode } }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-timetable-occupancy-icon occupancy=${occupancy} ?negative=${negative}>
                Status text.
              </sbb-timetable-occupancy-icon>
            `,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              forcedColors,
              darkMode,
            },
          );
        }),
      );
    });
  });
});
