import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import '../breadcrumb';
import './breadcrumb-group';
import { waitForLitRender } from '../../core/testing';

describe('sbb-breadcrumb-group', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb-group>
        <sbb-breadcrumb href="/" icon-name="pie-small"></sbb-breadcrumb>
        <sbb-breadcrumb href="/one">One</sbb-breadcrumb>
        <sbb-breadcrumb href="/one">Two</sbb-breadcrumb>
      </sbb-breadcrumb-group>
    `);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb-group role='navigation' data-loaded>
        <sbb-breadcrumb id="sbb-breadcrumb-1" href="/" icon-name="pie-small" slot="li-0" dir="ltr" role="link" tabindex="0"></sbb-breadcrumb>
        <sbb-breadcrumb id="sbb-breadcrumb-2" href="/one" slot="li-1" dir="ltr" role="link" tabindex="0">
          One
        </sbb-breadcrumb>
        <sbb-breadcrumb id="sbb-breadcrumb-3" href="/one" slot="li-2" aria-current="page" dir="ltr" role="link" tabindex="0">
          Two
        </sbb-breadcrumb>
      </sbb-breadcrumb-group>
    `);

    await expect(root).shadowDom.to.equalSnapshot();
  });
});
