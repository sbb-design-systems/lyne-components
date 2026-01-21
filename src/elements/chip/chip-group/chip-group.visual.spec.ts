import { html, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import type { SbbFormFieldElement } from '../../form-field/form-field.ts';

import './chip-group.component.ts';
import '../chip.ts';
import '../../form-field.ts';

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
    hiddenLabel: boolean;
    floatingLabel: boolean;
    size: SbbFormFieldElement['size'];
    disableLabel: boolean;
    chipCount: number;
  }> = {},
): TemplateResult => {
  const chipCount = args.chipCount ?? 3;
  return html`
    <sbb-form-field
      ?negative=${args.negative}
      ?hidden-label=${args.hiddenLabel}
      ?floating-label=${args.floatingLabel}
      size=${args.size ?? 'm'}
    >
      ${!args.disableLabel ? html`<label>Label</label>` : ``}
      <sbb-chip-group name="chip-group-1">
        ${Array.from({ length: chipCount }, (_, i) => {
          const isLast = i === chipCount - 1;
          const value = isLast && args.longLabel ? longLabel : `chip ${i + 1}`;
          return html`<sbb-chip value=${value}></sbb-chip>`;
        })}
        <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      </sbb-chip-group>
    </sbb-form-field>
  `;
};

describe('sbb-chip-group', () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
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

    for (const size of ['l', 'm', 's'] as SbbFormFieldElement['size'][]) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ size: size }));
        }),
      );

      it(
        `size=${size} empty`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ size: size }));

          setup.withPostSetupAction(async () => {
            setup.snapshotElement.querySelector('sbb-chip-group')!.value = null;
            await waitForLitRender(setup.snapshotElement);
          });
        }),
      );

      it(
        `size=${size} without label`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ size: size, disableLabel: true, chipCount: 1 }));
        }),
      );
    }

    it(
      'long chip',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ longLabel: true }), { maxWidth: '300px' });
      }),
    );

    it(
      'hidden label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ hiddenLabel: true }));
      }),
    );

    it(
      `floating-label=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ floatingLabel: true }));
      }),
    );

    it(
      `floating-label=true empty`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ floatingLabel: true }));

        setup.withPostSetupAction(async () => {
          setup.snapshotElement.querySelector('sbb-chip-group')!.value = null;
          setup.snapshotElement.querySelector('sbb-form-field')!.clear();
          await waitForLitRender(setup.snapshotElement);
        });
      }),
    );
  });
});
