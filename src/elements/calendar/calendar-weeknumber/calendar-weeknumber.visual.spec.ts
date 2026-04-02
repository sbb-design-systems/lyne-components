import { html } from 'lit';
import { type SinonStub, stub } from 'sinon';

import { defaultDateAdapter } from '../../core/datetime.ts';
import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '../../core/testing/private.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';

import '../../calendar.ts';

describe('sbb-calendar-weeknumber', () => {
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
      root = await visualRegressionFixture(
        html`<sbb-calendar multiple week-numbers></sbb-calendar>`,
      );
    });

    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        setup.withSnapshotElement(root);
      }),
    );

    for (const state of [visualDiffHover, visualDiffActive, visualDiffFocus]) {
      it(
        `state=${state.name}`,
        state.with(async (setup) => {
          setup.withSnapshotElement(root);
          const weekdayElement = root
            .querySelector('sbb-calendar')!
            .shadowRoot!.querySelector('sbb-calendar-weeknumber')!;
          setup.withStateElement(weekdayElement);
        }),
      );
    }
  });
});
