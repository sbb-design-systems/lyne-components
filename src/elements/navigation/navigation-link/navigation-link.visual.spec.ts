import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './navigation-link.component.js';

describe(`sbb-navigation-link`, () => {
  const sizeCases = ['s', 'm', 'l'];

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const colors of [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`darkMode=${colors.darkMode} forcedColors=${colors.forcedColors}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-navigation-link href="#">Label</sbb-navigation-link>`,
                {
                  backgroundColor: 'var(--sbb-background-color-1-negative)',
                  focusOutlineDark: true,
                  darkMode: colors.darkMode,
                  forcedColors: colors.forcedColors,
                },
              );
            }),
          );
        }
      });
    }

    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-navigation-link href="#" size=${size}>Label</sbb-navigation-link>`,
            { backgroundColor: 'var(--sbb-background-color-1-negative)', focusOutlineDark: true },
          );
        }),
      );
    }
  });
});
