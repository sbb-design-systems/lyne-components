import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';
import { waitForCondition, waitForLitRender } from '../core/testing.js';

import { SbbImageElement } from './image.js';

describe(`sbb-image`, () => {
  let element: SbbImageElement;

  describe('should render', async () => {
    beforeEach(async () => {
      const url = `${location.protocol}//${location.host}/src/components/clock/assets/sbb_clock_face.svg`;
      element = await fixture(html`<sbb-image image-src=${url}></sbb-image>`);

      // Wait until the image is successfully loaded
      await waitForCondition(() => element.hasAttribute('data-loaded'), 30, 6000);
      await waitForLitRender(element);

      assert.instanceOf(element, SbbImageElement);
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
