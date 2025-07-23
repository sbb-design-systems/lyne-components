import { html } from 'lit';

import images from '../../core/images.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing.js';

import './carousel-item.component.js';
import '../../image.js';

describe('sbb-carousel-item', () => {
  describeViewports(() => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-carousel-item>
            <img src=${images[0]} alt="SBB image" width="200" height="150" />
          </sbb-carousel-item>
        `);

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('img')!),
        );
      }),
    );
  });
});
