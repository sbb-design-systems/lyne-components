import { aTimeout } from '@open-wc/testing';
import {
  tabKey,
  type VisualDiffSetupBuilder,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { sendKeys } from '@web/test-runner-commands';
import { html, nothing, type TemplateResult } from 'lit';

import '@sbb-esta/lyne-elements/card.js';
import '@sbb-esta/lyne-elements/form-field.js';
import '../../autocomplete-grid.ts';

describe('sbb-autocomplete-grid', () => {
  const defaultArgs = {
    negative: false,
    disabled: false,
    readonly: false,
    required: false,
    withIcon: true,
    preserveIconSpace: true,
    disableOption: false,
    borderless: false,
    size: 'm',
    withGroup: false,
    disableGroup: false,
    withMixedOptionAndGroup: false,
  };

  const textBlock = (): TemplateResult => html`
    <sbb-card color="milk" style="margin-block-start: 1rem; z-index: 100">
      This text block has a <code>z-index</code> greater than the form field, but it must always be
      covered by the autocomplete overlay.
    </sbb-card>
  `;

  const createOptionBlockOne = (withIcon: boolean, disableOption: boolean): TemplateResult => html`
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option
        value="Option 1"
        icon-name=${withIcon ? 'clock-small' : nothing}
      >
        Option 1
      </sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option
        value="Option 2"
        icon-name=${withIcon ? 'clock-small' : nothing}
        ?disabled=${disableOption}
      >
        Option 2
      </sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button
          icon-name="pen-small"
          ?disabled=${disableOption}
        ></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="Option 3">
        ${withIcon ? html`<sbb-icon slot="icon" name="clock-small"></sbb-icon>` : nothing} Option 3
        with a long text which can wrap
      </sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
  `;

  const createOptionBlockTwo = (): TemplateResult => html`
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="Option 4">Option 4</sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="trash-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="Option 5">Option 5</sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="trash-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
  `;

  const createOptions = (withIcon: boolean, disableOption: boolean): TemplateResult => html`
    ${createOptionBlockOne(withIcon, disableOption)} ${createOptionBlockTwo()}
  `;

  const createOptionsGroup = (
    withIcon: boolean,
    disableOption: boolean,
    disableGroup: boolean,
  ): TemplateResult => html`
    <sbb-autocomplete-grid-optgroup label="Group 1" ?disabled=${disableGroup}>
      ${createOptionBlockOne(withIcon, disableOption)}
    </sbb-autocomplete-grid-optgroup>
    <sbb-autocomplete-grid-optgroup label="Group 2"
      >${createOptionBlockTwo()}</sbb-autocomplete-grid-optgroup
    >
  `;

  const createMixedOptionsGroup = (
    withIcon: boolean,
    disableOption: boolean,
    disableGroup: boolean,
  ): TemplateResult => html`
    <sbb-autocomplete-grid-option value="Option 1" selected>
      <sbb-icon slot="icon" name="clock-small" style="color: var(--sbb-color-sky)"></sbb-icon>
      Option Value
    </sbb-autocomplete-grid-option>
    ${createOptionsGroup(withIcon, disableOption, disableGroup)}
  `;

  const template = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field ?negative=${args.negative} ?borderless=${args.borderless} size=${args.size}>
      <label>Label</label>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      <sbb-autocomplete-grid ?preserve-icon-space=${args.preserveIconSpace}>
        ${args.withGroup
          ? args.withMixedOptionAndGroup
            ? createMixedOptionsGroup(args.withIcon, args.disableOption, args.disableGroup)
            : createOptionsGroup(args.withIcon, args.disableOption, args.disableGroup)
          : createOptions(args.withIcon, args.disableOption)}
      </sbb-autocomplete-grid>
      ${args.required
        ? html`<sbb-error slot="error">This is a required field.</sbb-error>`
        : nothing}
    </sbb-form-field>
    ${textBlock()}
  `;

  const openAutocomplete = async (setup: VisualDiffSetupBuilder): Promise<void> => {
    // Wait for page is rendered stable. Otherwise, the overlay can be positioned slightly off.
    await aTimeout(10);
    const input = setup.snapshotElement.querySelector('input')!;
    input.focus();
    await sendKeys({ press: 'O' });
  };

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 500 }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
          describe(`state=above-${visualDiffState.name}`, () => {
            for (const borderless of [false, true]) {
              it(
                `borderless=${borderless}`,
                visualDiffState.with(async (setup) => {
                  await setup.withFixture(
                    html`
                      <div style="position: absolute; inset-block-end: 2rem;">
                        ${template({ ...defaultArgs, negative, borderless })}
                      </div>
                    `,
                    {
                      minHeight: '500px',
                      backgroundColor: negative
                        ? 'var(--sbb-background-color-1-negative)'
                        : undefined,
                    },
                  );
                  setup.withPostSetupAction(() => openAutocomplete(setup));
                }),
              );
            }
          });
        }
      });
    }
  });

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        const style = {
          minHeight: '400px',
          backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
        };

        for (const size of ['m', 's']) {
          for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
            it(
              `state=${visualDiffState.name} size=${size}`,
              visualDiffState.with(async (setup) => {
                await setup.withFixture(template({ ...defaultArgs, negative, size }), style);
              }),
            );
          }
        }

        it(
          `state=required`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, required: true }), style);
          }),
        );

        it(
          `state=disabled`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, disabled: true }), style);
          }),
        );

        it(
          `state=readonly`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, readonly: true }), style);
          }),
        );

        it(
          `state=borderless`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              template({ ...defaultArgs, negative, borderless: true }),
              style,
            );
          }),
        );

        it(
          `state=noIcon`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, negative, withIcon: false }), style);
            setup.withPostSetupAction(() => openAutocomplete(setup));
          }),
        );

        it(
          'darkMode=true focus',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template(defaultArgs), { darkMode: true });

            setup.withPostSetupAction(async () => {
              // Force focus in input field
              await sendKeys({ press: tabKey });
              await sendKeys({ press: `Shift+${tabKey}` });

              await openAutocomplete(setup);
              await sendKeys({ press: 'ArrowDown' });
            });
          }),
        );

        for (const withIcon of [false, true]) {
          it(
            `state=noSpace withIcon=${withIcon}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({ ...defaultArgs, negative, withIcon, preserveIconSpace: false }),
                style,
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );
        }

        for (const withGroup of [false, true]) {
          const wrapperStyle = {
            minHeight: withGroup ? '800px' : '400px',
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
          };

          it(
            `withGroup=${withGroup}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({ ...defaultArgs, negative, withGroup }),
                wrapperStyle,
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );

          it(
            `withGroup=${withGroup} disableOption=true`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({ ...defaultArgs, negative, withGroup, disableOption: true }),
                wrapperStyle,
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );
        }

        describe('withGroup=true', () => {
          it(
            `disableGroup=true`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                template({
                  ...defaultArgs,
                  negative,
                  disableGroup: true,
                  withGroup: true,
                }),
                {
                  minHeight: '800px',
                  backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                },
              );
              setup.withPostSetupAction(() => openAutocomplete(setup));
            }),
          );

          for (const size of ['m', 's']) {
            it(
              `size=${size} withMixedOptionAndGroup=true`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  template({
                    ...defaultArgs,
                    negative,
                    size,
                    withGroup: true,
                    withMixedOptionAndGroup: true,
                  }),
                  {
                    minHeight: '800px',
                    backgroundColor: negative
                      ? 'var(--sbb-background-color-1-negative)'
                      : undefined,
                  },
                );
                setup.withPostSetupAction(() => openAutocomplete(setup));
              }),
            );
          }
        });
      });
    }

    it(
      `with ellipsis`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<div class="sbb-options-nowrap">${template({ ...defaultArgs })}</div>`,
        );

        setup.withPostSetupAction(() => openAutocomplete(setup));
      }),
    );

    it(
      'forcedColors=true',
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(template(defaultArgs), { forcedColors: true });

        setup.withPostSetupAction(() => openAutocomplete(setup));
      }),
    );
  });
});
