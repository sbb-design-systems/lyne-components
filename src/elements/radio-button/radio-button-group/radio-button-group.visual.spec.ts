import { html, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import '../../card/card-badge.ts';
import '../../form-field/error.ts';
import '../../icon.ts';
import '../../radio-button.ts';

const cases = {
  disabled: [false, true],
  orientation: ['vertical', 'horizontal'],
  size: ['xs', 's', 'm'],
};

const suffixAndSubtext = (): TemplateResult => html`
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
    <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
    <span class="sbb-text-m sbb-text--bold">CHF 8.00</span>
  </span>
  <sbb-card-badge>%</sbb-card-badge>
`;

const radioButtons = (): TemplateResult => html`
  <sbb-radio-button value="Value one">Value one</sbb-radio-button>
  <sbb-radio-button value="Value two">Value two</sbb-radio-button>
  <sbb-radio-button value="Value three" disabled> Value three </sbb-radio-button>
  <sbb-radio-button value="Value four">Value four</sbb-radio-button>
`;

const radioButtonPanels = (): TemplateResult => html`
  <sbb-radio-button-panel value="Value one">Value 1 ${suffixAndSubtext()}</sbb-radio-button-panel>
  <sbb-radio-button-panel value="Value two">Value 2 ${suffixAndSubtext()}</sbb-radio-button-panel>
`;

const variants: { name: string; template: TemplateResult }[] = [
  { name: 'radio-button', template: radioButtons() },
  { name: 'radio-button-panel', template: radioButtonPanels() },
];

describe(`sbb-radio-button-group`, () => {
  describeViewports({ viewports: ['small', 'large'] }, () => {
    describeEach(cases, ({ orientation, size, disabled }) => {
      for (const variant of variants) {
        describe(variant.name, () => {
          for (const state of [visualDiffDefault, visualDiffFocus]) {
            if (!(disabled && state === visualDiffFocus)) {
              it(
                state.name,
                state.with(async (setup) => {
                  await setup.withFixture(html`
                    <sbb-radio-button-group
                      orientation=${orientation}
                      size=${size}
                      ?disabled=${disabled}
                      value="Value one"
                    >
                      ${variant.template}
                    </sbb-radio-button-group>
                  `);
                }),
              );
            }
          }
        });
      }
    });
    for (const variant of variants) {
      it(
        `allow-empty-selection=true with ${variant.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-radio-button-group allow-empty-selection>
              ${variant.template}
            </sbb-radio-button-group>`,
          );
        }),
      );
    }

    for (const variant of variants) {
      it(
        `horizontal-from=large with ${variant.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-radio-button-group orientation="vertical" horizontal-from="large">
              ${variant.template}
            </sbb-radio-button-group>`,
          );
        }),
      );
    }

    for (const variant of variants) {
      describe(variant.name, () => {
        for (const orientation of ['vertical', 'horizontal']) {
          it(
            `error message orientation=${orientation}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-radio-button-group allow-empty-selection orientation=${orientation}>
                  ${variant.template}
                  <sbb-error slot="error">This is a required field.</sbb-error>
                </sbb-radio-button-group>`,
              );
            }),
          );
        }
      });
    }

    it(
      `sbb-radio-button without label`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-radio-button-group
            ><sbb-radio-button></sbb-radio-button
          ></sbb-radio-button-group>`,
        );
      }),
    );
  });
});
