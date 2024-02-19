import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbHeaderElement } from './header';
import './header';

describe('sbb-header', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-header></sbb-header>`);

    expect(root).dom.to.be.equal(`<sbb-header></sbb-header>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  describe('renders actions and logo', () => {
    let element: SbbHeaderElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-header>
          <sbb-header-link
            icon-name="hamburger-menu-small"
            href="https://github.com/lyne-design-system/lyne-components"
            >Menu</sbb-header-link
          >
          <div slot="logo">
            <circle cx="25" cy="75" r="20"></circle>
          </div>
        </sbb-header>
      `);
      await waitForLitRender(element);
    });

    it('Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
