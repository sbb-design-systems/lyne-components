import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './link.js';

describe(`sbb-link`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [true, false]) {
      for (const state of visualDiffStandardStates) {
        it(
          `negative=${negative} ${state.name}`,
          state.with((setup) => {
            setup.withFixture(
              html` <p class="sbb-text-m">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                <sbb-link href="#" ?negative=${negative}>Show more.</sbb-link>
              </p>`,
              {
                backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
                color: negative ? 'var(--sbb-color-aluminium)' : undefined,
              },
            );
          }),
        );
      }
    }
  });
});
