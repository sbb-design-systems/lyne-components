import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './status';

describe('sbb-status', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-status my-prop="Label"></sbb-status>`);

    expect(root).dom.to.be.equal(`<sbb-status my-prop="Label"></sbb-status>`);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-status">
        Label
      </div>
    `);
  });
});
