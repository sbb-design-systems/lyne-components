import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-card-badge';

describe('sbb-card-badge', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-card-badge />`);

    expect(root).dom.to.be.equal(
      `
        <sbb-card-badge slot="badge" color="charcoal" role="text" dir="ltr">
        </sbb-card-badge>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-card-badge-wrapper">
          <span class="sbb-card-badge">
            <span class="sbb-card-badge-background" aria-hidden="true"></span>
            <span class="sbb-card-badge-content">
              <slot />
            </span>
          </span>
        </span>
      `,
    );
  });
});
