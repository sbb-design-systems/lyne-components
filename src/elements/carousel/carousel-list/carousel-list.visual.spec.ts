import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './carousel-list.component.js';

describe('sbb-carousel-list', () => {
  describeViewports(() => {
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-carousel-list></sbb-carousel-list>`);
        }),
      );
    }
  });
});
