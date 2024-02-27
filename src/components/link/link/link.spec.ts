import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbLinkElement } from './link';
import './link';

describe('sbb-link', () => {
  let element: SbbLinkElement;

  beforeEach(async () => {
    element = await fixture(
      html` <sbb-link size="m" href="https://sbb.ch" target="_blank">
        Travelcards &amp; tickets.
      </sbb-link>`,
    );
  });

  it('renders - DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
