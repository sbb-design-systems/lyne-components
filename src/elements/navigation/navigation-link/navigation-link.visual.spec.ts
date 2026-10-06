import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.ts';

import '../../navigation.ts';

describe(`sbb-navigation-link`, () => {
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
              await setup.withFixture(
                html`<sbb-navigation-link href="#">Label</sbb-navigation-link>`,
                {
                  backgroundColor: 'var(--sbb-background-color-1-negative)',
                  focusOutlineDark: true,
                  darkMode,
                  forcedColors,
                },
              );
            }),
          );
        }
      });
    }

    it(
      `disabled=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-navigation-link href="#" disabled>Label</sbb-navigation-link>`,
          { backgroundColor: 'var(--sbb-background-color-1-negative)', focusOutlineDark: true },
        );
      }),
    );
  });
});
