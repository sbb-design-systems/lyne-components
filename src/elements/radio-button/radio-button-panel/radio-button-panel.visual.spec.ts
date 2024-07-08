import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../../icon.js';
import '../radio-button-panel.js';

const cases = {
  checked: [true, false],
  disabled: [false, true],
  size: ['m', 's'],
};

describe(`sbb-radio-button-panel`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ checked, disabled, size }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-radio-button-panel ?checked=${checked} ?disabled=${disabled} size=${size}>
              Value
              <span slot="subtext">Subtext</span>
              <span slot="suffix" style="margin-inline-start: auto;">
                <span style="display:flex;align-items:center;">
                  <sbb-icon
                    name="diamond-small"
                    style="margin-inline: var(--sbb-spacing-fixed-2x);"
                    data-namespace="default"
                    role="img"
                    aria-hidden="true"
                  ></sbb-icon>
                  <span class="sbb-text-${size} sbb-text--bold"> CHF 40.00 </span>
                </span>
              </span>
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
            Value
            <span slot="subtext">Subtext</span>
            <span slot="suffix" style="margin-inline-start: auto;">
              <span style="display:flex;align-items:center;">
                <sbb-icon
                  name="diamond-small"
                  style="margin-inline: var(--sbb-spacing-fixed-2x);"
                  data-namespace="default"
                  role="img"
                  aria-hidden="true"
                ></sbb-icon>
                <span class="sbb-text-m sbb-text--bold"> CHF 40.00 </span>
              </span>
            </span>
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
              Value
              <span slot="subtext">Subtext</span>
              <span slot="suffix" style="margin-inline-start: auto;">
                <span style="display:flex;align-items:center;">
                  <sbb-icon
                    name="diamond-small"
                    style="margin-inline: var(--sbb-spacing-fixed-2x);"
                  ></sbb-icon>
                  <span class="sbb-text-m sbb-text--bold"> CHF 40.00 </span>
                </span>
              </span>
            </sbb-radio-button-panel>
          `);
        }),
      );
    }

    it(
      'with bold label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-radio-button-panel>
            <span class="sbb-text--bold">Value</span>
            <span slot="subtext">Subtext</span>
            <span slot="suffix" style="margin-inline-start: auto;">
              <span style="display:flex;align-items:center;">
                <sbb-icon
                  name="diamond-small"
                  style="margin-inline: var(--sbb-spacing-fixed-2x);"
                  data-namespace="default"
                  role="img"
                  aria-hidden="true"
                ></sbb-icon>
                <span class="sbb-text-m sbb-text--bold"> CHF 40.00 </span>
              </span>
            </span>
          </sbb-radio-button-panel>`,
        );
      }),
    );
    // Focus state is tested in the radio-button-group
  });
});
