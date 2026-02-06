import { html, nothing } from 'lit';
import { type SinonStub, stub } from 'sinon';

import { defaultDateAdapter } from '../core/datetime.ts';
import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../core/testing/private.ts';

import type { SbbCalendarElement } from './calendar.component.ts';

import './calendar.component.ts';

describe('sbb-calendar', () => {
  let todayStub: SinonStub;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').returns(new Date(2023, 0, 12, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  const minArray = [
    { label: 'unset', value: null },
    { label: '07012023', value: new Date(2023, 0, 7) },
  ];
  const maxArray = [
    { label: 'unset', value: null },
    { label: '24012023', value: new Date(2023, 0, 24) },
  ];

  const filterFunctions = [
    {
      name: 'working_days',
      dateFilter: (d: Date): boolean => d.getDay() !== 6 && d.getDay() !== 0,
    },
    { name: 'odd_days', dateFilter: (d: Date): boolean => d.getDate() % 2 === 1 },
  ];

  const dayButtonCases = {
    selected: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const changeMonthButtonCases = {
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  for (const orientation of ['horizontal', 'vertical']) {
    describeViewports({ viewports: ['zero', 'large', 'ultra'] }, () => {
      describe(`orientation=${orientation}`, () => {
        for (const min of minArray) {
          for (const max of maxArray) {
            it(
              `min=${min.label} max=${max.label}`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar
                    orientation=${orientation}
                    .selected=${new Date(2023, 0, 20)}
                    .min=${min.value ? defaultDateAdapter.toIso8601(min.value) : nothing}
                    .max=${max.value ? defaultDateAdapter.toIso8601(max.value) : nothing}
                  ></sbb-calendar>
                `);
              }),
            );
          }
        }
      });

      for (const wide of [false, true]) {
        describe(`orientation=${orientation} wide=${wide}`, () => {
          it(
            'dynamic width',
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-calendar
                  style="width: 900px"
                  orientation=${orientation}
                  ?wide=${wide}
                  .selected=${new Date(2023, 0, 20)}
                ></sbb-calendar>
              `);
            }),
          );

          it(
            'full width',
            visualDiffFocus.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-calendar
                  style="width: 100%"
                  orientation=${orientation}
                  ?wide=${wide}
                  .selected=${new Date(2023, 0, 20)}
                ></sbb-calendar>
              `);

              // Focus an element on the very right side. Should not be cut!
              setup
                .withStateElement(
                  (setup.stateElement as SbbCalendarElement).shadowRoot!.querySelector(
                    'button[value="2023-01-08"]',
                  )!,
                )
                .withPostSetupAction(() => {
                  // Shortcut to let the stateElement be focused
                  setup.stateElement.tabIndex = 0;
                });
            }),
          );

          for (const multiple of [false, true]) {
            const selected = multiple
              ? [new Date(2023, 0, 20), new Date(2023, 0, 21)]
              : new Date(2023, 0, 20);
            it(
              `multiple=${multiple} weekNumbers=true`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar
                    orientation=${orientation}
                    ?multiple=${multiple}
                    ?wide=${wide}
                    .selected=${selected}
                    week-numbers
                  ></sbb-calendar>
                `);
              }),
            );
          }

          for (const fn of filterFunctions) {
            it(
              `fn=${fn.name}`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar
                    orientation=${orientation}
                    ?wide=${wide}
                    .min=${defaultDateAdapter.toIso8601(new Date(2023, 0, 13))}
                    .max=${defaultDateAdapter.toIso8601(new Date(2023, 1, 17))}
                    .selected=${new Date(2023, 0, 20)}
                    .dateFilter=${fn.dateFilter}
                  ></sbb-calendar>
                `);
              }),
            );
          }

          for (const view of ['year', 'month']) {
            it(
              `view=${view}`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar
                    orientation=${orientation}
                    view=${view}
                    ?wide=${wide}
                    .selected=${new Date(2023, 0, 20)}
                  ></sbb-calendar>
                `);
              }),
            );
          }
        });
      }
    });
  }

  describeViewports({ viewports: ['zero'] }, () => {
    describe('day button', () => {
      describeEach(dayButtonCases, ({ selected, emulateMedia: { forcedColors, darkMode } }) => {
        let element: SbbCalendarElement, root: HTMLElement;

        beforeEach(async function () {
          const selectedDate = new Date(2023, 0, 20);
          root = await visualRegressionFixture(
            html`<sbb-calendar
              .selected=${selectedDate}
              .max=${defaultDateAdapter.toIso8601(new Date(2023, 0, 22))}
            ></sbb-calendar>`,
            {
              darkMode,
              forcedColors,
            },
          );
          element = root.querySelector('sbb-calendar')!;
        });

        for (const state of selected
          ? [visualDiffFocus]
          : [visualDiffDefault, visualDiffHover, visualDiffActive]) {
          it(
            state.name,
            state.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(
                selected
                  ? element.shadowRoot!.querySelector('button.sbb-calendar__selected')!
                  : element.shadowRoot!.querySelector('button.sbb-calendar__day')!,
              );
            }),
          );
        }
      });
    });

    describe('change month button', () => {
      describeEach(changeMonthButtonCases, ({ emulateMedia: { forcedColors, darkMode } }) => {
        let element: SbbCalendarElement, root: HTMLElement;

        beforeEach(async function () {
          root = await visualRegressionFixture(html`<sbb-calendar></sbb-calendar>`, {
            darkMode,
            forcedColors,
          });
          element = root.querySelector('sbb-calendar')!;
        });

        for (const state of visualDiffStandardStates) {
          it(
            state.name,
            state.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(
                element.shadowRoot!.querySelector('button.sbb-calendar__controls-change-date')!,
              );
            }),
          );
        }
      });
    });
  });
});
