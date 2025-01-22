import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './chip.js';

describe('sbb-chip', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-chip value="Value"></sbb-chip>`);
        }),
      );
    }
  });
});
