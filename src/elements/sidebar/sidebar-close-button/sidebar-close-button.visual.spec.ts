import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import './sidebar-close-button.component.ts';

// We test only states which are expected to be used
describe(`sbb-sidebar-close-button`, () => {
  let root: HTMLElement;

  const cases = {
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-sidebar-close-button></sbb-sidebar-close-button>`,
          {
            forcedColors,
            minHeight: '100px',
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
