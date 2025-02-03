import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../../icon.js';
import './icon-sidebar-button.js';

describe(`sbb-icon-sidebar-button`, () => {
  let root: HTMLElement;

  const cases = { slottedIcon: [false, true], forcedColors: [false, true] };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ slottedIcon, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          slottedIcon
            ? html`
                <sbb-icon-sidebar-button>
                  <sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>
                </sbb-icon-sidebar-button>
              `
            : html`
                <sbb-icon-sidebar-button icon-name="glass-cocktail-small"></sbb-icon-sidebar-button>
              `,
          {
            forcedColors: forcedColors,
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
