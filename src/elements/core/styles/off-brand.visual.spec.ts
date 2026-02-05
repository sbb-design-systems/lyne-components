import { html } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../testing/private.ts';

import '../../button.ts';
import '../../checkbox.ts';
import '../../container.ts';
import '../../teaser-hero.ts';
import '../../link.ts';
import '../../loading-indicator.ts';
import '../../loading-indicator-circle.ts';
import '../../radio-button.ts';
import '../../slider.ts';
import '../../toggle-check.ts';

import './off-brand-theme.scss';

describe(`sbb-off-brand`, () => {
  describeViewports({ viewports: ['small'] }, () => {
    for (const darkMode of [false, true]) {
      describe(`darkMode=${darkMode}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffActive]) {
          it(
            `button ${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-button sbb-badge="2">Off-Brand Button</sbb-button>`,
                { darkMode },
              );
            }),
          );
        }

        for (const state of [visualDiffHover, visualDiffActive]) {
          it(
            `link ${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(html`<sbb-link href="#">Off-Brand Link</sbb-link>`, {
                darkMode,
              });
            }),
          );
        }

        it(
          `panel`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-teaser-hero>Break out and explore castles and palaces.</sbb-teaser-hero>`,
              {
                darkMode,
              },
            );
          }),
        );

        it(
          `loading indicators`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-loading-indicator-circle></sbb-loading-indicator-circle>
                <sbb-loading-indicator></sbb-loading-indicator>`,
              {
                darkMode,
              },
            );
          }),
        );

        it(
          `form elements`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-radio-button checked>Label</sbb-radio-button><br />
                <sbb-checkbox checked>Label</sbb-checkbox><br />
                <sbb-toggle-check checked>Label</sbb-toggle-check><br />
                <sbb-slider></sbb-slider> `,
              {
                darkMode,
              },
            );
          }),
        );
      });
    }
  });
});
