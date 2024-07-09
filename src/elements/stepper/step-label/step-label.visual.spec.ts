import { html, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.js';

import './step-label.js';

describe(`sbb-step-label`, () => {
  const template = (disabled?: boolean): TemplateResult =>
    html`<sbb-step-label icon-name="tick-small" ?disabled=${disabled}>Label</sbb-step-label>`;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffHover]) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(template());
        }),
      );

      it(
        `disabled ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template(true));
        }),
      );
    }
  });
});
