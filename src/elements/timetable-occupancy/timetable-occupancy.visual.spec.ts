import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './timetable-occupancy.component.ts';

describe(`sbb-timetable-occupancy`, () => {
  const cases = {
    firstClassOccupancy: ['high', 'low', undefined],
    secondClassOccupancy: ['medium', 'none', undefined],
    negative: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(
      cases,
      ({
        firstClassOccupancy,
        secondClassOccupancy,
        negative,
        emulateMedia: { forcedColors, darkMode },
      }) => {
        it(
          '',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`
                <sbb-timetable-occupancy
                  ?negative=${negative}
                  first-class-occupancy=${firstClassOccupancy || nothing}
                  second-class-occupancy=${secondClassOccupancy || nothing}
                ></sbb-timetable-occupancy>
              `,
              {
                backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                forcedColors,
                darkMode,
              },
            );
          }),
        );
      },
    );
  });
});
