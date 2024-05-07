import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbSelectionExpansionPanelElement } from './selection-expansion-panel.js';

import '../card/card-badge.js';
import '../checkbox.js';
import '../checkbox/checkbox-panel.js';
import './selection-expansion-panel.js';

describe(`sbb-selection-expansion-panel`, () => {
  let element: SbbSelectionExpansionPanelElement;

  beforeEach(async () => {
    // Note: for easier testing, we add the slot="badge"
    // to <sbb-card-badge> which would not be needed in real.
    element = await fixture(html`
      <sbb-selection-expansion-panel>
        <sbb-card-badge slot="badge">
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
        <sbb-checkbox-panel>
          Value one
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-checkbox-panel>
        <div slot="content">Inner content</div>
      </sbb-selection-expansion-panel>
    `);
  });

  it('renders - Dom', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDom', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
