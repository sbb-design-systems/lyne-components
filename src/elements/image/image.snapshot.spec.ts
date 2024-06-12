import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import type { SbbImageElement } from './image.js';

import './image.js';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-image`, () => {
  let element: SbbImageElement;

  describe('should render', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-image image-src=${imageUrl}></sbb-image>`);
      await waitForImageReady(element);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot({
        ignoreAttributes: ['src', 'srcset', 'fetchpriority'],
      });
    });
  });
});
