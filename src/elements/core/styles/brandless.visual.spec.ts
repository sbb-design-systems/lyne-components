import { html } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../testing/private.js';

import '../../button.js';
import '../../checkbox.js';
import '../../container.js';
import '../../teaser-hero.js';
import '../../link.js';
import '../../loading-indicator.js';
import '../../loading-indicator-circle.js';
import '../../radio-button.js';
import '../../slider.js';
import '../../toggle-check.js';

import './brandless-theme.scss';

describe(`sbb-brandless`, () => {
  describeViewports({ viewports: ['micro'] }, () => {
    for (const darkMode of [false, true]) {
      describe(`dark=${darkMode}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffActive]) {
          it(
            `button ${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-button sbb-badge="2">Brandless Button</sbb-button>`,
                {
                  darkMode,
                },
              );
            }),
          );
        }

        for (const state of [visualDiffHover, visualDiffActive]) {
          it(
            `link ${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(html`<sbb-link href="#">Brandless Link</sbb-link>`, {
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
              html`<sbb-radio-button checked></sbb-radio-button><br />
                <sbb-checkbox checked></sbb-checkbox><br />
                <sbb-toggle-check checked></sbb-toggle-check><br />
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
