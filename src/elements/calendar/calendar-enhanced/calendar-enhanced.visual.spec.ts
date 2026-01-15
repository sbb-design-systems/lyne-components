import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { type SinonStub, stub } from 'sinon';

import { defaultDateAdapter } from '../../core/datetime.ts';
import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';
import './calendar-enhanced.component.ts';

import '../calendar-day/calendar-day.component.ts';

const createDay = (slotName: string, content = false): TemplateResult => {
  return html` <sbb-calendar-day slot=${slotName}>
    ${content
      ? html` <span
          class="sbb-text-xxs"
          style="display: flex; flex-direction: column; justify-content: center; color: var(--sbb-color-metal);"
          >99.-</span
        >`
      : nothing}
  </sbb-calendar-day>`;
};

describe('sbb-calendar-enhanced', () => {
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

  for (const orientation of ['horizontal', 'vertical']) {
    describeViewports({ viewports: ['zero', 'large', 'ultra'] }, () => {
      describe(`orientation=${orientation}`, () => {
        for (const min of minArray) {
          for (const max of maxArray) {
            for (const content of [false, true]) {
              it(
                `min=${min.label} max=${max.label} content=${content}`,
                visualDiffDefault.with(async (setup) => {
                  await setup.withFixture(html`
                    <sbb-calendar-enhanced
                      orientation=${orientation}
                      .selected=${new Date(2023, 0, 20)}
                      .min=${min.value ? defaultDateAdapter.toIso8601(min.value) : nothing}
                      .max=${max.value ? defaultDateAdapter.toIso8601(max.value) : nothing}
                    >
                      ${repeat(new Array(31), (_, index) => {
                        return createDay(
                          defaultDateAdapter.toIso8601(new Date(`2023-01-${index + 1}`)),
                          content,
                        );
                      })}
                    </sbb-calendar-enhanced>
                  `);
                }),
              );
            }
          }
        }
      });

      for (const wide of [false, true]) {
        describe(`orientation=${orientation} wide=${wide}`, () => {
          for (const content of [true, false]) {
            it(
              `width=dynamic content=${content}`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar-enhanced
                    style="width: 900px"
                    orientation=${orientation}
                    ?wide=${wide}
                    .selected=${new Date(2023, 0, 20)}
                  >
                    ${repeat(new Array(31), (_, index) => {
                      return createDay(
                        defaultDateAdapter.toIso8601(new Date(`2023-01-${index + 1}`)),
                        content,
                      );
                    })}
                    ${wide
                      ? repeat(new Array(28), (_, index) => {
                          return createDay(
                            defaultDateAdapter.toIso8601(new Date(`2023-02-${index + 1}`)),
                            content,
                          );
                        })
                      : nothing}
                  </sbb-calendar-enhanced>
                `);
              }),
            );

            it(
              `width=full content=${content}`,
              visualDiffFocus.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar-enhanced
                    style="width: 100%"
                    orientation=${orientation}
                    ?wide=${wide}
                    .selected=${new Date(2023, 0, 8)}
                  >
                    ${repeat(new Array(31), (_, index) => {
                      return createDay(
                        defaultDateAdapter.toIso8601(new Date(`2023-01-${index + 1}`)),
                        content,
                      );
                    })}
                    ${wide
                      ? repeat(new Array(28), (_, index) => {
                          return createDay(
                            defaultDateAdapter.toIso8601(new Date(`2023-02-${index + 1}`)),
                            content,
                          );
                        })
                      : nothing}
                  </sbb-calendar-enhanced>
                `);

                // Focus an element on the very right side. Should not be cut!
                setup
                  .withStateElement(
                    setup.stateElement.querySelector('sbb-calendar-day[slot="2023-01-08"]')!,
                  )
                  .withPostSetupAction(() => {
                    setup.stateElement.tabIndex = 0;
                  });
              }),
            );
          }

          for (const multiple of [false, true]) {
            const selected = multiple
              ? [new Date(2023, 0, 20), new Date(2023, 0, 21)]
              : new Date(2023, 0, 20);
            it(
              `multiple=${multiple} weekNumbers=true`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar-enhanced
                    orientation=${orientation}
                    ?multiple=${multiple}
                    ?wide=${wide}
                    .selected=${selected}
                    week-numbers
                  >
                    ${repeat(new Array(31), (_, index) => {
                      return createDay(
                        defaultDateAdapter.toIso8601(new Date(`2023-01-${index + 1}`)),
                      );
                    })}
                    ${wide
                      ? repeat(new Array(28), (_, index) => {
                          return createDay(
                            defaultDateAdapter.toIso8601(new Date(`2023-02-${index + 1}`)),
                          );
                        })
                      : nothing}
                  </sbb-calendar-enhanced>
                `);
              }),
            );
          }

          for (const fn of filterFunctions) {
            it(
              `fn=${fn.name}`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar-enhanced
                    orientation=${orientation}
                    ?wide=${wide}
                    .min=${defaultDateAdapter.toIso8601(new Date(2023, 0, 13))}
                    .max=${defaultDateAdapter.toIso8601(new Date(2023, 1, 17))}
                    .selected=${new Date(2023, 0, 20)}
                    .dateFilter=${fn.dateFilter}
                  >
                    ${repeat(new Array(31), (_, index) => {
                      return createDay(
                        defaultDateAdapter.toIso8601(new Date(`2023-01-${index + 1}`)),
                      );
                    })}
                    ${wide
                      ? repeat(new Array(28), (_, index) => {
                          return createDay(
                            defaultDateAdapter.toIso8601(new Date(`2023-02-${index + 1}`)),
                          );
                        })
                      : nothing}
                  </sbb-calendar-enhanced>
                `);
              }),
            );
          }

          for (const view of ['year', 'month']) {
            it(
              `view=${view}`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(html`
                  <sbb-calendar-enhanced
                    orientation=${orientation}
                    view=${view}
                    ?wide=${wide}
                    .selected=${new Date(2023, 0, 20)}
                  >
                    ${repeat(new Array(31), (_, index) => {
                      return createDay(
                        defaultDateAdapter.toIso8601(new Date(`2023-01-${index + 1}`)),
                      );
                    })}
                    ${wide
                      ? repeat(new Array(28), (_, index) => {
                          return createDay(
                            defaultDateAdapter.toIso8601(new Date(`2023-02-${index + 1}`)),
                          );
                        })
                      : nothing}
                  </sbb-calendar-enhanced>
                `);
              }),
            );
          }
        });
      }
    });
  }
});
