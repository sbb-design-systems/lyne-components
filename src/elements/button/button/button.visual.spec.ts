import { html } from 'lit';

import { isWebkit } from '../../core/dom/platform.ts';
import { ɵstateController } from '../../core/mixins/element-internals-mixin.ts';
import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import './button.component.ts';

describe(`sbb-button`, () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    negative: [false, true],
    state: [
      { icon: undefined, text: 'Button' },
      { icon: 'arrow-right-small', text: 'Button' },
      { icon: 'arrow-right-small', text: '' },
    ],
    darkMode: [false, true],
  };

  // 'l' as default is covered by other cases.
  const sizeCases = { size: ['s', 'm'], icon: [undefined, 'arrow-right-small'] };

  const forcedColorCases = {
    disabled: [false, true],
    negative: [false, true],
  };

  const loadingCases = {
    negative: [false, true],
    darkMode: [false, true],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ disabled, negative, state, darkMode }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-button ?disabled=${disabled} ?negative=${negative} .iconName=${state.icon}
              >${state.text}</sbb-button
            >
          `,
          {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            focusOutlineDark: negative,
            darkMode,
          },
        );
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);

            setup.withPostSetupAction(() => {
              // Webkit has problems to render the :active state, we help by manually set the state.
              // TODO: re-check whether this is still needed in the future.
              if (isWebkit && state === visualDiffActive) {
                ɵstateController(setup.stateElement)?.add('active');
              }
            });
          }),
        );
      }
    });

    describe('loading', () => {
      describeEach(loadingCases, ({ negative, darkMode }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html` <sbb-button loading ?negative=${negative}>Loading Button</sbb-button> `,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              focusOutlineDark: negative,
              darkMode,
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

    describeEach(sizeCases, ({ size, icon }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-button size=${size} .iconName=${icon}>Button</sbb-button>`,
          );
        }),
      );
    });

    describe(`disabledInteractive`, () => {
      for (const negative of [false, true]) {
        describe(`negative=${negative}`, () => {
          for (const state of visualDiffStandardStates) {
            it(
              `${state.name}`,
              state.with(async (setup) => {
                await setup.withFixture(
                  html`<sbb-button disabled-interactive ?negative=${negative}>Button</sbb-button>`,
                  {
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-1-negative)'
                      : undefined,
                    focusOutlineDark: negative,
                  },
                );
              }),
            );
          }
        });
      }
    });

    describe('forcedColors=true', () => {
      describeEach(forcedColorCases, ({ disabled, negative }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
              <sbb-button ?disabled=${disabled} ?negative=${negative} icon-name="arrow-right-small">
                Button
              </sbb-button>
            `,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
              focusOutlineDark: negative,
              forcedColors: true,
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

    it(
      'with ellipsis',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-button style="width: 200px;" icon-name="arrow-right-small">
            Button with long text
          </sbb-button>
        `);
      }),
    );

    it(
      'wide width',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-button style="max-width: 100%; width: 600px;" icon-name="arrow-right-small">
            Wide Button
          </sbb-button>
        `);
      }),
    );

    describe('slotted icon', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-button>
            Button
            <sbb-icon slot="icon" name="chevron-small-right-small"></sbb-icon>
          </sbb-button>
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
        }),
      );
    });

    it(
      'with hidden slot',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-button>
            Button
            <sbb-icon
              slot="icon"
              name="chevron-small-right-small"
              style="display: none;"
            ></sbb-icon>
          </sbb-button>
        `);
      }),
    );

    it(
      'hover with other content',
      visualDiffHover.with(async (setup) => {
        await setup.withFixture(html`<sbb-button>Button</sbb-button>Other content`);
      }),
    );
  });
});
