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
            <sbb-header-button icon-name="hamburger-menu-small">Menu</sbb-header-button>
          `);
        }),
      );
    }
  });
});
