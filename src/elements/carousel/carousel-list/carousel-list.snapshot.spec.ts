import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbCarouselListElement } from './carousel-list.component.ts';

import './carousel-list.component.ts';
import '../carousel-item/carousel-item.component.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-carousel-list`, () => {
  describe('renders', () => {
    let element: SbbCarouselListElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-carousel-list>
          <sbb-carousel-item>
            <img src=${imageUrl} alt="SBB image" height="300" width="400" />
          </sbb-carousel-item>
          <sbb-carousel-item>
            <img src=${imageUrl} alt="SBB image" height="300" width="400" />
          </sbb-carousel-item>
          <sbb-carousel-item>
            <img src=${imageUrl} alt="SBB image" height="300" width="400" />
          </sbb-carousel-item>
        </sbb-carousel-list>
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
});
