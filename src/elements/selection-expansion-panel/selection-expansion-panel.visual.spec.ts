import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './selection-expansion-panel.js';
import '../card/card-badge.js';
import '../checkbox/checkbox-panel.js';
import '../checkbox/checkbox-group.js';
import '../form-error.js';
import '../icon.js';
import '../link/block-link-button.js';
import '../radio-button/radio-button-panel.js';
import '../radio-button/radio-button-group.js';

describe(`sbb-selection-expansion-panel`, () => {
  let root: HTMLElement;

  const cases = {
    borderless: [false, true],
    checked: [false, true],
    color: ['white', 'milk'],
    disabled: [false, true],
  };

  const inputPanelContent = (): TemplateResult => html`
    Value one
    <span slot="subtext">Subtext</span>
    <span slot="suffix" style="margin-inline-start: auto;">
      <span style="display: flex; align-items: center">
        <sbb-icon
          name="diamond-small"
          style="margin-inline: var(--sbb-spacing-fixed-2x);"
        ></sbb-icon>
        <span class="sbb-text-m sbb-text--bold">CHF 40.00</span>
      </span>
    </span>
    <sbb-card-badge>%</sbb-card-badge>
  `;

  const innerContent = (): TemplateResult => html`
    <div slot="content">
      Inner Content
      <sbb-block-link-button icon-name="chevron-small-right-small" icon-placement="end">
        Link
      </sbb-block-link-button>
    </div>
  `;

  type ParamsType = { [K in keyof typeof cases]: (typeof cases)[K][number] } & {
    forceOpen?: boolean;
    value?: string;
  };
  const withCheckboxPanel = (params: Partial<ParamsType>): TemplateResult => html`
    <sbb-selection-expansion-panel
      ?borderless=${params.borderless}
      color=${params.color || nothing}
      ?force-open=${params.forceOpen}
    >
      <sbb-checkbox-panel
        ?checked=${params.checked}
        ?disabled=${params.disabled}
        value=${params.value || nothing}
      >
        ${inputPanelContent()}
      </sbb-checkbox-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>
  `;

  const withRadioPanel = (params: Partial<ParamsType>): TemplateResult => html`
    <sbb-selection-expansion-panel
      ?borderless=${params.borderless}
      color=${params.color || nothing}
      ?force-open=${params.forceOpen}
    >
      <sbb-radio-button-panel
        ?checked=${params.checked}
        ?disabled=${params.disabled}
        value=${params.value || nothing}
      >
        ${inputPanelContent()}
      </sbb-radio-button-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const input of ['checkbox', 'radio']) {
      describe(`with ${input}`, () => {
        describeEach(cases, (params) => {
          beforeEach(async function () {
            root = await visualRegressionFixture(html`
              ${input === 'checkbox' ? withCheckboxPanel(params) : withRadioPanel(params)}
            `);
          });

          it(
            visualDiffDefault.name,
            visualDiffDefault.with((setup) => {
              setup.withSnapshotElement(root);
            }),
          );
        });

        for (const state of [visualDiffDefault, visualDiffFocus]) {
          it(
            `force-open ${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(html`
                ${input === 'checkbox'
                  ? withCheckboxPanel({ forceOpen: true })
                  : withRadioPanel({ forceOpen: true })}
              `);
            }),
          );
        }
      });

      it(
        `checkbox group with error`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-checkbox-group orientation="vertical" horizontal-from="medium">
              ${withCheckboxPanel({ checked: true })} ${withCheckboxPanel({})}
              ${withCheckboxPanel({})}
            </sbb-checkbox-group>
            <sbb-form-error slot="error">Error message</sbb-form-error>
          `);
        }),
      );

      it(
        `radio button group with error`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-radio-button-group orientation="vertical" horizontal-from="medium">
              ${withRadioPanel({ checked: true, value: '1' })} ${withRadioPanel({ value: '2' })}
              ${withRadioPanel({ value: '3' })}
            </sbb-radio-button-group>
            <sbb-form-error slot="error">Error message</sbb-form-error>
          `);
        }),
      );
    }
  });
});
