import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbExpansionPanelContentElement } from './expansion-panel-content.component.ts';
import './expansion-panel-content.component.ts';

describe(`sbb-expansion-panel-content`, () => {
  describe('renders', () => {
    let element: SbbExpansionPanelContentElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
      );
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
