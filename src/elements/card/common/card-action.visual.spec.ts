import { nothing } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../../title.ts';
import '../card.ts';
import '../card-badge.ts';

export function cardActionVisualSpec(component: string): void {
  describe(component, () => {
    let root: HTMLElement;

    const cases = {
      active: [false, true],
      badge: [false, true],
      color: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
      emulateMedia: [
        { forcedColors: false, darkMode: false },
        { forcedColors: true, darkMode: false },
        { forcedColors: false, darkMode: true },
      ],
    };

    describeViewports({ viewports: ['large'] }, () => {
      // Main test cases
      describeEach(cases, ({ active, color, badge, emulateMedia: { forcedColors, darkMode } }) => {
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
                color === 'milk'
                  ? 'var(--sbb-background-color-1)'
                  : 'var(--sbb-background-color-3)',
              forcedColors,
              darkMode,
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
