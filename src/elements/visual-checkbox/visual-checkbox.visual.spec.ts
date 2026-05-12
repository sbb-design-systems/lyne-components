import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import type { SbbVisualCheckboxElement } from './visual-checkbox.component.ts';

import '../visual-checkbox.ts';

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

  const size = [null, 'xs', 's', 'm'] satisfies SbbVisualCheckboxElement['size'][];

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
              size=${size || nothing}
            ></sbb-visual-checkbox>`,
          );
        }),
      );
    });
  });
});
