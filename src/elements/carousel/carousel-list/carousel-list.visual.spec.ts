import { html } from 'lit';

import images from '../../core/images.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../carousel-item/carousel-item.component.js';
import './carousel-list.component.js';

describe('sbb-carousel-list', () => {
  describeViewports(() => {
    it(
      `default`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-carousel-list>
            <sbb-carousel-item>
              <img src=${images[0]} alt="SBB image" />
            </sbb-carousel-item>
            <sbb-carousel-item>
              <img src=${images[1]} alt="SBB image" />
            </sbb-carousel-item>
            <sbb-carousel-item>
              <img src=${images[2]} alt="SBB image" />
            </sbb-carousel-item>
          </sbb-carousel-list>
        `);
      }),
    );
  });
});
