import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../core/testing/private.ts';

import './time-input.component.ts';
import '../form-field.ts';
import '../icon.ts';

describe(`sbb-time-input`, () => {
  const cases = {
    negative: [false, true],
    withError: [false, true],
    forcedColors: [false, true],
  };

  const sizeCases = {
    size: ['s', 'm', 'l'],
    noIcons: [false, true],
  };

  type ParamsType = { [K in keyof typeof cases]: (typeof cases)[K][number] } & {
    [K in keyof typeof sizeCases]: (typeof sizeCases)[K][number];
  } & {
    readonly?: boolean;
    borderless?: boolean;
    disabled?: boolean;
  };
  const template = (args: Partial<ParamsType>): TemplateResult => html`
    <sbb-form-field
      ?borderless=${args.borderless}
      ?negative=${args.negative}
      size=${args.size || nothing}
      width="collapse"
    >
      <label>Label</label>
      ${!args.noIcons ? html`<sbb-icon slot="prefix" name="clock-small"></sbb-icon>` : nothing}
      <sbb-time-input
        value=${args.withError ? '00:99' : '12:00'}
        class=${args.withError ? 'sbb-invalid' : nothing}
        ?disabled=${args.disabled}
        ?readonly="${args.readonly}"
      ></sbb-time-input>
      ${!args.noIcons
        ? html`<sbb-icon slot="suffix" name="circle-information-small"></sbb-icon>`
        : nothing}
      ${args.withError ? html`<sbb-error>Error message</sbb-error>` : nothing}
    </sbb-form-field>
  `;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      describeEach(cases, ({ forcedColors, ...params }) => {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(template(params), {
              backgroundColor: params.negative
                ? 'var(--sbb-background-color-1-negative)'
                : undefined,
              forcedColors,
            });
          }),
        );
      });

      // Size and icons cases
      describeEach(sizeCases, (params) => {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(template(params));
          }),
        );
      });

      it(
        `disabled ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ disabled: true }));
        }),
      );

      it(
        `readonly ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ readonly: true }));
        }),
      );

      it(
        `borderless ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ borderless: true }));
        }),
      );
    }
  });
});
