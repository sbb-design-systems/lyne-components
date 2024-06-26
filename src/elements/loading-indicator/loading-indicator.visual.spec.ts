import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './loading-indicator.js';

describe(`sbb-loading-indicator`, () => {
  const cases = {
    color: ['default', 'smoke', 'white'],
    size: ['s', 'l'],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ color, size }) => {
      it(
        `variant=window`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-loading-indicator
                variant="window"
                color=${color}
                size=${size}
              ></sbb-loading-indicator>
            `,
            { backgroundColor: color === 'white' ? 'var(--sbb-color-charcoal)' : undefined },
          );
        }),
      );

      it(
        `variant=circle`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-loading-indicator
                variant="circle"
                color=${color}
                style=${size === 'l' ? 'font-size: var(--sbb-font-size-text-xl);' : nothing}
              ></sbb-loading-indicator>
            `,
            { backgroundColor: color === 'white' ? 'var(--sbb-color-charcoal)' : undefined },
          );
        }),
      );
    });
  });
});
