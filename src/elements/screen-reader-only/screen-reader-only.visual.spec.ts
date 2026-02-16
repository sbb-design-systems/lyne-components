import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './screen-reader-only.component.ts';

describe(`sbb-screen-reader-only`, () => {
  describeViewports({ viewports: ['large'] }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          There is a visually hidden text here:
          <sbb-screen-reader-only>
            I'm visually hidden, but read to screen reader.
          </sbb-screen-reader-only>
        `);
      }),
    );
  });
});
