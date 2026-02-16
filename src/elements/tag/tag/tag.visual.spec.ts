import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.ts';

import './tag.component.ts';

describe(`sbb-tag`, () => {
  const cases = {
    checked: [false, true],
    disabled: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const visualCases = {
    size: ['s', 'm'],
    icon: [undefined, 'face-smiling-small'],
    amount: [undefined, 123],
  };

  describeViewports({ viewports: ['large'] }, () => {
    for (const visualDiffStandardState of visualDiffStandardStates) {
      it(
        `state=${visualDiffStandardState.name}`,
        visualDiffStandardState.with(async (setup) => {
          await setup.withFixture(html`<sbb-tag>Tag label</sbb-tag>`);
        }),
      );
    }

    describeEach(cases, ({ checked, disabled, emulateMedia: { forcedColors, darkMode } }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-tag
                ?checked=${checked}
                ?disabled=${disabled}
                icon-name="face-smiling-small"
                amount="123"
              >
                Tag label
              </sbb-tag>
            `,
            { forcedColors, darkMode },
          );
        }),
      );
    });

    describe(`disabledInteractive`, () => {
      for (const checked of [false, true]) {
        it(
          `checked=${checked}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-tag
                ?checked=${checked}
                disabled-interactive
                icon-name="face-smiling-small"
                amount="123"
              >
                Tag label
              </sbb-tag>
            `);
          }),
        );
      }
    });

    describeEach(visualCases, ({ icon, amount, size }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-tag
              icon-name=${icon ? icon : nothing}
              amount=${amount ? amount : nothing}
              size=${size}
            >
              Tag label
            </sbb-tag>
          `);
        }),
      );
    });
  });
});
