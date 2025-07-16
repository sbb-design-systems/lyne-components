import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './carousel.component.js';

describe('sbb-carousel', () => {
  describeViewports(() => {
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-carousel></sbb-carousel>`);
        }),
      );
    }
  });
});
