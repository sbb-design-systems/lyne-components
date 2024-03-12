import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbHeaderButtonElement } from './header-button';
import './header-button';

describe('sbb-header-button', () => {
  describe('renders the component as a button with icon', () => {
    let element: SbbHeaderButtonElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-header-button
          icon-name="pie-small"
          name="test"
          type="reset"
          value="value"
          expand-from="zero"
        >
          Action
        </sbb-header-button>
      `);
      await waitForLitRender(element);
    });

    it('Light DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
