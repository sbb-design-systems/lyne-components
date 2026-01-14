import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.ts';

import './calendar-day.component.ts';

describe('sbb-calendar-day', () => {
  describeViewports(() => {
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-calendar-day slot="2025-01-01"></sbb-calendar-day>`);
        }),
      );
    }
  });
});
