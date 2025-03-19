import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './secondary-button.js';

// We test only the differences to the sbb-button
describe(`sbb-secondary-button`, () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    negative: [false, true],
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ disabled, negative, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-secondary-button
              ?disabled=${disabled}
              ?negative=${negative}
              icon-name="arrow-right-small"
            >
              Button
            </sbb-secondary-button>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-color-anthracite)' : undefined,
            focusOutlineDark: negative,
            forcedColors,
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
