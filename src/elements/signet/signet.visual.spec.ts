import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './signet.component.js';

describe(`sbb-signet`, () => {
  const cases = {
    protectiveRoom: ['none', 'minimal', 'ideal', 'panel'],
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ protectiveRoom, forcedColors }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-signet protective-room=${protectiveRoom}></sbb-signet>`,
            { padding: '0', maxWidth: '300px', forcedColors },
          );
        }),
      );
    });
  });
});
