import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './header-button.js';

describe(`sbb-header-button`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of visualDiffStandardStates) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-header-button icon-name="hamburger-menu-small" type="button"
              >Menu</sbb-header-button
            >
          `);
        }),
      );

      it(
        `multiple=true ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <div style="display: flex; gap: 2rem;">
              <sbb-header-button icon-name="hamburger-menu-small" type="button"
                >Menu</sbb-header-button
              >
              <sbb-header-button icon-name="hamburger-menu-small" type="button"
                >Menu</sbb-header-button
              >
              <sbb-header-button icon-name="hamburger-menu-small" type="button"
                >Menu</sbb-header-button
              >
            </div>
          `);
        }),
      );
    }
  });
});
