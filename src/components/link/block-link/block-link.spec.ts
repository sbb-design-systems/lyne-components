import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbBlockLinkElement } from './block-link';
import './block-link';

describe('sbb-block-link', () => {
  let element: SbbBlockLinkElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-block-link
        href="https://github.com/lyne-design-system/lyne-components"
        size="m"
        download
        aria-label="Travelcards &amp; tickets"
      >
        Travelcards &amp; tickets.
      </sbb-block-link>
    `);
  });

  it('renders - DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
