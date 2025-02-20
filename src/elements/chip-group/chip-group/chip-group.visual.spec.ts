import { html, type TemplateResult } from 'lit';

import { describeViewports, describeEach, visualDiffDefault } from '../../core/testing/private.js';

import './chip-group.js';
import '../chip.js';
import '../../form-field.js';

const cases = {
  negative: [true, false],
};

const longLabel = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr';

const template = (
  args: Partial<{
    negative: boolean;
    disabled: boolean;
    readonly: boolean;
    longLabel: boolean;
  }> = {},
): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>Label</label>
    <sbb-chip-group name="chip-group-1">
      <sbb-chip value="chip 1"></sbb-chip>
      <sbb-chip value="chip 2"></sbb-chip>
      <sbb-chip value=${args.longLabel ? longLabel : 'chip 3'}></sbb-chip>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
    </sbb-chip-group>
  </sbb-form-field>
`;

describe('sbb-chip-group', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative }) => {
      it(
        `${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ negative }));
        }),
      );

      it(
        'disabled',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ negative, disabled: true }));
        }),
      );

      it(
        'readonly',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ negative, readonly: true }));
        }),
      );
    });

    it(
      'long chip',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ longLabel: true }), { maxWidth: '300px' });
      }),
    );
  });
});
