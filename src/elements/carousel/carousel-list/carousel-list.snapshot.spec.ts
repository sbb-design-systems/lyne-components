import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import { waitForCondition, waitForImageReady } from '../../core/testing.js';

import type { SbbCarouselListElement } from './carousel-list.component.js';

import './carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';

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

      await Promise.all(
        Array.from(element.querySelectorAll<HTMLImageElement>('img')).map((el) =>
          waitForImageReady(el),
        ),
      );

      // Wait for the intersection observer to be kicked in.
      await waitForCondition(
        () => element.querySelectorAll('sbb-carousel-item')[1]!.ariaHidden === 'true',
      );
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
