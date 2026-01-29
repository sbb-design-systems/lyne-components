import { html, nothing, type TemplateResult } from 'lit';

import { isChromium } from '../../core/dom.ts';
import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import './form-field.component.ts';
import '../../button/mini-button.ts';
import '../error.ts';
import '../../popover.ts';

describe(`sbb-form-field`, () => {
  const formField = (
    {
      'error-space': errorSpace,
      label,
      optional,
      size,
      borderless,
      width,
      negative,
      'hidden-label': hiddenLabel,
      'floating-label': floatingLabel,
      slottedLabel,
      errorText,
    }: { [key: string]: unknown },
    template: TemplateResult,
  ): TemplateResult =>
    html`<sbb-form-field
      error-space=${errorSpace}
      ?optional=${optional}
      size=${size}
      ?borderless=${borderless}
      width=${width}
      ?hidden-label=${hiddenLabel}
      ?floating-label=${floatingLabel}
      ?negative=${negative}
    >
      ${label && !slottedLabel
        ? html`<label>${label}</label>`
        : label && slottedLabel
          ? html`<span slot="label">${label}</span>`
          : nothing}
      ${template}
      ${errorText ? html`<sbb-error slot="error">This is a required field.</sbb-error>` : nothing}
    </sbb-form-field>`;

  const basicInput = ({
    cssClass,
    placeholder,
    disabled,
    readonly,
    value,
  }: any): TemplateResult => html`
    <input
      class=${cssClass}
      placeholder=${placeholder}
      ?disabled=${disabled}
      ?readonly=${readonly}
      value=${value}
    />
  `;

  const basicSelect = ({ cssClass, disabled, selectNullValue }: any): TemplateResult => html`
    <select class=${cssClass} ?disabled=${disabled}>
      ${selectNullValue ? html`<option value="0" selected></option>` : nothing}
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </select>
  `;

  const basicTextarea = ({
    cssClass,
    placeholder,
    disabled,
    readonly,
    value,
  }: any): TemplateResult =>
    html`<textarea
      class=${cssClass}
      placeholder=${placeholder}
      ?disabled=${disabled}
      ?readonly=${readonly}
      .value=${value || nothing}
    ></textarea>`;

  const icons: TemplateResult = html`
    <sbb-icon slot="prefix" name="face-smiling-small"></sbb-icon>
    <sbb-icon slot="suffix" name="dog-small"></sbb-icon>
  `;

  const buttonsAndPopover = ({ disabled, readonly }: any): TemplateResult => html`
    <sbb-mini-button
      slot="prefix"
      icon-name="face-smiling-small"
      ?disabled=${disabled || readonly}
      aria-label="Input button"
    ></sbb-mini-button>
    <sbb-mini-button
      slot="suffix"
      id="popover-trigger"
      icon-name="circle-information-small"
    ></sbb-mini-button>
    <sbb-popover trigger="popover-trigger">Some content.</sbb-popover>
  `;

  const basicArgs = {
    'error-space': 'none',
    label: 'Input name',
    'hidden-label': false,
    'floating-label': false,
    optional: false,
    borderless: false,
    size: 'm',
    negative: false,
    cssClass: '',
    placeholder: 'Input placeholder',
    value: 'Input value',
    disabled: false,
    readonly: false,
    errorText: false,
    width: 'default',
    active: false,
    selectNullValue: false,
  };

  const states = {
    negative: [false, true],
    state: [
      { disabled: true, readonly: false },
      { disabled: false, readonly: true },
    ],
  };

  const visualProp = {
    size: ['s', 'm', 'l'],
    width: ['default', 'collapse'],
    errorText: [true, false],
  };

  const component = new Map()
    .set('input', basicInput)
    .set('select', basicSelect)
    .set('textarea', basicTextarea);

  function testFormField({
    forcedColors,
    darkMode,
  }: {
    forcedColors: boolean;
    darkMode: boolean;
  }): void {
    for (const [name, template] of component.entries()) {
      describe(`input=${name}`, () => {
        // visual states
        for (const negative of [false, true]) {
          const args = { ...basicArgs, negative };

          describe(`negative=${negative}`, () => {
            for (const visualDiffState of [visualDiffDefault, visualDiffFocus, visualDiffActive]) {
              // Skip the active tests for native select on Chromium because of a bug.
              if (!isChromium || template !== basicSelect || visualDiffState !== visualDiffActive) {
                it(
                  `slot=none ${visualDiffState.name}`,
                  visualDiffState.with(async (setup) => {
                    await setup.withFixture(html`${formField(args, template(args))}`, {
                      backgroundColor: negative
                        ? 'var(--sbb-background-color-2-negative)'
                        : 'var(--sbb-background-color-2)',
                      focusOutlineDark: negative,
                      forcedColors,
                      darkMode,
                    });
                  }),
                );

                it(
                  `slot=icons ${visualDiffState.name}`,
                  visualDiffState.with(async (setup) => {
                    const templateResult: TemplateResult = html`${template(args)} ${icons}`;
                    await setup.withFixture(html`${formField(args, templateResult)}`, {
                      backgroundColor: negative
                        ? 'var(--sbb-background-color-2-negative)'
                        : 'var(--sbb-background-color-2)',
                      focusOutlineDark: negative,
                      forcedColors,
                      darkMode,
                    });
                  }),
                );
              }
            }

            it(
              `slot=buttons ${visualDiffDefault.name}`,
              visualDiffDefault.with(async (setup) => {
                const templateResult: TemplateResult = html`${template(args)}
                ${buttonsAndPopover(args)}`;
                await setup.withFixture(html`${formField(args, templateResult)}`, {
                  backgroundColor: negative
                    ? 'var(--sbb-background-color-2-negative)'
                    : 'var(--sbb-background-color-2)',
                  focusOutlineDark: negative,
                  forcedColors,
                  darkMode,
                });
              }),
            );

            // Skip the active tests for native select on Chromium because of a bug.
            if (!isChromium || template !== basicSelect) {
              it(
                `slot=buttons ${visualDiffActive.name}`,
                visualDiffActive.with(async (setup) => {
                  const templateResult: TemplateResult = html`${template(args)}
                  ${buttonsAndPopover(args)}`;
                  await setup.withFixture(html`${formField(args, templateResult)}`, {
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-2-negative)'
                      : 'var(--sbb-background-color-2)',
                    focusOutlineDark: negative,
                    forcedColors,
                    darkMode,
                  });
                }),
              );
            }

            it(
              `slot=buttons focus`,
              visualDiffFocus.with(async (setup) => {
                const templateResult: TemplateResult = html`${template(args)}
                ${buttonsAndPopover(args)}`;
                await setup.withFixture(html`${formField(args, templateResult)}`, {
                  backgroundColor: negative
                    ? 'var(--sbb-background-color-2-negative)'
                    : 'var(--sbb-background-color-2)',
                  focusOutlineDark: negative,
                  forcedColors,
                  darkMode,
                });
                setup.withStateElement(setup.snapshotElement.querySelector('sbb-mini-button')!);
              }),
            );
          });
        }

        // disabled and readonly states
        describeEach(states, ({ negative, state }) => {
          const args = {
            ...basicArgs,
            negative,
            disabled: state.disabled,
            readonly: state.readonly,
          };

          it(
            `slot=none`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(html`${formField(args, template(args))}`, {
                backgroundColor: negative
                  ? state.disabled
                    ? 'var(--sbb-background-color-1-negative)'
                    : 'var(--sbb-background-color-2-negative)'
                  : state.disabled
                    ? 'var(--sbb-background-color-1)'
                    : 'var(--sbb-background-color-2)',
                focusOutlineDark: negative,
                forcedColors,
                darkMode,
              });
            }),
          );

          it(
            `slot=buttons`,
            visualDiffDefault.with(async (setup) => {
              const templateResult: TemplateResult = html`${template(args)}
              ${buttonsAndPopover(args)}`;
              await setup.withFixture(html`${formField(args, templateResult)}`, {
                backgroundColor: negative
                  ? 'var(--sbb-background-color-2-negative)'
                  : 'var(--sbb-background-color-2)',
                focusOutlineDark: negative,
                forcedColors,
                darkMode,
              });
            }),
          );
        });

        it(
          `label=slotted`,
          visualDiffDefault.with(async (setup) => {
            const slottedLabel = { ...basicArgs, 'slotted-label': true };
            await setup.withFixture(html`${formField(slottedLabel, template(slottedLabel))}`, {
              forcedColors,
              darkMode,
            });
          }),
        );

        it(
          `label=ellipsis`,
          visualDiffDefault.with(async (setup) => {
            const hiddenLabel = {
              ...basicArgs,
              label: 'This label name is so long that it needs ellipsis to fit',
            };
            await setup.withFixture(html`${formField(hiddenLabel, template(hiddenLabel))}`, {
              forcedColors,
              darkMode,
            });
          }),
        );

        // optional
        it(
          `optional=true`,
          visualDiffDefault.with(async (setup) => {
            const noLabel = { ...basicArgs, optional: true };
            await setup.withFixture(html`${formField(noLabel, template(noLabel))}`, {
              forcedColors,
              darkMode,
            });
          }),
        );

        // borderless
        describe('borderless=true', () => {
          for (const negative of [false, true]) {
            describe(`negative=${negative}`, () => {
              it(
                ``,
                visualDiffDefault.with(async (setup) => {
                  const noLabel = { ...basicArgs, negative, borderless: true };
                  await setup.withFixture(html`${formField(noLabel, template(noLabel))}`, {
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-2-negative)'
                      : 'var(--sbb-background-color-2)',
                    focusOutlineDark: negative,
                    forcedColors,
                    darkMode,
                  });
                }),
              );

              it(
                `disabled=true`,
                visualDiffDefault.with(async (setup) => {
                  const noLabel = { ...basicArgs, negative, borderless: true, disabled: true };
                  await setup.withFixture(html`${formField(noLabel, template(noLabel))}`, {
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-1-negative)'
                      : 'var(--sbb-background-color-1)',
                    focusOutlineDark: negative,
                    forcedColors,
                    darkMode,
                  });
                }),
              );

              it(
                `error=true ${visualDiffFocus.name}`,
                visualDiffFocus.with(async (setup) => {
                  const noLabel = {
                    ...basicArgs,
                    negative,
                    borderless: true,
                    cssClass: 'sbb-invalid',
                  };
                  await setup.withFixture(html`${formField(noLabel, template(noLabel))}`, {
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-2-negative)'
                      : 'var(--sbb-background-color-2)',
                    focusOutlineDark: negative,
                    forcedColors,
                    darkMode,
                  });
                }),
              );

              it(
                visualDiffFocus.name,
                visualDiffFocus.with(async (setup) => {
                  const noLabel = { ...basicArgs, negative, borderless: true };
                  await setup.withFixture(html`${formField(noLabel, template(noLabel))}`, {
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-2-negative)'
                      : 'var(--sbb-background-color-2)',
                    focusOutlineDark: negative,
                    forcedColors,
                    darkMode,
                  });
                }),
              );
            });
          }
        });

        // visual
        describeEach(visualProp, ({ size, width, errorText }) => {
          it(
            visualDiffDefault.name,
            visualDiffDefault.with(async (setup) => {
              const args = {
                ...basicArgs,
                size,
                width,
                errorText,
                cssClass: errorText ? 'sbb-invalid' : '',
              };
              await setup.withFixture(html`${formField(args, template(args))}`, {
                forcedColors,
                darkMode,
              });
            }),
          );
        });

        for (const size of visualProp.size) {
          describe(`size=${size}`, () => {
            it(
              `label=floating`,
              visualDiffDefault.with(async (setup) => {
                const hiddenLabel = {
                  ...basicArgs,
                  'floating-label': true,
                  value: undefined,
                  selectNullValue: true,
                  size,
                };
                await setup.withFixture(html`${formField(hiddenLabel, template(hiddenLabel))}`, {
                  forcedColors,
                  darkMode,
                });
              }),
            );

            it(
              `label=hidden`,
              visualDiffDefault.with(async (setup) => {
                const hiddenLabel = { ...basicArgs, 'hidden-label': true, size };
                await setup.withFixture(html`${formField(hiddenLabel, template(hiddenLabel))}`, {
                  forcedColors,
                  darkMode,
                });
              }),
            );

            // labels
            it(
              `label=undefined`,
              visualDiffDefault.with(async (setup) => {
                const noLabel = { ...basicArgs, label: undefined, size };
                await setup.withFixture(html`${formField(noLabel, template(noLabel))}`, {
                  forcedColors,
                  darkMode,
                });
              }),
            );
          });
        }
      });
    }
  }

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    testFormField({ forcedColors: false, darkMode: false });

    it(
      'should keep input type=number arrows inside container',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-form-field size="s">
            <label>Label</label>
            <input type="number" value="2" />
          </sbb-form-field>`,
        );

        setup.withPostSetupAction(() => setup.snapshotElement.querySelector('input')!.focus());
      }),
    );
  });

  describeViewports({ viewports: ['zero'] }, () => {
    describe(`darkMode=true`, () => {
      testFormField({ forcedColors: false, darkMode: true });
    });

    // As there are so many special styles for forced colors, we apply forcedColors to every case.
    describe(`forcedColors=true`, () => {
      testFormField({ forcedColors: true, darkMode: false });
    });

    it(
      'multiple errors',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-form-field>
            <input type="number" value="2" minlength="4" required />
            <sbb-error>This is required field</sbb-error>
            <sbb-error>Minimum length is 4 characters</sbb-error>
          </sbb-form-field>`,
        );
      }),
    );
  });
});
