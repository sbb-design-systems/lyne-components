import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbFooterElement } from './footer.component.js';
import './footer.component.js';

describe(`sbb-footer`, () => {
  describe('renders', () => {
    let element: SbbFooterElement;

    beforeEach(async () => {
      element = await fixture(html` <sbb-footer accessibility-title="Footer"></sbb-footer> `);
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
