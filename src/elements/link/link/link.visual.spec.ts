import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';

import './link.component.js';

describe(`sbb-link`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      'adapts to text size',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<p class="sbb-text-m">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            <sbb-link href="#">Show more.</sbb-link>
          </p>`,
        );
      }),
    );
  });

  describeViewports({ viewports: ['zero'] }, () => {
    const cases = {
      colors: [
        { darkMode: false, forcedColors: false },
        { darkMode: true, forcedColors: false },
        { darkMode: false, forcedColors: true },
      ],
      negative: [false, true],
    };

    describeEach(cases, ({ colors, negative }) => {
      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<p class="sbb-text-m">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                <sbb-link href="#" ?negative=${negative}>Show more.</sbb-link>
              </p>`,
              {
                backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                color: negative ? 'var(--sbb-color-aluminium)' : undefined,
                darkMode: colors.darkMode,
                forcedColors: colors.forcedColors,
              },
            );
          }),
        );
      }
    });
  });
});
