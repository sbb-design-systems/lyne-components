import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../core/testing/private.js';

import './__noPrefixName__.js';

describe('__name__', () => {
  /**
   * Add the `viewports` param to test only specific viewport;
   * add the `viewportHeight` param to set a fixed height for the browser.
   */
  describeViewports(() => {
    // Add visual tests
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<__name__></__name__>`);
        }),
      );
    }
  });
});
