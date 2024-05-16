import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  fixture,
  isVisualRegressionRun,
  testVisualDiff,
  testVisualDiffHover,
  visualRegressionSnapshot,
  visualRegressionWrapperStyles,
} from '../../core/testing/private.js';

import './button.js';

describe(`sbb-button`, () => {
  if (isVisualRegressionRun()) {
    describe('visual-regression', () => {
      let root: HTMLElement;

      const cases = {
        disabled: [false, true],
        negative: [false, true],
        state: [
          { icon: undefined, text: 'Button' },
          { icon: 'arrow-right-small', text: 'Button' },
          { icon: 'arrow-right-small', text: '' },
        ],
      };

      // 'l' as default is covered by other cases.
      const sizeCases = { size: ['s', 'm'] };

      describeViewports({ viewports: ['zero', 'medium'] }, () => {
        describeEach(cases, ({ disabled, negative, state }) => {
          beforeEach(async () => {
            root = await fixture(
              html`<div
                style=${visualRegressionWrapperStyles({
                  backgroundColor: negative ? '#484040' : undefined,
                })}
              >
                <sbb-button ?disabled=${disabled} ?negative=${negative} .iconName=${state.icon}>
                  ${state.text}
                </sbb-button>
              </div>`,
            );
          });

          visualRegressionSnapshot(() => root);
        });

        describeEach(sizeCases, ({ size }) => {
          beforeEach(async () => {
            root = await fixture(
              html`<div style=${visualRegressionWrapperStyles()}>
                <sbb-button size=${size}>Button</sbb-button>
              </div>`,
            );
          });

          testVisualDiff(() => root);
        });

        describe('with ellipsis', () => {
          beforeEach(async () => {
            root = await fixture(
              html`<div style=${visualRegressionWrapperStyles()}>
                <sbb-button style="width: 200px;" icon-name="arrow-right-small">
                  Button with long text
                </sbb-button>
              </div>`,
            );
          });

          testVisualDiff(() => root);
        });

        describe('wide width', () => {
          beforeEach(async () => {
            root = await fixture(
              html`<div style=${visualRegressionWrapperStyles()}>
                <sbb-button style="max-width: 100%; width: 600px;" icon-name="arrow-right-small">
                  Wide Button
                </sbb-button>
              </div>`,
            );
          });

          testVisualDiff(() => root);
        });

        describe('slotted icon', () => {
          beforeEach(async () => {
            root = await fixture(
              html`<div style=${visualRegressionWrapperStyles()}>
                <sbb-button>
                  Button
                  <sbb-icon slot="icon" name="chevron-small-right-small"></sbb-icon>
                </sbb-button>
              </div>`,
            );
          });

          testVisualDiff(() => root);
          testVisualDiffHover(() => root);
        });

        describe('with hidden slot', () => {
          beforeEach(async () => {
            root = await fixture(
              html`<div style=${visualRegressionWrapperStyles()}>
                <sbb-button>
                  Button
                  <sbb-icon
                    slot="icon"
                    name="chevron-small-right-small"
                    style="display: none;"
                  ></sbb-icon>
                </sbb-button>
              </div>`,
            );
          });

          testVisualDiff(() => root);
        });
      });
    });
  }
});
