import { html } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './chip.js';

describe('sbb-chip', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    it(
      `${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-chip value="Value"></sbb-chip>`);
      }),
    );

    it(
      'slotted label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-chip value="Value">Value</sbb-chip>`);
      }),
    );

    it(
      'disabled',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-chip value="Value" disabled></sbb-chip>`);
      }),
    );

    it(
      'readonly',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-chip value="Value" readonly></sbb-chip>`);
      }),
    );

    for (const state of [visualDiffActive, visualDiffFocus, visualDiffHover]) {
      // Focus on chip
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-chip value="Value"></sbb-chip>`);

          const chipStateElement = setup.snapshotElement
            .querySelector('sbb-chip')!
            .getFocusSteps()[0];
          setup.withStateElement(chipStateElement);
        }),
      );

      // Focus on delete button
      it(
        `delete_${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-chip value="Value"></sbb-chip>`);

          const deleteStateElement = setup.snapshotElement
            .querySelector('sbb-chip')!
            .getFocusSteps()[1];
          setup.withStateElement(deleteStateElement);
        }),
      );
    }
  });
});
