import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbLinkButtonElement } from './link-button.component.js';

import './link-button.component.js';

describe(`sbb-link-button`, () => {
  let element: SbbLinkButtonElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-link-button
          name="name"
          type="button"
          form="form"
          value="value"
          size="m"
          aria-label="Travelcards &amp; tickets"
        >
          Travelcards &amp; tickets.
        </sbb-link-button>
      `);
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
