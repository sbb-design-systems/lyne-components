import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import './button-link.component.ts';

// We test only the differences to the sbb-button
describe(`sbb-button-link`, () => {
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
            <sbb-button-link
              ?disabled=${disabled}
              ?negative=${negative}
              icon-name="arrow-right-small"
              href="#"
            >
              Button
            </sbb-button-link>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
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
