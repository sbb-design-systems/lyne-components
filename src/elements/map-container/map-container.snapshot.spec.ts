import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbMapContainerElement } from './map-container.js';

import './map-container.js';

describe(`sbb-map-container`, () => {
  let element: SbbMapContainerElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-map-container></sbb-map-container>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders without scroll-up button', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-map-container hide-scroll-up-button></sbb-map-container>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
