import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './timetable-occupancy-icon.js';

describe(`sbb-timetable-occupancy-icon`, () => {
  const cases = {
    occupancy: ['high', 'medium', 'low', 'none'],
    negative: [false, true],
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    let root: HTMLElement;

    describeEach(cases, ({ occupancy, negative, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-timetable-occupancy-icon occupancy=${occupancy} ?negative=${negative}>
              Status text.
            </sbb-timetable-occupancy-icon>
          `,
          {
            backgroundColor: forcedColors || negative ? 'var(--sbb-color-black)' : undefined,
            forcedColors,
          },
        );
      });

      it(
        '',
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
