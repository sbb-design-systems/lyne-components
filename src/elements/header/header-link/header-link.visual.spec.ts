import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './header-link.js';

describe(`sbb-header-link`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of visualDiffStandardStates) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-header-link icon-name="hamburger-menu-small" href="#">Menu</sbb-header-link>
          `);
        }),
      );
    }
  });
});
