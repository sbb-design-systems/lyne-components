import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDownloadElement } from './download.component.ts';

import '../../download.ts';

describe(`sbb-download ssr`, () => {
  let root: SbbDownloadElement;

  describe('with info', () => {
    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-download href="files/annual-report.pdf">
            <sbb-download-info size="1234567" changed="2026-12-24"></sbb-download-info>
          </sbb-download>
        `,
        {
          modules: ['../../download.ts'],
        },
      );
    });

    it('renders', () => {
      assert.instanceOf(root, SbbDownloadElement);
    });
  });

  describe('with custom content and info', () => {
    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-download href="files/annual-report.pdf">
            <span>Custom description for the downloadable document.</span>
            <sbb-download-info size="1234567" changed="2026-12-24"></sbb-download-info>
          </sbb-download>
        `,
        {
          modules: ['../../download.ts'],
        },
      );
    });

    it('renders', () => {
      assert.instanceOf(root, SbbDownloadElement);
      expect(root.querySelector('sbb-download-info')!.slot).to.be.equal('info');
      expect(root.querySelector('span')!.slot).to.be.equal('');
    });
  });
});
