import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbSidebarCloseButtonElement } from './sidebar-close-button.component.ts';
import './sidebar-close-button.component.ts';

describe(`sbb-sidebar-close-button`, () => {
  describe('renders', () => {
    let element: SbbSidebarCloseButtonElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-sidebar-close-button></sbb-sidebar-close-button>`);
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
