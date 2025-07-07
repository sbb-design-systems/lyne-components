import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbToastElement } from './toast.component.js';

import './toast.component.js';
import '../link/link.js';

describe(`sbb-toast`, () => {
  let elem: SbbToastElement;

  describe('renders', () => {
    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-toast icon-name="circle-tick-small">Lorem ipsum dolor</sbb-toast>
      `);
    });

    it('DOM', async () => {
      await expect(elem).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(elem).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders readonly', () => {
    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-toast icon-name="circle-tick-small" readonly>Lorem ipsum dolor</sbb-toast>
      `);
    });

    it('DOM', async () => {
      await expect(elem).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(elem).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with action', () => {
    beforeEach(async () => {
      elem = await fixture(html`
        <sbb-toast icon-name="circle-tick-small">
          Lorem ipsum dolor
          <sbb-link slot="action" sbb-toast-close href="https://www.sbb.ch" target="_blank">
            Link action
          </sbb-link>
        </sbb-toast>
      `);
    });

    it('DOM', async () => {
      await expect(elem).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(elem).shadowDom.to.be.equalSnapshot();
    });
  });
});
