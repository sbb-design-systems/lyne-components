import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import '../../logo.ts';

describe(`sbb-logo-anniversary`, () => {
  const cases = {
    negative: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };
  const languageCases = ['en', 'de', 'fr', 'it'];

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ negative, emulateMedia: { darkMode, forcedColors } }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-logo-anniversary ?negative=${negative}></sbb-logo-anniversary>`,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              padding: '0',
              maxWidth: '454px',
              minHeight: '93px',
              forcedColors,
              darkMode,
            },
          );
        }),
      );
    });

    describe('language', () => {
      afterEach(() => {
        document.documentElement.removeAttribute('lang');
      });

      for (const language of languageCases) {
        it(
          language,
          visualDiffDefault.with(async (setup) => {
            document.documentElement.setAttribute('lang', language);
            await setup.withFixture(html`<sbb-logo-anniversary></sbb-logo-anniversary>`, {
              padding: '0',
              maxWidth: '454px',
              minHeight: '93px',
            });
          }),
        );
      }
    });
  });

  describeViewports({ viewports: ['large'] }, () => {
    it(
      'custom width',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-logo protective-room="none" style="width: 1000px;"></sbb-logo>`,
          { padding: '0px' },
        );
      }),
    );
  });
});
