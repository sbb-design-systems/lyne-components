import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-clock';

describe('sbb-clock', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-clock />`);

    expect(root).dom.to.be.equal(
      `
      <sbb-clock></sbb-clock>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
          <div class="sbb-clock">
            <span class="sbb-clock__face"></span>
            <span class="sbb-clock__hand-hours"></span>
            <span class="sbb-clock__hand-minutes sbb-clock__hand-minutes--no-transition"></span>
            <span class="sbb-clock__hand-seconds"></span>
          </div>
        `,
    );
  });
});
