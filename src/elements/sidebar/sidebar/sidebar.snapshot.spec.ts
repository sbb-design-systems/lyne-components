import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbSidebarElement } from './sidebar.component.ts';

import './sidebar.component.ts';

describe(`sbb-sidebar`, () => {
  describe('renders', () => {
    let element: SbbSidebarElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-sidebar role="navigation"></sbb-sidebar>`);
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
