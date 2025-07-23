import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../../core/images.js';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbCarouselItemElement } from './carousel-item.component.js';

import './carousel-item.component.js';
import '../../image.js';

describe(`sbb-carousel-item`, () => {
  describe('renders', () => {
    let element: SbbCarouselItemElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-carousel-item>
          <img src=${images[0]} alt="SBB image" />
        </sbb-carousel-item>
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

  describe('renders with sbb-image', () => {
    let element: SbbCarouselItemElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-carousel-item>
          <sbb-image
            image-src=${images[0]}
            alt="SBB image"
            style="width: 800px; height: 600px;"
          ></sbb-image>
        </sbb-carousel-item>
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
