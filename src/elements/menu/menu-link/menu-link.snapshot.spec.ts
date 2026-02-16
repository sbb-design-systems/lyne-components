import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbMenuLinkElement } from './menu-link.component.ts';

import './menu-link.component.ts';

describe(`sbb-menu-link`, () => {
  describe('renders', () => {
    let element: SbbMenuLinkElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-menu-link
          href="https://github.com/sbb-design-systems/lyne-components"
          target="_blank"
          accessibility-label="a11y label"
        >
          Action
        </sbb-menu-link>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders component with icon', () => {
    let element: SbbMenuLinkElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-menu-link
          icon-name="menu-small"
          href="https://github.com/sbb-design-systems/lyne-components"
          target="_blank"
          accessibility-label="a11y label"
        >
          Action
        </sbb-menu-link>
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
