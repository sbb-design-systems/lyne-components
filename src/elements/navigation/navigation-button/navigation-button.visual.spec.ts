import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './navigation-button.js';

describe(`sbb-navigation-button`, () => {
  const sizeCases = ['s', 'm', 'l'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const size of sizeCases) {
      for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
        it(
          `size=${size} ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html` <sbb-navigation-button size=${size}>Label</sbb-navigation-button> `,
              { backgroundColor: 'var(--sbb-color-midnight)', focusOutlineDark: true },
            );
          }),
        );
      }
    }
  });
});
