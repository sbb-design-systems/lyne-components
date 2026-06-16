import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import '../../download.ts';

describe(`sbb-download-info`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-download-info
            type="PDF"
            size="1234567"
            changed="2026-12-24"
            non-accessible
          ></sbb-download-info>
        `);
      }),
    );
  });
});
