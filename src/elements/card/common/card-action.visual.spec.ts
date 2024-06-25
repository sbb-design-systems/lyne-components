import { nothing } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../../title.js';
import '../card.js';
import '../card-badge.js';

export function cardActionVisualSpec(component: string): void {
  describe(component, () => {
    let root: HTMLElement;

    const cases = {
      active: [false, true],
      badge: [false, true],
      color: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
    };

    describeViewports({ viewports: ['medium'] }, () => {
      // Main test cases
      describeEach(cases, ({ active, color, badge }) => {
        beforeEach(async function () {
          /* eslint-disable lit/binding-positions */
          root = await visualRegressionFixture(
            html`
              <sbb-card color=${color}>
                <${unsafeStatic(component)} ?active=${active}>
                </${unsafeStatic(component)}>

                <sbb-title level="4">Example text</sbb-title>
                <span class="sbb-text-m">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. justo.
                </span>

                ${
                  badge
                    ? html`
                        <sbb-card-badge>
                          <span>% from CHF 19.99</span>
                        </sbb-card-badge>
                      `
                    : nothing
                }
              </sbb-card>
            `,
            {
              backgroundColor:
                color === 'milk' ? 'var(--sbb-color-white)' : 'var(--sbb-color-milk)',
            },
          );
          /* eslint-enable lit/binding-positions */
        });

        for (const state of [visualDiffDefault, visualDiffFocus, visualDiffHover]) {
          it(
            state.name,
            state.with((setup) => {
              setup.withSnapshotElement(root);
            }),
          );
        }
      });
    });
  });
}
