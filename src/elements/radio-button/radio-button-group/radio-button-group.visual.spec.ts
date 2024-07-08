import { html, type TemplateResult } from 'lit';
import { styleMap, type StyleInfo } from 'lit/directives/style-map.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import '../../card/card-badge.js';
import '../../form-error.js';
import '../../icon.js';
import '../../radio-button.js';

const cases = {
  disabled: [false, true],
  orientation: ['vertical', 'horizontal'],
  size: ['m', 's'],
};

const suffixStyle: Readonly<StyleInfo> = {
  display: 'flex',
  alignItems: 'center',
  marginInline: 'var(--sbb-spacing-fixed-2x)',
};

const suffixAndSubtext = (): TemplateResult => html`
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style="margin-inline-start: auto;">
    <span style=${styleMap(suffixStyle)}>
      <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
      <span class="sbb-text-m sbb-text--bold">CHF 8.00</span>
    </span>
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
  describeViewports({ viewports: ['small', 'medium'] }, () => {
    describeEach(cases, ({ orientation, size, disabled }) => {
      for (const variant of variants) {
        for (const state of [visualDiffDefault, visualDiffFocus]) {
          (disabled && state === visualDiffFocus ? it.skip : it)(
            `${variant.name} ${state.name}`,
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

    for (const variant of ['vertical', 'horizontal']) {
      it(
        `error message ${variant}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-radio-button-group allow-empty-selection orientation=${variant}>
              ${variants[0].template}
              <sbb-form-error slot="error">This is a required field.</sbb-form-error>
            </sbb-radio-button-group>`,
          );
        }),
      );
    }
  });
});
