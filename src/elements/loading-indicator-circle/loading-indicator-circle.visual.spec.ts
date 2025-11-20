import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './loading-indicator-circle.component.ts';

describe(`sbb-loading-indicator-circle`, () => {
  const cases = {
    color: ['default', 'smoke', 'white'],
    size: ['s', 'l'],
    darkMode: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ color, size, darkMode }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-loading-indicator-circle
                color=${color}
                style=${size === 'l' ? 'font-size: var(--sbb-text-font-size-xl);' : nothing}
              ></sbb-loading-indicator-circle>
            `,
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
