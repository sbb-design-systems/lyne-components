import { html, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './step-label.component.ts';

describe(`sbb-step-label`, () => {
  const template = (disabled?: boolean): TemplateResult =>
    html`<sbb-step-label icon-name="tick-small" ?disabled=${disabled}>Label</sbb-step-label>`;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const { darkMode, forcedColors } of [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(template(), {
                forcedColors,
                darkMode,
              });
            }),
          );

          it(
            `disabled ${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(template(true), {
                forcedColors,
                darkMode,
              });
            }),
          );
        }
      });
    }
  });
});
