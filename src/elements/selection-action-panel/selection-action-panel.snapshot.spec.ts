import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbSelectionActionPanelElement } from './selection-action-panel.component.js';

import '../button/secondary-button.js';
import '../card/card-badge.js';
import '../checkbox/checkbox-panel.js';
import './selection-action-panel.component.js';

describe(`sbb-selection-action-panel`, () => {
  let element: SbbSelectionActionPanelElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-selection-action-panel>
          <sbb-checkbox-panel>
            Value one
            <span slot="subtext">Subtext</span>
          </sbb-checkbox-panel>
          <sbb-secondary-button size="m" icon-name="arrow-right-small"> </sbb-secondary-button>
          <sbb-card-badge>%</sbb-card-badge>
        </sbb-selection-action-panel>
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
