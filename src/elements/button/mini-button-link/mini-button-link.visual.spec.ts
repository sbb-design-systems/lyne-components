import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.ts';

import '../../form-field.ts';
import './mini-button-link.component.ts';

describe(`sbb-mini-button-link`, () => {
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
              <sbb-mini-button-link
                href="#"
                icon-name="dog-small"
                slot="prefix"
                ?disabled=${disabled}
              ></sbb-mini-button-link>
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
            setup.withStateElement(root.querySelector('sbb-mini-button-link')!);
          }),
        );
      }
    });

    describe('with label', () => {
      describeEach(labelCases, ({ disabled, negative, hasIcon }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`<sbb-mini-button-link
              href="#"
              ?negative=${negative}
              ?disabled=${disabled}
              icon-name=${hasIcon ? 'dog-small' : nothing}
              >Mini Button Demo</sbb-mini-button-link
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
                      <sbb-mini-button-link
                        href="#"
                        icon-name="dog-small"
                        slot="prefix"
                        disabled-interactive
                      ></sbb-mini-button-link>
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
                setup.withStateElement(
                  setup.snapshotElement.querySelector('sbb-mini-button-link')!,
                );
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
            <sbb-mini-button-link slot="suffix" href="#">
              <sbb-icon slot="icon" name="user-small"></sbb-icon>
            </sbb-mini-button-link>
          </sbb-form-field>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
          setup.withStateElement(root.querySelector('sbb-mini-button-link')!);
        }),
      );

      it(
        visualDiffHover.name,
        visualDiffHover.with((setup) => {
          setup.withSnapshotElement(root);
          setup.withStateElement(root.querySelector('sbb-mini-button-link')!);
        }),
      );
    });
  });
});
