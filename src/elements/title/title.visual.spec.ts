import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import '../title.js';

describe(`sbb-title`, () => {
  describeViewports({ viewports: ['zero', 'small', 'large', 'ultra'] }, () => {
    for (const level of ['1', '2', '3', '4', '5', '6']) {
      it(
        `visual level ${level}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-title level=${level}>
              Data without insights are trivial, and insights without action are pointless
            </sbb-title>`,
          );
        }),
      );
    }

    it(
      'negative',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <div style="padding: 1rem; background-color: var(--sbb-color-charcoal);">
            <sbb-title negative>
              Data without insights are trivial, and insights without action are pointless
            </sbb-title>
          </div>`,
        );
      }),
    );
  });
});
