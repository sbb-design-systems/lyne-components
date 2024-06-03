import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  testVisualDiff,
  testVisualDiffHover,
  visualRegressionFixture,
  visualRegressionSnapshot,
} from '../../core/testing/private.js';

import './button.js';

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
  };

  // 'l' as default is covered by other cases.
  const sizeCases = { size: ['s', 'm'], icon: [undefined, 'arrow-right-small'] };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ disabled, negative, state }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-button ?disabled=${disabled} ?negative=${negative} .iconName=${state.icon}>
              ${state.text}
            </sbb-button>
          `,
          this,
          {
            backgroundColor: negative ? '#484040' : undefined,
            focusOutlineDark: negative,
          },
        );
      });

      visualRegressionSnapshot(() => root);
    });

    describeEach(sizeCases, ({ size, icon }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-button size=${size} .iconName=${icon}>Button</sbb-button>`,
          this,
        );
      });

      testVisualDiff(() => root);
    });

    describe('with ellipsis', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-button style="width: 200px;" icon-name="arrow-right-small">
              Button with long text
            </sbb-button>
          `,
          this,
        );
      });

      testVisualDiff(() => root);
    });

    describe('wide width', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-button style="max-width: 100%; width: 600px;" icon-name="arrow-right-small">
              Wide Button
            </sbb-button>
          `,
          this,
        );
      });

      testVisualDiff(() => root);
    });

    describe('slotted icon', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-button>
              Button
              <sbb-icon slot="icon" name="chevron-small-right-small"></sbb-icon>
            </sbb-button>
          `,
          this,
        );
      });

      testVisualDiff(() => root);
      testVisualDiffHover(() => root);
    });

    describe('with hidden slot', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-button>
              Button
              <sbb-icon
                slot="icon"
                name="chevron-small-right-small"
                style="display: none;"
              ></sbb-icon>
            </sbb-button>
          `,
          this,
        );
      });

      testVisualDiff(() => root);
    });
  });
});
