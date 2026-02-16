import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './logo.component.ts';

describe(`sbb-logo`, () => {
  const cases = {
    negative: [false, true],
    protectiveRoom: ['none', 'minimal', 'ideal'],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(
      cases,
      ({ negative, protectiveRoom, emulateMedia: { darkMode, forcedColors } }) => {
        it(
          ``,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-logo ?negative=${negative} protective-room=${protectiveRoom}></sbb-logo>`,
              {
                backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                padding: '0',
                maxWidth: '300px',
                forcedColors,
                darkMode,
              },
            );
          }),
        );
      },
    );
  });
});
