import { expect } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';
import { waitForCondition } from '../core/testing/wait-for-condition.ts';

import type { SbbToastElement } from './toast.component.ts';

import './toast.component.ts';
import '../link/link.ts';

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

  describe('renders in dark mode', () => {
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

    beforeEach(async () => {
      await emulateMedia({ colorScheme: 'dark' });
      await waitForCondition(() => !elem.shadowRoot!.querySelector('sbb-divider')!.negative);
    });

    after(async () => {
      await emulateMedia({ colorScheme: 'light' });
    });

    it('DOM', async () => {
      await expect(elem).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(elem).shadowDom.to.be.equalSnapshot();
    });
  });
});
