import { html, nothing } from 'lit';

import { defaultDateAdapter } from '../core/datetime.js';
import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './calendar.js';

describe('sbb-calendar', () => {
  let root: HTMLElement;

  const cases = {
    min: [undefined, new Date(2023, 0, 9)],
    max: [undefined, new Date(2023, 0, 29)],
  };

  const filterFunctions = [
    {
      name: 'working days',
      dateFilter: (d: Date): boolean => d.getDay() !== 6 && d.getDay() !== 0,
    },
    { name: 'odd days', dateFilter: (d: Date): boolean => d.getDate() % 2 === 1 },
  ];

  describeViewports({ viewports: ['zero', 'medium', 'wide'] }, () => {
    describeEach(cases, ({ min, max }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-calendar
            .selected=${new Date(2023, 0, 20)}
            .now=${new Date(2023, 0, 12, 0, 0, 0)}
            .min=${min ? defaultDateAdapter.toIso8601(min) : nothing}
            .max=${max ? defaultDateAdapter.toIso8601(max) : nothing}
          ></sbb-calendar>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describe('wide with filter function', () => {
      for (const fn of filterFunctions) {
        it(
          fn.name,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-calendar
                .wide=${true}
                .min=${defaultDateAdapter.toIso8601(new Date(2023, 0, 13))}
                .max=${defaultDateAdapter.toIso8601(new Date(2023, 1, 17))}
                .selected=${new Date(2023, 0, 20)}
                .dateFilter=${fn.dateFilter}
                .now=${new Date(2023, 0, 12, 0, 0, 0)}
              ></sbb-calendar>
            `);
          }),
        );
      }
    });

    for (const wide of [false, true]) {
      describe(`wide=${wide}`, () => {
        it(
          'dynamic width',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-calendar
                style="width: 900px"
                ?wide=${wide}
                .selected=${new Date(2023, 0, 20)}
                .now=${new Date(2023, 0, 12, 0, 0, 0)}
              ></sbb-calendar>
            `);
          }),
        );
      });
    }
  });
});
