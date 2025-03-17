import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbStickyBarElement } from './sticky-bar.component.js';
import './sticky-bar.component.js';

describe(`sbb-sticky-bar`, () => {
  describe('renders', () => {
    let element: SbbStickyBarElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-sticky-bar></sbb-sticky-bar>`);
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
