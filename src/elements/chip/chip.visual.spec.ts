import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './chip.js';

describe(`sbb-chip`, () => {
  const sizeCases = ['xxs', 'xs', 's'];
  const colorCases = ['milk', 'charcoal', 'white', 'granite'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    // Size test
    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html` <sbb-chip size=${size}> Label </sbb-chip> `);
        }),
      );
    }

    // Color test
    for (const color of colorCases) {
      it(
        `color=${color}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html` <sbb-chip color=${color}> Label </sbb-chip> `, {
            backgroundColor: color === 'white' ? 'var(--sbb-color-granite)' : undefined,
          });
        }),
      );
    }

    it(
      `fixed width`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-chip style="width: 10rem"> This is a very long label which will be cut. </sbb-chip>
        `);
      }),
    );
  });
});
