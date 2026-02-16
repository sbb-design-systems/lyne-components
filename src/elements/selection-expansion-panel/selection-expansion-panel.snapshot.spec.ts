import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbSelectionExpansionPanelElement } from './selection-expansion-panel.component.ts';

import '../card/card-badge.ts';
import '../checkbox/checkbox-panel.ts';
import './selection-expansion-panel.component.ts';

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
