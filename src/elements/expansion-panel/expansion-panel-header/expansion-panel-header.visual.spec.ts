import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './expansion-panel-header.js';
import '../../icon.js';

describe(`sbb-expansion-panel-header`, () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    state: [
      { icon: undefined, slotted: false },
      { icon: 'arrow-right-small', slotted: true },
      { icon: 'arrow-right-small', slotted: false },
    ],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ disabled, state }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-expansion-panel-header
            ?disabled=${disabled}
            .iconName=${!state.slotted ? state.icon : undefined}
          >
            ${state.slotted ? html`<sbb-icon name=${state.icon!}></sbb-icon>` : nothing} Label
          </sbb-expansion-panel-header>
        `);
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
