import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './button-static.js';

// We test only the differences to the sbb-button and sbb-button-link
describe(`sbb-button-static`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const forcedColors of [false, true]) {
      describe(`forcedColors=${forcedColors}`, () => {
        for (const state of visualDiffStandardStates) {
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
