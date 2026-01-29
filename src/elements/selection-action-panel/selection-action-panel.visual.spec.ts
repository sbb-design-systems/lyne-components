import { html, nothing, type TemplateResult } from 'lit';

import type { SbbCheckboxSize } from '../checkbox/common/checkbox-common.ts';
import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../core/testing/private.ts';

import './selection-action-panel.component.ts';
import '../button/secondary-button.ts';
import '../card/card-badge.ts';
import '../checkbox/checkbox-panel.ts';
import '../checkbox/checkbox-group.ts';
import '../icon.ts';
import '../link/block-link-button.ts';
import '../radio-button/radio-button-panel.ts';
import '../radio-button/radio-button-group.ts';
import '../selection-expansion-panel.ts';

describe(`sbb-selection-action-panel`, () => {
  const cases = {
    borderless: [false, true],
    checked: [false, true],
    color: ['white', 'milk'],
    disabled: [false, true],
  };

  type ParamsType = { [K in keyof typeof cases]: (typeof cases)[K][number] } & {
    value?: string;
    size: SbbCheckboxSize;
  };

  const withCheckboxPanel = (params: Partial<ParamsType>): TemplateResult => html`
    <sbb-selection-action-panel>
      <sbb-checkbox-panel
        ?checked=${params.checked}
        ?disabled=${params.disabled}
        value=${params.value || nothing}
        size=${params.size || 'm'}
        ?borderless=${params.borderless}
        color=${params.color || nothing}
      >
        Value ${params.value || nothing}
        <span slot="subtext">Subtext</span>
      </sbb-checkbox-panel>
      <sbb-secondary-button
        size=${!params.size || params.size === 'm' ? 'm' : 's'}
        ?disabled=${params.disabled}
        icon-name="arrow-right-small"
      >
      </sbb-secondary-button>
      <sbb-card-badge>%</sbb-card-badge>
    </sbb-selection-action-panel>
  `;

  const withRadioPanel = (params: Partial<ParamsType>): TemplateResult => html`
    <sbb-selection-action-panel>
      <sbb-radio-button-panel
        ?checked=${params.checked}
        ?disabled=${params.disabled}
        value=${params.value || nothing}
        size=${params.size || 'm'}
        ?borderless=${params.borderless}
        color=${params.color || nothing}
      >
        Value ${params.value || nothing}
        <span slot="subtext">Subtext</span>
      </sbb-radio-button-panel>
      <sbb-secondary-button
        size=${!params.size || params.size === 'm' ? 'm' : 's'}
        ?disabled=${params.disabled}
        icon-name="arrow-right-small"
      >
      </sbb-secondary-button>
      <sbb-card-badge>%</sbb-card-badge>
    </sbb-selection-action-panel>
  `;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const input of ['checkbox', 'radio']) {
      describe(`with ${input}`, () => {
        describeEach(cases, (params) => {
          it(
            visualDiffDefault.name,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                input === 'checkbox' ? withCheckboxPanel(params) : withRadioPanel(params),
              );
            }),
          );

          it(
            `expansion-panel ${visualDiffDefault.name}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-selection-expansion-panel>
                  ${input === 'checkbox' ? withCheckboxPanel(params) : withRadioPanel(params)}
                  <div slot="content">Inner Content</div>
                </sbb-selection-expansion-panel>
              `);
            }),
          );
        });

        it(
          visualDiffFocus.name,
          visualDiffFocus.with(async (setup) => {
            await setup.withFixture(
              input === 'checkbox' ? withCheckboxPanel({}) : withRadioPanel({}),
            );
          }),
        );

        it(
          `expansion-panel focus`,
          visualDiffFocus.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-selection-expansion-panel>
                ${input === 'checkbox'
                  ? withCheckboxPanel({ checked: true })
                  : withRadioPanel({ checked: true })}
                <div slot="content">Inner Content</div>
              </sbb-selection-expansion-panel>
            `);
          }),
        );

        it(
          `action focus`,
          visualDiffFocus.with(async (setup) => {
            await setup.withFixture(
              input === 'checkbox' ? withCheckboxPanel({}) : withRadioPanel({}),
            );
            setup.withStateElement(setup.snapshotElement.querySelector('sbb-secondary-button')!);
          }),
        );

        it(
          `size=xs`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              ${input === 'checkbox'
                ? withCheckboxPanel({ size: 'xs' })
                : withRadioPanel({ size: 'xs' })}
            `);
          }),
        );

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

        describeEach(
          {
            emulateMedia: [
              { forcedColors: false, darkMode: true },
              { forcedColors: true, darkMode: false },
              { forcedColors: true, darkMode: true },
            ],
          },
          ({ emulateMedia: { forcedColors, darkMode } }) => {
            it(
              visualDiffDefault.name,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  input === 'checkbox' ? withCheckboxPanel({}) : withRadioPanel({}),
                  {
                    darkMode,
                    forcedColors,
                  },
                );
              }),
            );
          },
        );
      });

      describe('checkbox-group', () => {
        for (const size of ['s', 'm'] as ('s' | 'm')[]) {
          it(
            `size=${size}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-checkbox-group orientation="vertical" horizontal-from="large" size=${size}>
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
                <sbb-radio-button-group orientation="vertical" horizontal-from="large" size=${size}>
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

  describeViewports({ viewports: ['large'] }, () => {
    const colorCases = {
      color: ['white', 'milk'],
    };

    describeEach(colorCases, (params) => {
      it(
        `darkMode=true`,
        visualDiffFocus.with(async (setup) => {
          await setup.withFixture(withCheckboxPanel(params), { darkMode: true });
        }),
      );
    });
  });
});
