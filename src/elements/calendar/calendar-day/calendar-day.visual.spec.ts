import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { type SinonStub, stub } from 'sinon';

import { defaultDateAdapter } from '../../core/datetime.ts';
import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './calendar-day.component.ts';
import '../calendar-enhanced/calendar-enhanced.component.ts';

describe('sbb-calendar-day', () => {
  let todayStub: SinonStub;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').returns(new Date(2025, 0, 1, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  describeViewports(() => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-calendar-enhanced
            .min=${defaultDateAdapter.toIso8601(new Date(2025, 0, 9))}
            .selected=${defaultDateAdapter.toIso8601(new Date(2025, 0, 15))}
            .dateFilter=${(d: Date): boolean => d.getDate() % 2 === 1}
          >
            ${repeat(new Array(31), (_, index) => {
              const slotName = defaultDateAdapter.toIso8601(new Date(`2025-01-${index + 1}`));
              return html` <sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
            })}
          </sbb-calendar-enhanced>`,
        );
      }),
    );

    for (const content of [false, true]) {
      for (const state of [visualDiffHover, visualDiffActive, visualDiffFocus]) {
        it(
          `today state=${state.name} content=${content}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html` <sbb-calendar-enhanced>
                ${repeat(new Array(31), (_, index) => {
                  const slotName = defaultDateAdapter.toIso8601(new Date(`2025-01-${index + 1}`));
                  return html` <sbb-calendar-day slot=${slotName}>
                    ${content
                      ? html` <span
                          class="sbb-text-xxs"
                          style="display: flex; flex-direction: column; justify-content: center; color: var(--sbb-color-metal);"
                          >99.-</span
                        >`
                      : nothing}
                  </sbb-calendar-day>`;
                })}
              </sbb-calendar-enhanced>`,
            );
            setup.withStateElement(
              setup.snapshotElement.querySelector('sbb-calendar-day[slot="2025-01-01"]')!,
            );
          }),
        );

        it(
          `selected state=${state.name} content=${content}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html` <sbb-calendar-enhanced .selected=${new Date('2025-01-15')}>
                ${repeat(new Array(31), (_, index) => {
                  const slotName = defaultDateAdapter.toIso8601(new Date(`2025-01-${index + 1}`));
                  return html` <sbb-calendar-day slot=${slotName}>
                    ${content
                      ? html` <span
                          class="sbb-text-xxs"
                          style="display: flex; flex-direction: column; justify-content: center; color: var(--sbb-color-metal);"
                          >99.-</span
                        >`
                      : nothing}
                  </sbb-calendar-day>`;
                })}
              </sbb-calendar-enhanced>`,
            );
            setup.withStateElement(
              setup.snapshotElement.querySelector('sbb-calendar-day[slot="2025-01-15"]')!,
            );
          }),
        );
      }
    }
  });
});
