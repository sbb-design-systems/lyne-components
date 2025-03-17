import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './timetable-occupancy.component.js';

describe(`sbb-timetable-occupancy`, () => {
  const cases = {
    firstClassOccupancy: ['high', 'low', undefined],
    secondClassOccupancy: ['medium', 'none', undefined],
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
              first-class-occupancy=${firstClassOccupancy || nothing}
              second-class-occupancy=${secondClassOccupancy || nothing}
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
