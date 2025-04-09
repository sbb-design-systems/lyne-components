import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbCardBadgeElement } from './card-badge.component.js';

import './card-badge.component.js';

describe(`sbb-card-badge`, () => {
  let element: SbbCardBadgeElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-card-badge>Black Friday Special</sbb-card-badge>`);
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
