import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './signet.component.js';

describe(`sbb-signet`, () => {
  const cases = {
    protectiveRoom: ['none', 'minimal', 'ideal', 'panel'],
    colors: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ protectiveRoom, colors }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-signet protective-room=${protectiveRoom}></sbb-signet>`,
            {
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
