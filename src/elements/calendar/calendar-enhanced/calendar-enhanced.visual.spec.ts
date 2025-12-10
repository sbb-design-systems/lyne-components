import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.ts';

import './calendar-enhanced.component.ts';

describe('sbb-calendar-enhanced', () => {
  describeViewports(() => {
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-calendar-enhanced></sbb-calendar-enhanced>`);
        }),
      );
    }
  });
});
