import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbDownloadInfoElement } from './download-info.component.ts';

import '../../download.ts';

describe(`sbb-download-info ssr`, () => {
  let root: SbbDownloadInfoElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-download-info type="PDF" size="1234567" changed="2026-12-24"></sbb-download-info>`,
      {
        modules: ['../../download.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDownloadInfoElement);
  });
});
