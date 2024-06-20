import { SbbBreakpointUltraMin } from '@sbb-esta/lyne-design-tokens';
import { setViewport } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './container.js';
import '../../title.js';
import '../../button.js';

describe(`sbb-container`, () => {
  const colorCases = ['transparent', 'white', 'milk'];

  const backgroundExpandedCases = [false, true];

  const containerContent = (): TemplateResult => html`
    <sbb-title level="4">Example title</sbb-title>
    <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
    <p class="sbb-text-s">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
    <sbb-secondary-button style="margin-block-end: 3rem;">See more</sbb-secondary-button>
  `;

  describeViewports(() => {
    for (const color of colorCases) {
      it(
        `color=${color}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html` <sbb-container color=${color}> ${containerContent()} </sbb-container> `,
            { backgroundColor: 'var(--sbb-color-silver)' },
          );
        }),
      );
    }

    it(
      `expanded`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-container expanded> ${containerContent()} </sbb-container> `,
          { backgroundColor: 'var(--sbb-color-silver)' },
        );
      }),
    );
  });

  // Test very large screens
  for (const backgroundExpanded of backgroundExpandedCases) {
    it(
      `background-expanded=${backgroundExpanded}`,
      visualDiffDefault.with(async (setup) => {
        await setViewport({ width: SbbBreakpointUltraMin + 300, height: 600 });

        await setup.withFixture(
          html`
            <sbb-container ?background-expanded=${backgroundExpanded}>
              ${containerContent()}
            </sbb-container>
          `,
          { backgroundColor: 'var(--sbb-color-silver)', padding: '0' },
        );
      }),
    );
  }
});
