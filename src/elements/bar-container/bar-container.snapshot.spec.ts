import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbBarContainerElement } from './bar-container.component.ts';
import './bar-container.component.ts';

describe(`sbb-bar-container`, () => {
  describe('renders', () => {
    let element: SbbBarContainerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-bar-container></sbb-bar-container>`);
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
