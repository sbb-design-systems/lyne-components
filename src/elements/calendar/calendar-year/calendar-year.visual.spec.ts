import { html } from 'lit';
import { type SinonStub, stub } from 'sinon';

import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.ts';
import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '../../core/testing/private.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';

import type { SbbCalendarYearElement } from './calendar-year.component.ts';

import '../calendar/calendar.component.ts';
import './calendar-year.component.ts';

describe('sbb-calendar-year', () => {
  let todayStub: SinonStub;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').callsFake(() => new Date(2025, 0, 1, 0, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  describeViewports(() => {
    let root: SbbCalendarElement;

    beforeEach(async () => {
      root = await visualRegressionFixture(html`
        <sbb-calendar
          view="year"
          .min=${defaultDateAdapter.toIso8601(new Date(2023, 0, 9))}
          .selected=${defaultDateAdapter.toIso8601(new Date(2027, 0, 15))}
          .dateFilter=${(d: Date): boolean => d.getFullYear() !== 2030 && d.getFullYear() !== 2031}
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

    for (const state of [visualDiffHover, visualDiffActive]) {
      it(
        `today state=${state.name}`,
        state.with(async (setup) => {
          setup.withSnapshotElement(root);
          const todayYear = root
            .querySelector('sbb-calendar')!
            .shadowRoot!.querySelector<SbbCalendarYearElement>('sbb-calendar-year:state(current)')!;
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
            .shadowRoot!.querySelector<SbbCalendarYearElement>(
              'sbb-calendar-year:state(selected)',
            )!;
          setup.withStateElement(selYear);
        }),
      );
    }
  });
});
