import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbCarouselListElement } from './carousel-list.component.js';
import './carousel-list.component.js';

describe(`sbb-carousel-list`, () => {
  describe('renders', () => {
    let element: SbbCarouselListElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-carousel-list></sbb-carousel-list>`);
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
