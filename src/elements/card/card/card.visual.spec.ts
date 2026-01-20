import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../../title.ts';
import '../card-badge.ts';
import './card.component.ts';

describe(`sbb-card`, () => {
  let root: HTMLElement;

  const cases = {
    color: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
    badge: ['none', 'charcoal', 'white'],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const spacingCases = {
    spacing: ['3x-xxs', 'xxxs-xxs', 'xxxs-s', '4x-xxs', 'xxs', 's', 'l'],
    badge: ['none', 'charcoal'],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    // Main test cases
    describeEach(cases, ({ color, badge, emulateMedia: { forcedColors, darkMode } }) => {
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
            backgroundColor:
              color === 'milk' ? 'var(--sbb-background-color-1)' : 'var(--sbb-background-color-3)',
            forcedColors,
            darkMode,
          },
        );
      });

      it(
        '',
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    // Spacing test cases
    describeEach(spacingCases, ({ spacing, badge }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-card class=${`sbb-card-spacing-${spacing}`}>
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
            backgroundColor: 'var(--sbb-background-color-3)',
          },
        );
      });

      it(
        '',
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    it(
      'fixed height',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-card style="height: 250px;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. justo.
            </sbb-card>
          `,
          { backgroundColor: 'var(--sbb-background-color-3)' },
        );
      }),
    );

    it(
      'nested',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-card color="milk" class="sbb-card-spacing-l">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
            <sbb-card> Nested lorem ipsum dolor sit amet, consectetur adipiscing elit. </sbb-card>
          </sbb-card>
        `);
      }),
    );
  });
});
