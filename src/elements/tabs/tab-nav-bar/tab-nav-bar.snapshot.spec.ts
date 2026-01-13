import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTabNavBarElement } from './tab-nav-bar.component.ts';
import './tab-nav-bar.component.ts';

describe(`sbb-tab-nav-bar`, () => {
  describe('renders', () => {
    let element: SbbTabNavBarElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-tab-nav-bar>
          <a href="https://www.sbb.ch" class="sbb-active" aria-current="page">Nav item 1</a>
          <a href="https://www.sbb.ch">Nav item 2</a>
          <a class="sbb-disabled" aria-disabled="true" role="link">Nav item 3</a>
        </sbb-tab-nav-bar>`,
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
