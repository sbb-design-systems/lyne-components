import { html } from 'lit';

import images from '../../core/images.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './carousel-item.component.js';

describe('sbb-carousel-item', () => {
  describeViewports(() => {
    it(
      `default`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-carousel-item>
            <img src=${images[0]} alt="SBB image" />
          </sbb-carousel-item>
        `);
      }),
    );
  });
});
