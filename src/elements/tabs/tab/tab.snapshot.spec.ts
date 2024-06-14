import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbTabElement } from './tab.js';
import './tab.js';

describe(`sbb-tab`, () => {
  describe('renders', () => {
    let element: SbbTabElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-tab><p>Content</p></sbb-tab>`);
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
