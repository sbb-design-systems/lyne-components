import { html } from 'lit';
import { type SinonStub, stub } from 'sinon';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '../../core/testing/private.ts';
import { defaultDateAdapter } from '../../core.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';

import type { SbbCalendarMonthElement } from './calendar-month.component.ts';

import '../../calendar.ts';

describe('sbb-calendar-month', () => {
  let todayStub: SinonStub;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').callsFake(() => new Date(2025, 6, 1, 0, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  describeViewports(() => {
    let root: SbbCalendarElement;
    const selectedDate = [new Date(2025, 1, 20), new Date(2025, 4, 20), new Date(2025, 5, 20)];

    beforeEach(async () => {
      root = await visualRegressionFixture(html`
        <sbb-calendar
          view="month"
          .min=${defaultDateAdapter.toIso8601(new Date(2025, 2, 1))}
          .selected=${defaultDateAdapter.toIso8601(new Date(2025, 11, 1))}
          .dateFilter=${(d: Date): boolean => d.getMonth() !== 3 && d.getFullYear() !== 8}
        >
        </sbb-calendar>
      `);
    });

    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        setup.withSnapshotElement(root);
      }),
    );

    it(
      `multiple`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-calendar view="month" multiple .selected=${selectedDate}></sbb-calendar>
        `);
      }),
    );

    for (const state of [visualDiffHover, visualDiffActive]) {
      it(
        `today state=${state.name}`,
        state.with(async (setup) => {
          setup.withSnapshotElement(root);
          const todayYear = root
            .querySelector('sbb-calendar')!
            .shadowRoot!.querySelector<SbbCalendarMonthElement>(
              'sbb-calendar-month:state(current)',
            )!;
          setup.withStateElement(todayYear);
        }),
      );
    }

    for (const state of [visualDiffHover, visualDiffActive, visualDiffFocus]) {
      it(
        `selected state=${state.name}`,
        state.with(async (setup) => {
          setup.withSnapshotElement(root);
          const selYear = root
            .querySelector('sbb-calendar')!
            .shadowRoot!.querySelector<SbbCalendarMonthElement>(
              'sbb-calendar-month:state(selected)',
            )!;
          setup.withStateElement(selYear);
        }),
      );
    }
  });
});
