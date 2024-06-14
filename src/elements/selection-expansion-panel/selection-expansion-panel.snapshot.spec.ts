import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbSelectionExpansionPanelElement } from './selection-expansion-panel.js';

import '../card/card-badge.js';
import '../checkbox/checkbox-panel.js';
import './selection-expansion-panel.js';

describe(`sbb-selection-expansion-panel`, () => {
  let element: SbbSelectionExpansionPanelElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-selection-expansion-panel>
          <sbb-checkbox-panel>
            Value one
            <span slot="subtext">Subtext</span>
            <span slot="suffix">Suffix</span>
            <sbb-card-badge>%</sbb-card-badge>
          </sbb-checkbox-panel>
          <div slot="content">Inner content</div>
        </sbb-selection-expansion-panel>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
