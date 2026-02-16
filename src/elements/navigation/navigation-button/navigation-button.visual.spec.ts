import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './navigation-button.component.ts';

describe(`sbb-navigation-button`, () => {
  const sizeCases = ['s', 'm', 'l'];

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const { darkMode, forcedColors } of [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`darkMode=${darkMode} forcedColors=${forcedColors}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(html`<sbb-navigation-button>Label</sbb-navigation-button>`, {
                backgroundColor: 'var(--sbb-background-color-1-negative)',
                focusOutlineDark: true,
                darkMode,
                forcedColors,
              });
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
            html`<sbb-navigation-button size=${size}>Label</sbb-navigation-button>`,
            { backgroundColor: 'var(--sbb-background-color-1-negative)', focusOutlineDark: true },
          );
        }),
      );
    }
  });
});
