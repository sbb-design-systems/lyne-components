import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
} from '../core/testing/private.ts';

import '../form-field.ts';
import './slider.component.ts';

describe('sbb-slider', () => {
  const defaultArgs = {
    disabled: false,
    readonly: false,
    withIcon: true,
    withSlottedIcon: false,
  };

  const standaloneTemplate = ({
    disabled,
    readonly,
    withIcon,
    withSlottedIcon,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-slider
      ?disabled=${disabled}
      ?readonly=${readonly}
      start-icon=${withIcon && !withSlottedIcon ? 'walk-slow-small' : nothing}
      end-icon=${withIcon && !withSlottedIcon ? 'walk-fast-small' : nothing}
    >
      ${withIcon && withSlottedIcon
        ? html`
            <sbb-icon slot="prefix" name="battery-level-empty-small"></sbb-icon>
            <sbb-icon slot="suffix" name="battery-level-high-small"></sbb-icon>
          `
        : nothing}
    </sbb-slider>
  `;

  const formFieldTemplate = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field>
      <label>Label</label>
      ${standaloneTemplate(args)}
    </sbb-form-field>
  `;

  const variants = [
    { name: 'standalone', template: standaloneTemplate },
    { name: 'form-field', template: formFieldTemplate },
  ];

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const variant of variants) {
      describe(variant.name, () => {
        for (const visualDiffState of [visualDiffActive, visualDiffDefault, visualDiffFocus]) {
          it(
            visualDiffState.name,
            visualDiffState.with(async (setup) => {
              await setup.withFixture(variant.template(defaultArgs));
            }),
          );
        }

        it(
          'disabled',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(variant.template({ ...defaultArgs, disabled: true }));
          }),
        );

        it(
          'disabled fieldset',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <fieldset disabled>${variant.template({ ...defaultArgs })}</fieldset>
            `);
          }),
        );

        it(
          'readonly',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(variant.template({ ...defaultArgs, readonly: true }));
          }),
        );

        it(
          'icon=false',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(variant.template({ ...defaultArgs, withIcon: false }));
          }),
        );

        it(
          'icon=slotted',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(variant.template({ ...defaultArgs, withSlottedIcon: true }));
          }),
        );
      });
    }
  });

  describeViewports({ viewports: ['large'] }, () => {
    for (const { darkMode, forcedColors } of [
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        for (const variant of variants) {
          describe(variant.name, () => {
            for (const visualDiffState of [visualDiffActive, visualDiffDefault, visualDiffFocus]) {
              it(
                visualDiffState.name,
                visualDiffState.with(async (setup) => {
                  await setup.withFixture(variant.template(defaultArgs), {
                    forcedColors,
                    darkMode,
                  });
                }),
              );
            }

            it(
              'disabled',
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(variant.template({ ...defaultArgs, disabled: true }), {
                  forcedColors,
                  darkMode,
                });
              }),
            );

            it(
              'readonly',
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(variant.template({ ...defaultArgs, readonly: true }), {
                  forcedColors,
                  darkMode,
                });
              }),
            );
          });
        }
      });
    }
  });
});
