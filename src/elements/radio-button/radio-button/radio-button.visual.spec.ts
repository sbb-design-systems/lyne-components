import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import '../radio-button.ts';

const cases = {
  size: ['xs', 's', 'm'],
  checked: [true, false],
};

const colorCases = {
  emulateMedia: [
    { forcedColors: false, darkMode: false },
    { forcedColors: true, darkMode: false },
    { forcedColors: false, darkMode: true },
  ],
  checked: [true, false],
  disabled: [false, true],
};

const longLabel =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

describe(`sbb-radio-button`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ size, checked }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-radio-button ?checked=${checked} size=${size}> Value </sbb-radio-button>
          `);
        }),
      );
    });

    describeEach(colorCases, ({ checked, disabled, emulateMedia: { darkMode, forcedColors } }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-radio-button ?checked=${checked} ?disabled=${disabled}>
              Value
            </sbb-radio-button>`,
            { darkMode, forcedColors },
          );
        }),
      );
    });

    it(
      'long label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-radio-button checked>${longLabel}</sbb-radio-button>`);
      }),
    );

    // Focus state is tested in the radio-button-group
  });
});
