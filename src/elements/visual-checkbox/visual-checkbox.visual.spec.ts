import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './visual-checkbox.js';

describe(`sbb-visual-checkbox`, () => {
  const states = [
    { indeterminate: undefined, checked: true },
    { indeterminate: undefined, checked: false },
    { indeterminate: true, checked: true },
  ];

  const visualStates = {
    disabled: [false, true],
    negative: [false, true],
    forcedColors: [false, true],
  };

  const size = ['xs', 's', 'm'];

  describeViewports({ viewports: ['zero'] }, () => {
    let root: HTMLElement;

    describeEach({ states, ...visualStates }, ({ states, disabled, negative, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-visual-checkbox
            ?indeterminate=${states.indeterminate}
            ?checked=${states.checked}
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

    describeEach({ states, size }, ({ states, size }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-visual-checkbox
            ?indeterminate=${states.indeterminate}
            ?checked=${states.checked}
            size=${size}
          ></sbb-visual-checkbox>`,
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
