import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './accent-button.component.js';

// We test only the differences to the sbb-button
describe(`sbb-accent-button`, () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    negative: [false, true],
    loading: [false, true],
    forcedColors: [false, true],
    darkMode: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ disabled, negative, loading, forcedColors, darkMode }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-accent-button
              ?disabled=${disabled}
              ?negative=${negative}
              ?loading=${loading}
              icon-name="arrow-right-small"
            >
              Button
            </sbb-accent-button>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-background-color-4-negative)' : undefined,
            focusOutlineDark: negative,
            forcedColors,
            darkMode,
          },
        );
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });
  });
});
