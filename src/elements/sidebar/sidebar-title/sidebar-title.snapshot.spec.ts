import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbSidebarTitleElement } from './sidebar-title.component.ts';

import './sidebar-title.component.ts';

describe('sbb-sidebar-title', () => {
  let element: SbbSidebarTitleElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-sidebar-title>Title</sbb-sidebar-title>`);
    });

    it('Light DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
