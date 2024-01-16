import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import '.';

describe('sbb-dialog', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-dialog></sbb-dialog>`);

    expect(root).dom.to.be.equal(`<sbb-dialog data-state="closed" data-fullscreen></sbb-dialog>`);

    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
