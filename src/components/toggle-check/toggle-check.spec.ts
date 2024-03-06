import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbToggleCheckElement } from './toggle-check';

import './toggle-check';

describe('sbb-toggle-check', () => {
  describe('should render', async () => {
    let element: SbbToggleCheckElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-toggle-check checked></sbb-toggle-check>`);
      await waitForLitRender(element);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`<sbb-toggle-check></sbb-toggle-check>`);
});
