import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './tooltip';

describe('sbb-tooltip', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-tooltip></sbb-tooltip>`);

    expect(root).dom.to.be.equal(
      `<sbb-tooltip data-state="closed" id="sbb-tooltip-1"></sbb-tooltip>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
