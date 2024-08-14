import { SbbBreakpointUltraMin } from '@sbb-esta/lyne-design-tokens';
import { setViewport } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing.js';

import '../../button.js';
import '../../card.js';
import '../../image.js';
import '../../title.js';
import './container.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

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

  const backgroundImageContent = (title: string): TemplateResult => html`
    <sbb-title level="2">Title</sbb-title>
    <div style="padding: 3rem 0; display: flex; gap: 2rem;">
      <sbb-card style="max-width: 504px; min-width: 288px;">
        <sbb-title level="5" style="margin-block-start: 1rem;">${title}</sbb-title>
        <p class="sbb-text-s">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <sbb-secondary-button style="margin-block-end: 1rem;">See more</sbb-secondary-button>
      </sbb-card>
    </div>
  `;

  const wrapperStyles = { backgroundColor: 'var(--sbb-color-silver)', padding: '0' };

  describeViewports({ viewportHeight: 600 }, () => {
    for (const color of colorCases) {
      it(
        `color=${color}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-container color=${color}>${containerContent()}</sbb-container>`,
            wrapperStyles,
          );
        }),
      );
    }

    it(
      `expanded`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-container expanded>${containerContent()}</sbb-container>`,
          wrapperStyles,
        );
      }),
    );

    it(
      `background-image slotted=sbb-image`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-container>
            ${backgroundImageContent('Example title')}
            <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
          </sbb-container>`,
        );

        await waitForImageReady(
          setup.snapshotElement.querySelector('sbb-container')!.querySelector('sbb-image')!,
        );
      }),
    );

    it(
      `background-image slotted=img`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-container>
            ${backgroundImageContent('Example title')}
            <img slot="image" src=${imageUrl} />
          </sbb-container>`,
        );

        await waitForImageReady(
          setup.snapshotElement.querySelector('sbb-container')!.querySelector('img')!,
        );
      }),
    );
  });

  describeViewports({ viewports: ['medium'] }, () => {
    it(
      `nested`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-container color="white">
              ${containerContent()}
              <div style="background-color: var(--sbb-color-milk);">
                <sbb-container color="transparent">${containerContent()}</sbb-container>
              </div>
            </sbb-container>
          `,
          wrapperStyles,
        );
      }),
    );
  });

  // Test very large screens
  for (const backgroundExpanded of backgroundExpandedCases) {
    it(
      `viewport=custom_background-expanded=${backgroundExpanded}`,
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
