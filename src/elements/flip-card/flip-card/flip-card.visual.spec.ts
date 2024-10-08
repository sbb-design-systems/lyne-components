import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing/wait-for-image-ready.js';
import type { SbbFlipCardImageAlignment } from '../flip-card-summary.js';

import './flip-card.js';
import '../flip-card-summary.js';
import '../flip-card-details.js';
import '../../title.js';
import '../../link.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

const content = (
  title: string = 'Summary',
  imageAlignment: SbbFlipCardImageAlignment = 'after',
  longContent: boolean = false,
  flipped = false,
): TemplateResult =>
  html`<sbb-flip-card-summary image-alignment=${imageAlignment}>
      <sbb-title level="4">${title}</sbb-title>
      <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details ?data-flipped=${flipped}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh.
      ${longContent
        ? `Duis dapibus vitae
      tortor ullamcorper maximus. In convallis consectetur felis. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus turpis elit, dapibus eget
      fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor ullamcorper maximus. In
      convallis consectetur felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
      luctus ornare condimentum. Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis
      in nibh. Duis dapibus vitae tortor ullamcorper maximus. In convallis consectetur felis.`
        : nothing}
      <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
    </sbb-flip-card-details>`;

describe(`sbb-flip-card`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const imageAlignment of ['after', 'below']) {
      describe(`image-alignment=${imageAlignment}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-flip-card>
                  ${content('Summary', imageAlignment as SbbFlipCardImageAlignment)}
                </sbb-flip-card>
              `);

              await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
            }),
          );
        }
      });
    }

    it(
      'flipped',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-flip-card data-flipped>
            ${content('Summary', 'after', false, true)}</sbb-flip-card
          >`,
        );
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'multiline',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-flip-card>
            ${content(
              'This is a very long title that should break into multiple lines',
            )}</sbb-flip-card
          >`,
        );
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    for (const imageAlignment of ['after', 'below']) {
      it(
        `long content image-alignment=${imageAlignment}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-flip-card>
              ${content('Summary', imageAlignment as SbbFlipCardImageAlignment, true)}
            </sbb-flip-card>`,
          );
          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    }

    describe('forcedColors=true', () => {
      for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(html`<sbb-flip-card>${content('Summary')}</sbb-flip-card>`, {
              forcedColors: true,
            });

            await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
          }),
        );
      }
    });
  });
});
