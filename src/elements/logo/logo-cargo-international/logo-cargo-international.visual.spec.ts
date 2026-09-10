import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import '../../logo.ts';

describe(`sbb-logo-cargo-international`, () => {
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
              html`<sbb-logo-cargo-international
                ?negative=${negative}
                protective-room=${protectiveRoom}
              ></sbb-logo-cargo-international>`,
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

  describeViewports({ viewports: ['large'] }, () => {
    it(
      'custom width',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-logo-cargo-international
            protective-room="none"
            style="width: 1000px;"
          ></sbb-logo-cargo-international>`,
          { padding: '0px' },
        );
      }),
    );
  });
});
