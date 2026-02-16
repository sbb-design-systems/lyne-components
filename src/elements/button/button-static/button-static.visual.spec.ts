import { html } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './button-static.component.ts';

// We test only the differences to the sbb-button and sbb-button-link
describe(`sbb-button-static`, () => {
  describeViewports({ viewports: ['zero'] }, () => {
    for (const forcedColors of [false, true]) {
      describe(`forcedColors=${forcedColors}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffActive]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-button-static icon-name="arrow-right-small">Button</sbb-button-static>`,
                {
                  forcedColors,
                },
              );
            }),
          );
        }
      });
    }
  });
});
