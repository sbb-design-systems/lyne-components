import { html, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../../icon.js';
import '../radio-button-panel.js';

const cases = {
  checked: [true, false],
  disabled: [false, true],
  size: ['m', 's'],
};

const suffixAndSubtext = (size: 's' | 'm' = 'm'): TemplateResult =>
  html`<span slot="subtext">Subtext</span>
    <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
      <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
      <span class="sbb-text-${size} sbb-text--bold"> CHF 40.00 </span>
    </span>`;

describe(`sbb-radio-button-panel`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ checked, disabled, size }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-radio-button-panel ?checked=${checked} ?disabled=${disabled} size=${size}>
              Value ${suffixAndSubtext(size as 's' | 'm')}
            </sbb-radio-button-panel>
          `);
        }),
      );
    });

    it(
      'color=milk',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-radio-button-panel checked color="milk">
            Value ${suffixAndSubtext()}
          </sbb-radio-button-panel>
        `);
      }),
    );

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
    // Focus state is tested in the radio-button-group
  });
});
