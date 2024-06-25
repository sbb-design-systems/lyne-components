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
            <sbb-header-link icon-name="hamburger-menu-small">Menu</sbb-header-link>
          `);
        }),
      );

      it(
        `multiple=true ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <div style="display: flex; gap: 2rem;">
              <sbb-header-link icon-name="hamburger-menu-small">Menu</sbb-header-link>
              <sbb-header-link icon-name="hamburger-menu-small">Menu</sbb-header-link>
              <sbb-header-link icon-name="hamburger-menu-small">Menu</sbb-header-link>
            </div>
          `);
        }),
      );
    }
  });
});
