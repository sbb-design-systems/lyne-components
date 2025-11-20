import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './chip-label.component.ts';

describe(`sbb-chip-label`, () => {
  const sizeCases = ['xxs', 'xs', 's'];
  const colorCases = ['milk', 'charcoal', 'white', 'granite'];

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    // Size test
    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`<sbb-chip-label size=${size}>Label</sbb-chip-label>`);
        }),
      );
    }

    // Color tests
    for (const darkMode of [false, true]) {
      describe(`darkMode=${darkMode}`, () => {
        for (const color of colorCases) {
          it(
            `color=${color}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`<sbb-chip-label color=${color}>Label</sbb-chip-label>`, {
                backgroundColor:
                  color === 'milk' || color === 'white'
                    ? 'var(--sbb-background-color-4)'
                    : undefined,
                darkMode,
              });
            }),
          );
        }
      });
    }

    it(
      `fixed width`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-chip-label style="width: 10rem">
            This is a very long label which will be cut.
          </sbb-chip-label>
        `);
      }),
    );

    it(
      `forcedColors=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-chip-label>Label</sbb-chip-label>`, {
          forcedColors: true,
        });
      }),
    );
  });
});
