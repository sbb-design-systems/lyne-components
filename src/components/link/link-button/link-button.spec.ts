import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbLinkButtonElement } from './link-button';
import './link-button';

describe('sbb-link-button', () => {
  let element: SbbLinkButtonElement;

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

  it('renders - DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
