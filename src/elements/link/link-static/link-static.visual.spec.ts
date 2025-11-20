import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './link-static.component.ts';

describe(`sbb-link-static`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      'adapts to text size',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<p class="sbb-text-m">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            <sbb-link-static>Show more.</sbb-link-static>
          </p>`,
        );
      }),
    );
  });

  describeViewports({ viewports: ['zero'] }, () => {
    const cases = {
      darkMode: [false, true],
      negative: [false, true],
    };

    describeEach(cases, ({ darkMode, negative }) => {
      for (const state of [visualDiffDefault, visualDiffActive, visualDiffHover]) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<p class="sbb-text-m">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                <sbb-link-static ?negative=${negative}>Show more.</sbb-link-static>
              </p>`,
              {
                backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                color: negative ? 'var(--sbb-color-aluminium)' : undefined,
                darkMode,
              },
            );
          }),
        );
      }
    });
  });
});
