import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbDownloadElement } from './download.component.ts';

import '../../download.ts';

describe(`sbb-download`, () => {
  describe('renders with derived label and icon', () => {
    let element: SbbDownloadElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-download href="files/annual-report.pdf">
          <sbb-download-info size="1234567" changed="2026-12-24"></sbb-download-info>
        </sbb-download>
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

  describe('renders with explicit label and milk color', () => {
    let element: SbbDownloadElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-download href="report.pdf" label="Annual report" color="milk">
          <sbb-download-info type="PDF" size="123 KB" non-accessible></sbb-download-info>
        </sbb-download>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with custom content and info', () => {
    let element: SbbDownloadElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-download href="files/annual-report.pdf" label="Annual report">
          <span>Custom description for the downloadable document.</span>
          <sbb-download-info size="1234567" changed="2026-12-24"></sbb-download-info>
        </sbb-download>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
