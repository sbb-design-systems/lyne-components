import { html } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.js';

import './link-static.component.js';

describe(`sbb-link-static`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [true, false]) {
      for (const state of [visualDiffDefault, visualDiffActive, visualDiffHover]) {
        it(
          `negative=${negative} ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html` <p class="sbb-text-m">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                <sbb-link-static ?negative="${negative}">Show more.</sbb-link-static>
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
