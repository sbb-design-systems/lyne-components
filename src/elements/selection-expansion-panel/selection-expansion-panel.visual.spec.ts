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

  const inputPanelContent = (size: 'm' | 's'): TemplateResult => html`
    Value one
    <span slot="subtext">Subtext</span>
    <span slot="suffix" style="margin-inline-start: auto; display: flex; align-items: center">
      <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
      <span class="sbb-text-${size} sbb-text--bold">CHF 40.00</span>
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
    size: 'm' | 's';
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
        size=${params.size || 'm'}
      >
        ${inputPanelContent(params.size || 'm')}
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
        size=${params.size || 'm'}
      >
        ${inputPanelContent(params.size || 'm')}
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

        it(
          `size=s`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              ${input === 'checkbox'
                ? withCheckboxPanel({ size: 's' })
                : withRadioPanel({ size: 's' })}
            `);
          }),
        );
      });

      describe('checkbox-group', () => {
        for (const size of ['m', 's'] as ('m' | 's')[]) {
          describe(`size=${size}`, () => {
            for (const error of [true, false]) {
              it(
                error ? `with error` : '',
                visualDiffDefault.with(async (setup) => {
                  await setup.withFixture(html`
                    <sbb-checkbox-group
                      orientation="vertical"
                      horizontal-from="medium"
                      size=${size}
                    >
                      ${withCheckboxPanel({ checked: true, size })} ${withCheckboxPanel({ size })}
                      ${withCheckboxPanel({ size })}
                    </sbb-checkbox-group>
                    ${error
                      ? html`<sbb-form-error slot="error">Error message</sbb-form-error>`
                      : nothing}
                  `);
                }),
              );
            }
          });
        }
      });

      describe('radio-button-group', () => {
        for (const size of ['m', 's'] as ('m' | 's')[]) {
          describe(`size=${size}`, () => {
            for (const error of [true, false]) {
              it(
                error ? `with error` : '',
                visualDiffDefault.with(async (setup) => {
                  await setup.withFixture(html`
                    <sbb-radio-button-group
                      orientation="vertical"
                      horizontal-from="medium"
                      size=${size}
                    >
                      ${withRadioPanel({ checked: true, value: '1', size })}
                      ${withRadioPanel({ value: '2', size })}
                      ${withRadioPanel({ value: '3', size })}
                    </sbb-radio-button-group>
                    ${error
                      ? html`<sbb-form-error slot="error">Error message</sbb-form-error>`
                      : nothing}
                  `);
                }),
              );
            }
          });
        }
      });
    }
  });
});
