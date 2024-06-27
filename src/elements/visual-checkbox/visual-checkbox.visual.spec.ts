import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './visual-checkbox.js';

describe(`sbb-visual-checkbox`, () => {
  const cases = {
    state: [
      { indeterminate: undefined, checked: true },
      { indeterminate: undefined, checked: false },
      { indeterminate: true, checked: true },
    ],
    disabled: [false, true],
    negative: [false, true],
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    let root: HTMLElement;

    describeEach(cases, ({ state, disabled, negative, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-visual-checkbox
            ?indeterminate=${state.indeterminate}
            ?checked=${state.checked}
            ?disabled=${disabled}
            ?negative=${negative}
          ></sbb-visual-checkbox>`,
          {
            forcedColors,
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
          },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
