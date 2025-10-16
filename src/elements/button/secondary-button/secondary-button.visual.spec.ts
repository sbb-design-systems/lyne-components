import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './secondary-button.component.js';

// We test only the differences to the sbb-button
describe(`sbb-secondary-button`, () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    negative: [false, true],
    loading: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(
      cases,
      ({ disabled, negative, loading, emulateMedia: { forcedColors, darkMode } }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
              <sbb-secondary-button
                ?disabled=${disabled}
                ?negative=${negative}
                ?loading=${loading}
                icon-name="arrow-right-small"
              >
                Button
              </sbb-secondary-button>
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
      },
    );
  });
});
