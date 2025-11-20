import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.ts';

import './link-button.component.ts';

describe(`sbb-link-button`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      'adapts to text size',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<p class="sbb-text-m">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            <sbb-link-button>Show more.</sbb-link-button>
          </p>`,
        );
      }),
    );
  });

  describeViewports({ viewports: ['zero'] }, () => {
    const cases = {
      emulateMedia: [
        { darkMode: false, forcedColors: false },
        { darkMode: true, forcedColors: false },
        { darkMode: false, forcedColors: true },
      ],
      negative: [false, true],
    };

    describeEach(cases, ({ emulateMedia: { darkMode, forcedColors }, negative }) => {
      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<p class="sbb-text-m">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                <sbb-link-button ?negative=${negative}>Show more.</sbb-link-button>
              </p>`,
              {
                backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                color: negative ? 'var(--sbb-color-aluminium)' : undefined,
                darkMode,
                forcedColors,
              },
            );
          }),
        );
      }
    });

    it(
      `disabledInteractive`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-link-button disabled-interactive>Show more.</sbb-link-button>`,
        );
      }),
    );
  });
});
