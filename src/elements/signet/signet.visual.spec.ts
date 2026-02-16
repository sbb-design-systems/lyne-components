import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './signet.component.ts';

describe(`sbb-signet`, () => {
  const cases = {
    protectiveRoom: ['none', 'minimal', 'ideal', 'panel'],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ protectiveRoom, emulateMedia: { darkMode, forcedColors } }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-signet protective-room=${protectiveRoom}></sbb-signet>`,
            {
              padding: '0',
              maxWidth: '300px',
              forcedColors,
              darkMode,
            },
          );
        }),
      );
    });
  });
});
