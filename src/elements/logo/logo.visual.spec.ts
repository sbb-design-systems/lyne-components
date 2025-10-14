import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './logo.component.js';

describe(`sbb-logo`, () => {
  const cases = {
    negative: [false, true],
    protectiveRoom: ['none', 'minimal', 'ideal'],
    colors: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ negative, protectiveRoom, colors }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-logo ?negative=${negative} protective-room=${protectiveRoom}></sbb-logo>`,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              padding: '0',
              maxWidth: '300px',
              forcedColors: colors.forcedColors,
              darkMode: colors.darkMode,
            },
          );
        }),
      );
    });
  });
});
