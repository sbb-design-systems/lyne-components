import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../../title.js';
import '../card-badge.js';
import './card.js';

describe(`sbb-card`, () => {
  let root: HTMLElement;

  const cases = {
    color: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
    badge: ['none', 'charcoal', 'white'],
  };

  const sizeCases = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    // Main test cases
    describeEach(cases, ({ color, badge }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-card color=${color}>
              <sbb-title level="4">Example text</sbb-title>
              <span class="sbb-text-m">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. justo.
              </span>

              ${badge !== 'none'
                ? html`
                    <sbb-card-badge color=${badge}>
                      <span>% from CHF 19.99</span>
                    </sbb-card-badge>
                  `
                : nothing}
            </sbb-card>
          `,
          {
            backgroundColor: color === 'milk' ? 'var(--sbb-color-white)' : 'var(--sbb-color-milk)',
          },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    // Size test cases
    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-card size=${size}>
                <span class="sbb-text-m">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. justo.
                </span>

                <sbb-card-badge>
                  <span>% from CHF 19.99</span>
                </sbb-card-badge>
              </sbb-card>
            `,
            { backgroundColor: 'var(--sbb-color-milk)' },
          );
        }),
      );
    }
  });
});
