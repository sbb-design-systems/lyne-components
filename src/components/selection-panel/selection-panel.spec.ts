import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbSelectionPanelElement } from './selection-panel';
import './selection-panel';
import '../checkbox';

describe('sbb-selection-panel', () => {
  let element: SbbSelectionPanelElement;

  beforeEach(async () => {
    // Note: for easier testing, we add the slot="badge"
    // to <sbb-card-badge> which would not be needed in real.
    element = await fixture(html`
      <sbb-selection-panel disable-animation>
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
      </sbb-selection-panel>
    `);
    await waitForLitRender(element);
  });

  it('renders - Dom', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDom', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
