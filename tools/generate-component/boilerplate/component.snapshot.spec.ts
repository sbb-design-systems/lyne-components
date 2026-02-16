import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { __nameUpperCase__ } from './__noPrefixName__.component.ts';
import './__noPrefixName__.component.ts';

describe(`__name__`, () => {
  describe('renders', () => {
    let element: __nameUpperCase__;

    beforeEach(async () => {
      element = await fixture(html`<__name__ my-prop="Label"></__name__>`);
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
