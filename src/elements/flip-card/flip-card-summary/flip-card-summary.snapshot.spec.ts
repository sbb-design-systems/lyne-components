import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbFlipCardSummaryElement } from './flip-card-summary.js';
import './flip-card-summary.js';

describe(`sbb-flip-card-summary`, () => {
  it('renders', () => {
    let element: SbbFlipCardSummaryElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-flip-card-summary my-prop="Label"></sbb-flip-card-summary>`);
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
