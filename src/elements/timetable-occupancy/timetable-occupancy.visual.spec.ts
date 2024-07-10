import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './timetable-occupancy.js';

describe(`sbb-timetable-occupancy`, () => {
  const cases = {
    firstClassOccupancy: ['high', 'low'],
    secondClassOccupancy: ['medium', 'none'],
    negative: [false, true],
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    let root: HTMLElement;

    describeEach(cases, ({ firstClassOccupancy, secondClassOccupancy, negative, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-timetable-occupancy
              ?negative=${negative}
              first-class-occupancy=${firstClassOccupancy}
              second-class-occupancy=${secondClassOccupancy}
            ></sbb-timetable-occupancy>
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
