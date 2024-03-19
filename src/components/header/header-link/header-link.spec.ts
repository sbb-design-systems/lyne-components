import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';

import type { SbbHeaderLinkElement } from './header-link';
import './header-link';

describe(`sbb-header-link`, () => {
  describe('renders the component as a button with icon', () => {
    let element: SbbHeaderLinkElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-header-link
          expand-from="small"
          href="https://github.com/lyne-design-system/lyne-components"
          target="_blank"
          icon-name="pie-small"
          >Action</sbb-header-link
        >`,
      );
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
