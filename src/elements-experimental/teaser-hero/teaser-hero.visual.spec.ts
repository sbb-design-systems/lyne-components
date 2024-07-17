import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForImageReady } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit';

import './teaser-hero.js';
import '@sbb-esta/lyne-elements/image.js';

const imageUrl = import.meta.resolve('../../elements/core/testing/assets/placeholder-image.png');

describe(`sbb-teaser-hero`, () => {
  describeViewports({ viewports: ['zero', 'micro', 'small', 'medium', 'wide'] }, () => {
    for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#" link-content="Find out more" image-src=${imageUrl}>
              Break out and explore castles and palaces.
            </sbb-teaser-hero>
          `);

          await waitForImageReady(
            setup.snapshotElement
              .querySelector('sbb-teaser-hero')!
              .shadowRoot!.querySelector('sbb-image')!,
          );
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
    }
  });
});
