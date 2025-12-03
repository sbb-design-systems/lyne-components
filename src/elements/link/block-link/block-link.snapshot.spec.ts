import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbBlockLinkElement } from './block-link.component.ts';

import './block-link.component.ts';

describe(`sbb-block-link`, () => {
  let element: SbbBlockLinkElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-block-link
          href="https://github.com/sbb-design-systems/lyne-components"
          size="m"
          download
          accessibility-label="Travelcards &amp; tickets"
        >
          Travelcards &amp; tickets.
        </sbb-block-link>
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
