import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../../icon.ts';
import './icon-sidebar-button.component.ts';

describe(`sbb-icon-sidebar-button`, () => {
  let root: HTMLElement;

  const cases = {
    slottedIcon: [false, true],
    forcedColors: [false, true],
    currentPage: [false, true],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ slottedIcon, forcedColors, currentPage }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-icon-sidebar-button
              icon-name=${!slottedIcon ? 'glass-cocktail-small' : nothing}
              class=${currentPage ? 'sbb-active' : nothing}
              style="width: var(--sbb-size-element-m)"
            >
              ${slottedIcon
                ? html`<sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>`
                : nothing}
            </sbb-icon-sidebar-button>
          `,
          { forcedColors },
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

  describeViewports({ viewports: ['zero'] }, () => {
    describe('darkMode=true', () => {
      describeEach({ currentPage: [false, true] }, ({ currentPage }) => {
        for (const state of visualDiffStandardStates) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-icon-sidebar-button
                    icon-name="glass-cocktail-small"
                    class=${currentPage ? 'sbb-active' : nothing}
                    style="width: var(--sbb-size-element-m)"
                  >
                  </sbb-icon-sidebar-button>
                `,
                { darkMode: true },
              );
            }),
          );
        }
      });
    });
  });
});
