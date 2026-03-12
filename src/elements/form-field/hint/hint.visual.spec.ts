import { html, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../../form-field.ts';

describe(`sbb-hint`, () => {
  let root: HTMLElement;

  const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit,
    ultricies in tincidunt quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus.`;

  const defaultArgs = {
    negative: false,
    disabled: false,
    readonly: false,
    longText: false,
  };

  const template = (args: typeof defaultArgs): TemplateResult => html`
    <sbb-form-field ?negative=${args.negative}>
      <label>Description</label>
      <input placeholder="Enter text" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      <sbb-hint>${args.longText ? longText : 'This is a hint.'}</sbb-hint>
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

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(defaultArgs));
      }),
    );

    it(
      'long text',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, longText: true }));
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
  });

  describeViewports({ viewports: ['zero'] }, () => {
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
