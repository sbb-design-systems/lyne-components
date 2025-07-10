import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './transparent-button.component.js';

// We test only the differences to the sbb-button
describe(`sbb-transparent-button`, () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    negative: [false, true],
    forcedColors: [false, true],
    loading: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ disabled, negative, forcedColors, loading }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-transparent-button
              ?disabled=${disabled}
              ?negative=${negative}
              ?loading=${loading}
              icon-name="arrow-right-small"
            >
              Button
            </sbb-transparent-button>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
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
