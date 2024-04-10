import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private/index.js';
import './dialog-title.js';

describe('sbb-dialog-title', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-dialog-title>Title</sbb-dialog-title>`);

    expect(root).dom.to.be.equal(`
      <sbb-dialog-title
       level="2"
       role="heading"
       visual-level="3">Title</sbb-dialog-title>
    `);

    await expect(root).shadowDom.to.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-dialog-title>Title</sbb-dialog-title>`);
});
