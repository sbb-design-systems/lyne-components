import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './train-blocked-passage.component.js';

describe(`sbb-train-blocked-passage`, () => {
  describeViewports({ viewports: ['zero'] }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html` <sbb-train-blocked-passage></sbb-train-blocked-passage> `);
      }),
    );
  });
});
