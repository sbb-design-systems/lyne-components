import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import './sticky-bar';

describe('sbb-sticky-bar', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-sticky-bar></sbb-sticky-bar>`);

    expect(root).dom.to.be.equal(`<sbb-sticky-bar slot="sticky-bar"></sbb-sticky-bar>`);

    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(undefined, html`<sbb-sticky-bar></sbb-sticky-bar>`);
});
