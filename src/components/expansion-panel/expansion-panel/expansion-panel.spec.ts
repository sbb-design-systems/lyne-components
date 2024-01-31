import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbExpansionPanelElement } from './expansion-panel';
import './expansion-panel';
import '../expansion-panel-header';
import '../expansion-panel-content';

describe('sbb-expansion-panel', () => {
  describe('renders', () => {
    let element: SbbExpansionPanelElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-expansion-panel>
          <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `);
    });

    it('Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with level set', () => {
    let element: SbbExpansionPanelElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-expansion-panel title-level="4">
          <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `);
    });

    it('Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
