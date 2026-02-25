import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTabGroupElement } from './tab-group.component.ts';
import './tab-group.component.ts';
import '../tab-label.ts';
import '../tab.ts';

describe(`sbb-tab-group`, () => {
  let element: SbbTabGroupElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-tab-group initial-selected-index="0">
          <sbb-tab-label>Test tab label 1</sbb-tab-label>
          <sbb-tab> Test tab content 1 </sbb-tab>
          <sbb-tab-label>Test tab label 2</sbb-tab-label>
          <sbb-tab> Test tab content 2 </sbb-tab>
          <sbb-tab-label disabled>Test tab label 3</sbb-tab-label>
          <sbb-tab> Test tab content 3 </sbb-tab>
          <sbb-tab-label>Test tab label 4</sbb-tab-label>
          <sbb-tab> Test tab content 4 </sbb-tab>
        </sbb-tab-group>`,
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

  describe('fixed height', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-tab-group fixed-height>
          <sbb-tab-label>Test tab label 1</sbb-tab-label>
          <sbb-tab> Test tab content 1 </sbb-tab>
          <sbb-tab-label>Test tab label 2</sbb-tab-label>
          <sbb-tab> Test tab content 2 </sbb-tab>
        </sbb-tab-group>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['id'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
