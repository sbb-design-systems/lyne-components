import { html } from 'lit';

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

const content = (imageAlignment: 'after' | 'below' = 'after') =>
  html` <sbb-flip-card-summary slot="summary" image-alignment=${imageAlignment}>
      <sbb-title level="4">Summary</sbb-title>
      <sbb-image
        slot="image"
        image-src=${sampleImages[0]}
        border-radius="none"
        aspect-ratio="free"
      ></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details slot="details"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae
      tortor ullamcorper maximus.
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
              <sbb-flip-card> ${content(imageAlignment as 'after' | 'below')} </sbb-flip-card>
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
  });
});
