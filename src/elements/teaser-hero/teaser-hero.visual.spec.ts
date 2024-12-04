import { html } from 'lit';

import {
  describeViewports,
  loadAssetAsBase64,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';
import './teaser-hero.js';
import '../image.js';
import '../chip-label.js';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');
const imageBase64 = await loadAssetAsBase64(imageUrl);

describe(`sbb-teaser-hero`, () => {
  describeViewports({ viewports: ['zero', 'micro', 'small', 'medium', 'wide'] }, () => {
    for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#" link-content="Find out more">
              Break out and explore castles and palaces.

              <figure class="sbb-figure" slot="image">
                <sbb-image image-src=${imageUrl}></sbb-image>
                <sbb-chip-label class="sbb-figure-overlap-start-start">Label</sbb-chip-label>
              </figure>
            </sbb-teaser-hero>
          `);

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );

      it(
        `slotted ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#">
              Break out and explore castles and palaces.
              <span slot="link-content">Find out more</span>
              <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            </sbb-teaser-hero>
          `);

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );

      it(
        `slotted-image ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#">
              Break out and explore castles and palaces.
              <span slot="link-content">Find out more</span>
              <img slot="image" src=${imageBase64} alt="" />
            </sbb-teaser-hero>
          `);

          await waitForImageReady(setup.snapshotElement.querySelector('img')!);
        }),
      );

      it(
        `without content ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#">
              <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            </sbb-teaser-hero>
          `);

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    }
  });
});
