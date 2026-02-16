import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
  visualDiffDefault,
  visualDiffHover,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import '../../form-field.ts';
import './mini-button.component.ts';

describe(`sbb-mini-button`, () => {
  let root: HTMLElement;

  const basicCases = {
    disabled: [false, true],
    negative: [false, true],
  };

  const cases = {
    ...basicCases,
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const labelCases = {
    ...basicCases,
    hasIcon: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ disabled, negative, emulateMedia: { forcedColors, darkMode } }) => {
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
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            focusOutlineDark: negative,
            forcedColors,
            darkMode,
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
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
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
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-1-negative)'
                      : undefined,
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

    it(
      'small icon',
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-mini-button slot="suffix" icon-name="sa-fl"></sbb-mini-button>
        `);
      }),
    );

    it(
      'small icon slotted',
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-mini-button slot="suffix">
            <sbb-icon slot="icon" name="sa-fl"></sbb-icon>
          </sbb-mini-button>
        `);
      }),
    );
  });
});
