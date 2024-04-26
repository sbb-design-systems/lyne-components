import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  fixture,
  isVisualRegressionRun,
  visualRegressionSnapshot,
} from '../../core/testing/private.js';
import type { SbbButtonSize } from '../common.js';

import './button.js';

describe(`sbb-button`, () => {
  if (isVisualRegressionRun()) {
    describe('visual-regression', () => {
      const cases = {
        size: ['s', 'm', 'l'] as SbbButtonSize[],
        disabled: [false, true],
        negative: [false, true],
        iconName: [undefined, 'arrow-right-small'],
      };

      describeViewports(() => {
        describeEach(cases, ({ size, disabled, negative, iconName }) => {
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
                  size=${size}
                  ?disabled=${disabled}
                  ?negative=${negative}
                  .iconName=${iconName}
                  >Button</sbb-button
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
