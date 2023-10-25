import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './sbb-datepicker';

describe('sbb-datepicker', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-datepicker></sbb-datepicker>`);

    expect(root).dom.to.be.equal(`<sbb-datepicker></sbb-datepicker>`);
    expect(root).shadowDom.to.be.equal(`<p role="status"></p>`);
  });
});
