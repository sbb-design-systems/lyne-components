import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './visual-checkbox.component.ts';

describe(`sbb-visual-checkbox`, () => {
  const states = [
    { indeterminate: undefined, checked: true },
    { indeterminate: undefined, checked: false },
    { indeterminate: true, checked: true },
  ];

  const visualStates = {
    disabled: [false, true],
    negative: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const size = ['xs', 's', 'm'];

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(
      { states, ...visualStates },
      ({ states, disabled, negative, emulateMedia: { forcedColors, darkMode } }) => {
        it(
          visualDiffDefault.name,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-visual-checkbox
                ?indeterminate=${states.indeterminate}
                ?checked=${states.checked}
                ?disabled=${disabled}
                ?negative=${negative}
              ></sbb-visual-checkbox>`,
              {
                backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                forcedColors,
                darkMode,
              },
            );
          }),
        );
      },
    );

    describeEach({ states, size }, ({ states, size }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-visual-checkbox
              ?indeterminate=${states.indeterminate}
              ?checked=${states.checked}
              size=${size}
            ></sbb-visual-checkbox>`,
          );
        }),
      );
    });
  });
});
