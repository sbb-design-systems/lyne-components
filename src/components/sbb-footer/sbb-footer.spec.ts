import { SbbFooter } from './sbb-footer';
import './sbb-footer';

import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('sbb-footer', () => {
  it('renders', async () => {
    const element: SbbFooter = await fixture(html`<sbb-footer accessibility-title="Footer" />`);

    expect(element).dom.to.be.equal(
      `
        <sbb-footer accessibility-title="Footer" variant="default"></sbb-footer>
      `,
    );
    expect(element).shadowDom.to.be.equal(
      `
            <footer class="sbb-footer">
              <div class="sbb-footer-wrapper">
                <h1 class="sbb-footer__title">Footer</h1>
                <slot></slot>
              </div>
            </footer>
          `,
    );
  });
});
