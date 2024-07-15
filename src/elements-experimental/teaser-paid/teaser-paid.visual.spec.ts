import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForImageReady } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit';

import '@sbb-esta/lyne-elements/chip.js';
import '@sbb-esta/lyne-elements/image.js';

import './teaser-paid.js';

const imageUrl = import.meta.resolve('../../elements/core/testing/assets/placeholder-image.png');

describe(`sbb-teaser-paid`, () => {
  describeViewports({ viewports: ['zero', 'micro', 'small', 'medium', 'wide'] }, () => {
    for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-paid href="#">
              <sbb-chip slot="chip">Label</sbb-chip>
              <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            </sbb-teaser-paid>
          `);

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    }
  });
});
