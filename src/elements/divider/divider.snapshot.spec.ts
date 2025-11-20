import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbDividerElement } from './divider.component.ts';
import './divider.component.ts';

describe(`sbb-divider`, () => {
  describe('renders', () => {
    let element: SbbDividerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-divider></sbb-divider>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders horizontal', () => {
    let element: SbbDividerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-divider orientation="horizontal"></sbb-divider>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders vertical', () => {
    let element: SbbDividerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-divider orientation="vertical"></sbb-divider>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
