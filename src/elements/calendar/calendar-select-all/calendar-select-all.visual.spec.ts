import { html } from 'lit';
import { type SinonStub, stub } from 'sinon';

import {
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.ts';
import { defaultDateAdapter } from '../../core.ts';
import type { SbbCalendarElement } from '../calendar/calendar.component.ts';

import '../../calendar.ts';

describe(`sbb-calendar-select-all`, () => {
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

    for (const state of visualDiffStandardStates) {
      it(
        `state=${state.name}`,
        state.with(async (setup) => {
          setup.withSnapshotElement(root);
          const selectAllButton = root
            .querySelector('sbb-calendar')!
            .shadowRoot!.querySelector('sbb-calendar-select-all')!;
          setup.withStateElement(selectAllButton);
        }),
      );
    }
  });
});
