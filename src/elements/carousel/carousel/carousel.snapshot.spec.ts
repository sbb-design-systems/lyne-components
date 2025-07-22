import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbCarouselElement } from './carousel.component.js';
import './carousel.component.js';
import '../carousel-item/carousel-item.component.js';
import '../carousel-list/carousel-list.component.js';

describe(`sbb-carousel`, () => {
  describe('renders', () => {
    let element: SbbCarouselElement;

    beforeEach(async () => {
      element = await fixture(html`
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
        </sbb-carousel>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
