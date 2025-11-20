import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './loading-indicator.component.ts';

describe(`sbb-loading-indicator`, () => {
  const colorCases = {
    color: ['default', 'smoke', 'white'],
    darkMode: [false, true],
  };

  const sizeCases = {
    size: ['s', 'l', 'xl', 'xxl', 'xxxl'],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(sizeCases, ({ size }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-loading-indicator size=${size}></sbb-loading-indicator>`,
          );
        }),
      );
    });

    describeEach(colorCases, ({ color, darkMode }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-loading-indicator color=${color}></sbb-loading-indicator>`,
            {
              backgroundColor:
                color === 'white' ? 'var(--sbb-background-color-1-negative)' : undefined,
              darkMode,
            },
          );
        }),
      );
    });
  });
});
