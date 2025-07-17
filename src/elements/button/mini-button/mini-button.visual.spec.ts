import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.js';

import '../../form-field.js';
import './mini-button.component.js';

describe(`sbb-mini-button`, () => {
  let root: HTMLElement;

  const basicCases = {
    disabled: [false, true],
    negative: [false, true],
  };

  const cases = {
    ...basicCases,
    forcedColors: [false, true],
  };

  const labelCases = {
    ...basicCases,
    hasIcon: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ disabled, negative, forcedColors }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-form-field ?negative=${negative}>
              <label>Mini Button Demo</label>
              <sbb-mini-button
                icon-name="dog-small"
                slot="prefix"
                ?disabled=${disabled}
              ></sbb-mini-button>
              <input placeholder="Placeholder" ?disabled=${disabled} />
            </sbb-form-field>
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
            setup.withStateElement(root.querySelector('sbb-mini-button')!);
          }),
        );
      }
    });

    describe('with label', () => {
      describeEach(labelCases, ({ disabled, negative, hasIcon }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`<sbb-mini-button
              ?negative=${negative}
              ?disabled=${disabled}
              icon-name=${hasIcon ? 'dog-small' : nothing}
              >Mini Button Demo</sbb-mini-button
            >`,
            {
              backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
              focusOutlineDark: negative,
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

    describe(`disabledInteractive`, () => {
      for (const negative of [false, true]) {
        describe(`negative=${negative}`, () => {
          for (const state of visualDiffStandardStates) {
            it(
              `${state.name}`,
              state.with(async (setup) => {
                await setup.withFixture(
                  html`
                    <sbb-form-field ?negative=${negative}>
                      <label>Mini Button Demo</label>
                      <sbb-mini-button
                        icon-name="dog-small"
                        slot="prefix"
                        disabled-interactive
                      ></sbb-mini-button>
                      <input placeholder="Placeholder" />
                    </sbb-form-field>
                  `,
                  {
                    backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
                    focusOutlineDark: negative,
                  },
                );
                setup.withStateElement(setup.snapshotElement.querySelector('sbb-mini-button')!);
              }),
            );
          }
        });
      }
    });

    describe('slotted icon', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-form-field>
            <label>Mini Button Demo</label>
            <input placeholder="Placeholder" />
            <sbb-mini-button slot="suffix">
              <sbb-icon slot="icon" name="user-small"></sbb-icon>
            </sbb-mini-button>
          </sbb-form-field>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
          setup.withStateElement(root.querySelector('sbb-mini-button')!);
        }),
      );

      it(
        visualDiffHover.name,
        visualDiffHover.with((setup) => {
          setup.withSnapshotElement(root);
          setup.withStateElement(root.querySelector('sbb-mini-button')!);
        }),
      );
    });
  });
});
