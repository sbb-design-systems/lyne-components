import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './popover';

describe('sbb-popover', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-popover></sbb-popover>`);

    expect(root).dom.to.be.equal(
      `<sbb-popover data-state="closed" id="sbb-popover-1"></sbb-popover>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
