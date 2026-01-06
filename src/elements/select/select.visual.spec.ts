import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault, visualDiffFocus } from '../core/testing/private.ts';

import '../form-field.ts';
import '../option.ts';
import './select.component.ts';

describe('sbb-select', () => {
  const valueEllipsis: string = 'This label name is so long that it needs ellipsis to fit.';
  const defaultArgs = {
    borderless: false,
    size: 'm',
    negative: false,
    disableOption: false,
    withOptionGroup: false,
    disableGroup: false,
    withEllipsis: false,
    value: undefined as string | string[] | undefined,
    multiple: false,
    disabled: false,
    required: false,
    readonly: false,
  };

  const createOptions = (
    disableOption: boolean,
    group: string | boolean,
    selectValue: string | string[] | undefined = undefined,
  ): TemplateResult[] => {
    return new Array(5).fill(null).map((_, i) => {
      const value = group ? `Option ${i + 1} ${' - ' + group}` : `Option ${i + 1}`;
      const selected = Array.isArray(selectValue)
        ? selectValue.includes(value)
        : selectValue === value;
      return html`
        <sbb-option value=${value} ?disabled=${disableOption && i < 2} ?selected=${selected}>
          ${value}
        </sbb-option>
      `;
    });
  };

  const createOptionsGroup = (
    disableOption: boolean,
    disableGroup: boolean,
  ): TemplateResult => html`
    <sbb-optgroup label="Group 1" ?disabled=${disableGroup}>
      ${createOptions(disableOption, '1')}
    </sbb-optgroup>
    <sbb-optgroup label="Group 2"> ${createOptions(disableOption, '2')} </sbb-optgroup>
  `;

  const template = ({
    borderless,
    size,
    negative,
    disableOption,
    withOptionGroup,
    disableGroup,
    withEllipsis,
    ...args
  }: typeof defaultArgs): TemplateResult => {
    if (args.multiple && args.value) {
      args.value = [args.value as string];
    }
    return html`
      <sbb-form-field ?borderless=${borderless} ?negative=${negative} size=${size}>
        <label>Select</label>
        <sbb-select
          value=${args.value || nothing}
          ?multiple=${args.multiple}
          ?disabled=${args.disabled}
          ?required=${args.required}
          ?readonly=${args.readonly}
          placeholder="Select"
          class=${args.required ? 'sbb-invalid' : nothing}
        >
          ${withEllipsis
            ? html` <sbb-option value=${valueEllipsis} selected=""> ${valueEllipsis} </sbb-option>`
            : nothing}
          ${withOptionGroup
            ? createOptionsGroup(disableOption, disableGroup)
            : createOptions(disableOption, false, args.value)}
        </sbb-select>
        ${args.required ? html`<sbb-error>Error</sbb-error>` : nothing}
      </sbb-form-field>
    `;
  };

  describeViewports({ viewports: ['large'], viewportHeight: 400 }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        for (const { darkMode, forcedColors } of [
          { forcedColors: false, darkMode: false },
          { forcedColors: true, darkMode: false },
          { forcedColors: false, darkMode: true },
        ]) {
          describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
            for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
              it(
                `state=above ${visualDiffState.name}`,
                visualDiffState.with(async (setup) => {
                  await setup.withFixture(
                    html`
                      <div style="position: absolute; inset-block-end: 2rem;">
                        ${template({ ...defaultArgs, negative })}
                      </div>
                    `,
                    {
                      minHeight: '400px',
                      backgroundColor: negative
                        ? 'var(--sbb-background-color-2-negative)'
                        : undefined,
                      forcedColors,
                      darkMode,
                    },
                  );
                  setup.withPostSetupAction(() => {
                    const select = setup.snapshotElement.querySelector('sbb-select')!;
                    select.focus();
                    select.open();
                  });
                }),
              );
            }
          });
        }
      });
    }
  });

  describeViewports({ viewports: ['zero'] }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        for (const { darkMode, forcedColors } of [
          { forcedColors: false, darkMode: false },
          { forcedColors: true, darkMode: false },
          { forcedColors: false, darkMode: true },
        ]) {
          describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
            for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
              it(
                `state=${visualDiffState.name}`,
                visualDiffState.with(async (setup) => {
                  await setup.withFixture(template({ ...defaultArgs, negative }), {
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-2-negative)'
                      : undefined,
                    forcedColors,
                    darkMode,
                  });
                }),
              );
            }
          });
        }
      });

      it(
        `state=required negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, negative, required: true }), {
            backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
          });
        }),
      );

      it(
        `state=disabled negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, negative, disabled: true }), {
            backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
          });
        }),
      );

      it(
        `state=fieldset-disabled negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<fieldset disabled>${template({ ...defaultArgs, negative })}</fieldset>`,
            {
              backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
            },
          );
        }),
      );

      it(
        `state=readonly negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, negative, readonly: true }), {
            backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
          });
        }),
      );

      it(
        `state=borderless negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, negative, borderless: true }), {
            backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
          });
        }),
      );

      for (const multiple of [false, true]) {
        it(
          `negative=${negative} multiple=${multiple}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, multiple }), {
              minHeight: '400px',
              backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
            });
            setup.withPostSetupAction(() => {
              const select = setup.snapshotElement.querySelector('sbb-select')!;
              select.focus();
              select.open();
            });
          }),
        );

        it(
          `negative=${negative} multiple=${multiple} withEllipsis=true`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              template({ ...defaultArgs, negative, multiple, withEllipsis: true }),
              {
                minHeight: '600px',
                backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
              },
            );
            setup.withPostSetupAction(() => {
              const select = setup.snapshotElement.querySelector('sbb-select')!;
              select.focus();
              select.open();
            });
          }),
        );

        for (const value of [undefined, 'Option 1']) {
          it(
            `negative=${negative} multiple=${multiple} value=${value} size=s`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({
                  ...defaultArgs,
                  negative,
                  multiple,
                  size: 's',
                  value,
                }),
                {
                  minHeight: '600px',
                  backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
                },
              );
              setup.withPostSetupAction(() => {
                const select = setup.snapshotElement.querySelector('sbb-select')!;
                select.focus();
                select.open();
              });
            }),
          );
        }
        it(
          `negative=${negative} multiple=${multiple} disableOption=true`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              template({ ...defaultArgs, negative, multiple, disableOption: true }),
              {
                minHeight: '400px',
                backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
              },
            );
            setup.withPostSetupAction(() => {
              const select = setup.snapshotElement.querySelector('sbb-select')!;
              select.focus();
              select.open();
            });
          }),
        );

        for (const disableGroup of [false, true]) {
          it(
            `negative=${negative} multiple=${multiple} withOptionGroup=true disableGroup=${disableGroup}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({
                  ...defaultArgs,
                  negative,
                  multiple,
                  disableGroup,
                  withOptionGroup: true,
                }),
                {
                  minHeight: '800px',
                  backgroundColor: negative ? 'var(--sbb-background-color-2-negative)' : undefined,
                },
              );
              setup.withPostSetupAction(() => {
                const select = setup.snapshotElement.querySelector('sbb-select')!;
                select.focus();
                select.open();
              });
            }),
          );
        }
      }
    }

    it(
      `with custom max height`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(defaultArgs), {
          minHeight: '400px',
        });
        setup.withPostSetupAction(() => {
          const element = setup.snapshotElement.querySelector('sbb-select')!;
          element.style.setProperty('--sbb-options-panel-max-height', '100px');
        });
      }),
    );
  });
});
