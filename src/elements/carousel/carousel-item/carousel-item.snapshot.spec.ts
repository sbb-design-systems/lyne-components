import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCarouselItemElement } from './carousel-item.component.ts';

import './carousel-item.component.ts';
import '../../image.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-carousel-item`, () => {
  describe('renders', () => {
    let element: SbbCarouselItemElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-carousel-item>
          <img src=${imageUrl} alt="SBB image" />
        </sbb-carousel-item>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['src'] });
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
            image-src=${imageUrl}
            alt="SBB image"
            style="width: 800px; height: 600px;"
          ></sbb-image>
        </sbb-carousel-item>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
