import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbCarouselElement } from './carousel.component.js';
import './carousel.component.js';

describe(`sbb-carousel`, () => {
  describe('renders', () => {
    let element: SbbCarouselElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-carousel></sbb-carousel>`);
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
