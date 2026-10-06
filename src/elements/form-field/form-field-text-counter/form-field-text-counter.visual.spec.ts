import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../../form-field.ts';

describe(`sbb-form-field-text-counter`, () => {
  let root: HTMLElement;

  const defaultArgs = {
    disabled: false,
    readonly: false,
    negative: false,
    withError: false,
  };

  const template = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field ?negative=${args.negative}>
      <label>Description</label>
      <textarea
        placeholder="Enter your description"
        maxlength="200"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      ></textarea>
      ${args.withError ? html`<sbb-error>This field has an error</sbb-error>` : nothing}
      <sbb-form-field-text-counter></sbb-form-field-text-counter>
    </sbb-form-field>
  `;

  const colorCases = {
    negative: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(defaultArgs));
      }),
    );

    it(
      'disabled',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, disabled: true }));
      }),
    );

    it(
      'readonly',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, readonly: true }));
      }),
    );

    it(
      'with error',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, withError: true }));
      }),
    );

    it(
      'with text',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(defaultArgs), { padding: '0' });
        setup.withPostSetupAction(() => {
          const textarea = setup.snapshotElement.querySelector('textarea')!;
          textarea.value = 'This is some text that has been entered into the textarea.';
        });
      }),
    );

    describeEach(colorCases, ({ negative, emulateMedia: { forcedColors, darkMode } }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(template({ ...defaultArgs, negative }), {
          backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
          forcedColors,
          darkMode,
        });
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
