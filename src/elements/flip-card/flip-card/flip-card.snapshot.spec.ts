import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbFlipCardElement } from './flip-card.js';
import './flip-card.js';

describe(`sbb-flip-card`, () => {
  it('renders', () => {
    let element: SbbFlipCardElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-flip-card my-prop="Label"></sbb-flip-card>`);
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
