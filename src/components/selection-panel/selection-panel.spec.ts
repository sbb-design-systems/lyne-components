import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import './selection-panel';
import '../checkbox';

describe('sbb-selection-panel', () => {
  // Note: for easier testing, we add the slot="badge"
  // to <sbb-card-badge> which would not be needed in real.
  const template = html`<sbb-selection-panel disable-animation>
    <sbb-card-badge slot="badge">
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    <sbb-checkbox>
      Value one
      <span slot="subtext">Subtext</span>
      <span slot="suffix">Suffix</span>
    </sbb-checkbox>
    <div slot="content">Inner content</div>
  </sbb-selection-panel>`;

  it('renders - Dom', async () => {
    const root = await fixture(template);
    await waitForLitRender(root);
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDom', async () => {
    const root = await fixture(template);
    await waitForLitRender(root);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
