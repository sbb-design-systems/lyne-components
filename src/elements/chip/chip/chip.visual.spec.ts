import { html } from 'lit';

import { isWebkit } from '../../core/dom/platform.ts';
import { ɵstateController } from '../../core/mixins/element-internals-mixin.ts';
import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './chip.component.ts';

const cases = {
  negative: [false, true],
  darkMode: [false, true],
};

describe('sbb-chip', () => {
  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ negative, darkMode }) => {
      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`,
              { darkMode },
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
            { darkMode },
          );
        }),
      );

      it(
        'disabled',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative} disabled></sbb-chip>`,
            { darkMode },
          );
        }),
      );

      it(
        'readonly',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative} readonly></sbb-chip>`,
            { darkMode },
          );
        }),
      );

      // Hover on label
      it(
        visualDiffHover.name,
        visualDiffHover.with(async (setup) => {
          await setup.withFixture(html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`, {
            darkMode,
          });

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
              { darkMode },
            );

            const deleteStateElement = setup.snapshotElement
              .querySelector('sbb-chip')!
              .shadowRoot!.querySelector<HTMLElement>('.sbb-chip__delete')!;

            setup.withStateElement(deleteStateElement);
            setup.withPostSetupAction(() => {
              // We force the tab index on the delete button for test purposes
              deleteStateElement.tabIndex = 0;

              // Webkit has problems to render the :active state, we help by manually set the state.
              // TODO: re-check whether this is still needed in the future.
              if (isWebkit && state === visualDiffActive) {
                ɵstateController(deleteStateElement)?.add('active');
              }
            });
          }),
        );
      }
    });
  });
});
