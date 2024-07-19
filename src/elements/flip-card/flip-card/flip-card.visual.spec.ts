import { html, nothing, type TemplateResult } from 'lit';

import sampleImages from '../../core/images.js';
import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';
import './flip-card.js';
import '../flip-card-summary.js';
import '../flip-card-details.js';
import '../../title.js';
import '../../link.js';
import '../../image.js';
import type { SbbFlipCardImageAlignment } from '../flip-card-summary.js';

const content = (
  title: string = 'Summary',
  imageAlignment: SbbFlipCardImageAlignment = 'after',
  longConent: boolean = false,
): TemplateResult =>
  html` <sbb-flip-card-summary slot="summary" image-alignment=${imageAlignment}>
      <sbb-title level="4">${title}</sbb-title>
      <sbb-image
        slot="image"
        image-src=${sampleImages[0]}
        border-radius="none"
        aspect-ratio="free"
      ></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details slot="details"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh.
      ${longConent
        ? `Duis dapibus vitae
      tortor ullamcorper maximus. In convallis consectetur felis. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus turpis elit, dapibus eget
      fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor ullamcorper maximus. In
      convallis consectetur felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
      luctus ornare condimentum. Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis
      in nibh. Duis dapibus vitae tortor ullamcorper maximus. In convallis consectetur felis.`
        : nothing}
      <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link></sbb-flip-card-details
    >`;

describe(`sbb-flip-card`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const imageAlignment of ['after', 'below']) {
      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          `image-alignment=${imageAlignment} ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-flip-card>
                ${content('Summary', imageAlignment as SbbFlipCardImageAlignment)}
              </sbb-flip-card>
            `);
          }),
        );
      }
    }

    it(
      'flipped',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-flip-card data-flipped> ${content()}</sbb-flip-card>`);
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
        }),
      );
    }
  });
});
