import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './chip.component.js';

const cases = {
  negative: [true, false],
};

describe('sbb-chip', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative }) => {
      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          `${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`,
            );

            setup.withPostSetupAction(() => {
              // We force the tab index for the focus test case
              setup.snapshotElement.querySelector('sbb-chip')!.tabIndex = 0;
            });
          }),
        );
      }

      it(
        'slotted label',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative}>Value</sbb-chip>`,
          );
        }),
      );

      it(
        'disabled',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative} disabled></sbb-chip>`,
          );
        }),
      );

      it(
        'readonly',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative} readonly></sbb-chip>`,
          );
        }),
      );

      // Hover on label
      it(
        `${visualDiffHover.name}`,
        visualDiffHover.with(async (setup) => {
          await setup.withFixture(html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`);

          const chipStateElement = setup.snapshotElement
            .querySelector('sbb-chip')!
            .shadowRoot!.querySelector<HTMLElement>('.sbb-chip__label-wrapper')!;
          setup.withStateElement(chipStateElement);
        }),
      );

      for (const state of [visualDiffActive, visualDiffHover]) {
        // Active/hover on delete button
        it(
          `delete_${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`,
            );

            const deleteStateElement = setup.snapshotElement
              .querySelector('sbb-chip')!
              .shadowRoot!.querySelector<HTMLElement>('.sbb-chip__delete')!;

            setup.withStateElement(deleteStateElement);
            setup.withPostSetupAction(() => {
              // We force the tab index on the delete button for test purposes
              deleteStateElement.tabIndex = 0;
            });
          }),
        );
      }
    });
  });
});
