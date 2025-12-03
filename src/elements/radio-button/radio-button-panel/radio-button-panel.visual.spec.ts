import { html, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import type { SbbRadioButtonSize } from '../common/radio-button-common.ts';

import '../../icon.ts';
import '../radio-button-panel.ts';

const cases: { checked: boolean[]; disabled: boolean[]; size: SbbRadioButtonSize[] } = {
  checked: [true, false],
  disabled: [false, true],
  size: ['xs', 's', 'm'],
};

const suffixAndSubtext = (size: SbbRadioButtonSize = 'm'): TemplateResult =>
  html`<span slot="subtext">Subtext</span>
    <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
      <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
      <span class="sbb-text-${size} sbb-text--bold">CHF 40.00</span>
    </span>`;

describe(`sbb-radio-button-panel`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ checked, disabled, size }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-radio-button-panel ?checked=${checked} ?disabled=${disabled} size=${size}>
              Value ${suffixAndSubtext(size)}
            </sbb-radio-button-panel>
          `);
        }),
      );
    });

    it(
      `darkMode=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-radio-button-panel>Value ${suffixAndSubtext()}</sbb-radio-button-panel>`,
          { darkMode: true },
        );
      }),
    );

    for (const darkMode of [false, true]) {
      it(
        `color=milk darkMode=${darkMode}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-radio-button-panel checked color="milk">
                Value ${suffixAndSubtext()}
              </sbb-radio-button-panel>
            `,
            { darkMode },
          );
        }),
      );
    }

    for (const color of ['white', 'milk']) {
      it(
        `color=${color} borderless=true`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-radio-button-panel borderless color=${color}>
              Value ${suffixAndSubtext()}
            </sbb-radio-button-panel>
          `);
        }),
      );
    }

    it(
      `forcedColors=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-radio-button-panel>Value ${suffixAndSubtext()}</sbb-radio-button-panel>`,
          { forcedColors: true },
        );
      }),
    );

    // Focus state is tested in the radio-button-group
  });
});
