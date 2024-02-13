import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbCardBadgeElement } from './card-badge';
import './card-badge';

describe('sbb-card-badge', () => {
  let element: SbbCardBadgeElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-card-badge>Black Friday Special</sbb-card-badge>`);
  });

  it('renders - Dom', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDom', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
