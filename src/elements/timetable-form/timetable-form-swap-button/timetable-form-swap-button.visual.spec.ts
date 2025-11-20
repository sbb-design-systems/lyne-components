import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import './timetable-form-swap-button.component.ts';

describe('sbb-timetable-form-swap-button', () => {
  describeViewports({ viewports: ['small'] }, () => {
    it(
      `${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>`,
        );
      }),
    );
  });
});
