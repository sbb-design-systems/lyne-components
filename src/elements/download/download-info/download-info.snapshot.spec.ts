import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbDownloadInfoElement } from './download-info.component.ts';

import '../../download.ts';

describe(`sbb-download-info`, () => {
  let element: SbbDownloadInfoElement;

  describe('renders with all values', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-download-info
          type="PDF"
          size="1234567"
          changed="2026-12-24"
          non-accessible
        ></sbb-download-info>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with a textual size', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-download-info type="PDF" size="123 KB"></sbb-download-info>`,
      );
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
