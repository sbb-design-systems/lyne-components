import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './logo.component.js';

describe(`sbb-logo`, () => {
  const cases = {
    negative: [false, true],
    protectiveRoom: ['none', 'minimal', 'ideal'],
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ negative, protectiveRoom, forcedColors }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-logo ?negative=${negative} protective-room=${protectiveRoom}></sbb-logo>`,
            {
              backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
              padding: '0',
              maxWidth: '300px',
              forcedColors,
            },
          );
        }),
      );
    });
  });
});
