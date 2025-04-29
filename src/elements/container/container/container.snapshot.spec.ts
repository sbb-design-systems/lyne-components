import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbContainerElement } from './container.component.js';
import './container.component.js';

describe(`sbb-container`, () => {
  describe('renders', () => {
    let element: SbbContainerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-container></sbb-container>`);
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
