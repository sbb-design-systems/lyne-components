import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  fixture,
  isVisualRegressionRun,
  visualRegressionSnapshot,
} from '../../core/testing/private.js';

import './button.js';

describe(`sbb-button`, () => {
  if (isVisualRegressionRun()) {
    describe('visual-regression', () => {
      const cases = {
        disabled: [false, true],
        negative: [false, true],
        state: [
          { icon: undefined, text: 'Button' },
          { icon: 'arrow-right-small', text: 'Button' },
          { icon: 'arrow-right-small', text: '' },
        ],
      };

      describeViewports({ viewports: ['zero', 'medium'] }, () => {
        describeEach(cases, ({ disabled, negative, state }) => {
          let root: HTMLElement;
          beforeEach(async () => {
            root = await fixture(html`
              <div
                style="padding:0.5rem;background-color:${negative
                  ? '#484040'
                  : 'var(--sbb-color-white)'}"
              >
                <sbb-button
                  style="--sbb-button-transition-duration:0s;--sbb-button-transition-easing-function:0s;"
                  ?disabled=${disabled}
                  ?negative=${negative}
                  .iconName=${state.icon}
                  >${state.text}</sbb-button
                >
              </div>
            `);
          });

          visualRegressionSnapshot(() => root);
        });
      });
    });
  }
});
