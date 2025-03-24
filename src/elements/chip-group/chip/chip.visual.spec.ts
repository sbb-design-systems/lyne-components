import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './chip.js';

const cases = {
  negative: [true, false],
};

describe('sbb-chip', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative }) => {
      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          `${state.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`,
            );

            setup.withPostSetupAction(() => {
              setup.snapshotElement.querySelector('sbb-chip')!.tabIndex = 0; // We force the tab index for the focus test case
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

      for (const state of [visualDiffActive, visualDiffHover]) {
        // Focus on chip
        it(
          `${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`,
            );

            const chipStateElement = setup.snapshotElement
              .querySelector('sbb-chip')!
              .shadowRoot!.querySelector<HTMLElement>('.sbb-chip__label-wrapper')!;
            setup.withStateElement(chipStateElement);
          }),
        );

        // Focus on delete button
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
              deleteStateElement.tabIndex = 0; // We force the tab index on the delete button for test purposes
            });
          }),
        );
      }
    });
  });
});
