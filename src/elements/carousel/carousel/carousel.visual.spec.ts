import { html } from 'lit';

import images from '../../core/images.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing.js';

import './carousel.component.js';
import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator/compact-paginator/compact-paginator.component.js';

describe('sbb-carousel', () => {
  describeViewports(() => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-carousel>
            <sbb-carousel-list>
              <sbb-carousel-item>
                <img src=${images[0]} alt="SBB image" height="300" width="400" />
              </sbb-carousel-item>
              <sbb-carousel-item>
                <img src=${images[1]} alt="SBB image" height="300" width="400" />
              </sbb-carousel-item>
              <sbb-carousel-item>
                <img src=${images[2]} alt="SBB image" height="300" width="400" />
              </sbb-carousel-item>
            </sbb-carousel-list>
            <sbb-compact-paginator></sbb-compact-paginator>
          </sbb-carousel>
        `);

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('img')!),
        );
      }),
    );
  });
});
