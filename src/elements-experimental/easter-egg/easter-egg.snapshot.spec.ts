import { expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbEasterEggElement } from './easter-egg.component.ts';

import '../easter-egg.ts';

describe(`sbb-easter-egg`, () => {
  let element: SbbEasterEggElement;

  describe('closed', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-easter-egg></sbb-easter-egg>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
