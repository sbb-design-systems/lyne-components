import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './time-input.component.js';
import '../form-field.js';
import '../form-error.js';
import '../icon.js';

describe(`sbb-time-input`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    withError: [false, true],
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
      <sbb-time-input></sbb-time-input>
      <input
        id="input-id"
        value=${args.withError ? '00:99' : '12:00'}
        ?disabled=${args.disabled}
        ?readonly="${args.readonly}"
      />
      ${!args.noIcons
        ? html`<sbb-icon slot="suffix" name="circle-information-small"></sbb-icon>`
        : nothing}
      ${args.withError ? html`<sbb-form-error>Error message</sbb-form-error>` : nothing}
    </sbb-form-field>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      describeEach(cases, (params) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(template(params), {
            backgroundColor: params.negative ? 'var(--sbb-color-charcoal)' : undefined,
          });
        });

        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
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
        `disabled_${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ disabled: true }));
        }),
      );

      it(
        `readonly_${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ readonly: true }));
        }),
      );

      it(
        `borderless_${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ borderless: true }));
        }),
      );
    }
  });
});
