import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './timetable-form-swap-button.component.js';

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
