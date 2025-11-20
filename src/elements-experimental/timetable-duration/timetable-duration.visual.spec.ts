import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import sampleData from './timetable-duration.sample-data.private.ts';
import './timetable-duration.component.ts';

describe(`sbb-timetable-duration`, () => {
  const cases = [
    { name: 'minutes', config: sampleData[0] },
    { name: 'hours and minutes', config: sampleData[2] },
  ];

  describeViewports({ viewports: ['zero'] }, () => {
    for (const c of cases) {
      it(
        c.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-timetable-duration .config=${JSON.stringify(c.config)}></sbb-timetable-duration>
          `);
        }),
      );
    }
  });
});
