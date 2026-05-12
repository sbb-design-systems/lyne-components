import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import type { SbbLoadingIndicatorElement } from './loading-indicator.component.ts';

import '../loading-indicator.ts';

describe(`sbb-loading-indicator`, () => {
  const colorCases = {
    color: ['default', 'smoke', 'white'] satisfies SbbLoadingIndicatorElement['color'][],
    darkMode: [false, true],
  };

  const sizeCases = {
    size: ['s', 'l', 'xl', 'xxl', 'xxxl'] satisfies SbbLoadingIndicatorElement['size'][],
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
