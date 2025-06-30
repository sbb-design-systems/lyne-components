import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './selection-action-panel.component.js';
import '../button/secondary-button.js';
import '../card/card-badge.js';
import '../checkbox/checkbox-panel.js';
import '../checkbox/checkbox-group.js';
import '../icon.js';
import '../link/block-link-button.js';
import '../radio-button/radio-button-panel.js';
import '../radio-button/radio-button-group.js';

describe(`sbb-selection-action-panel`, () => {
  let root: HTMLElement;

  const cases = {
    borderless: [false, true],
    checked: [false, true],
    color: ['white', 'milk'],
    disabled: [false, true],
  };

  type ParamsType = { [K in keyof typeof cases]: (typeof cases)[K][number] } & {
    value?: string;
    size: 's' | 'm';
  };
  const withCheckboxPanel = (params: Partial<ParamsType>): TemplateResult => html`
    <sbb-selection-action-panel ?borderless=${params.borderless} color=${params.color || nothing}>
      <sbb-checkbox-panel
        ?checked=${params.checked}
        ?disabled=${params.disabled}
        value=${params.value || nothing}
        size=${params.size || 'm'}
      >
        Value ${params.value || nothing}
        <span slot="subtext">Subtext</span>
      </sbb-checkbox-panel>
      <sbb-secondary-button
        size=${params.size || 'm'}
        ?disabled=${params.disabled}
        icon-name="arrow-right-small"
      >
      </sbb-secondary-button>
      <sbb-card-badge>%</sbb-card-badge>
    </sbb-selection-action-panel>
  `;

  const withRadioPanel = (params: Partial<ParamsType>): TemplateResult => html`
    <sbb-selection-action-panel ?borderless=${params.borderless} color=${params.color || nothing}>
      <sbb-radio-button-panel
        ?checked=${params.checked}
        ?disabled=${params.disabled}
        value=${params.value || nothing}
        size=${params.size || 'm'}
      >
        Value ${params.value || nothing}
        <span slot="subtext">Subtext</span>
      </sbb-radio-button-panel>
      <sbb-secondary-button
        size=${params.size || 'm'}
        ?disabled=${params.disabled}
        icon-name="arrow-right-small"
      >
      </sbb-secondary-button>
      <sbb-card-badge>%</sbb-card-badge>
    </sbb-selection-action-panel>
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

          for (const state of [visualDiffDefault, visualDiffFocus]) {
            it(
              state.name,
              state.with((setup) => {
                setup.withSnapshotElement(root);
              }),
            );
          }

          it(
            `action ${visualDiffFocus.name}`,
            visualDiffFocus.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(root.querySelector('sbb-secondary-button')!);
            }),
          );
        });

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
        for (const size of ['s', 'm'] as ('s' | 'm')[]) {
          it(
            `size=${size}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-checkbox-group orientation="vertical" horizontal-from="medium" size=${size}>
                  ${withCheckboxPanel({ checked: true, size })} ${withCheckboxPanel({ size })}
                  ${withCheckboxPanel({ size })}
                </sbb-checkbox-group>
              `);
            }),
          );
        }
      });

      describe('radio-button-group', () => {
        for (const size of ['s', 'm'] as ('s' | 'm')[]) {
          it(
            `size=${size}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-radio-button-group
                  orientation="vertical"
                  horizontal-from="medium"
                  size=${size}
                >
                  ${withRadioPanel({ checked: true, value: '1', size })}
                  ${withRadioPanel({ value: '2', size })} ${withRadioPanel({ value: '3', size })}
                </sbb-radio-button-group>
              `);
            }),
          );
        }
      });
    }
  });
});
