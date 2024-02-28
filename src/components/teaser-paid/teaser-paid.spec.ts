import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './teaser-paid';
import type { SbbTeaserPaidElement } from './teaser-paid';

describe('sbb-teaser-paid', () => {
  let element: SbbTeaserPaidElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-teaser-paid
        aria-label="label"
        href="https://www.sbb.ch"
        rel="external"
        target="_blank"
      ></sbb-teaser-paid>`,
    );
  });

  it('Dom', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('ShadowDom', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
