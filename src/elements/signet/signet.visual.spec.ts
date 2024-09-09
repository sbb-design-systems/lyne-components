import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './signet.js';

describe(`sbb-signet`, () => {
  const cases = {
    protectiveRooms: ['none', 'minimal', 'ideal'],
    forcedColors: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ protectiveRooms, forcedColors }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-signet protective-room=${protectiveRooms}></sbb-signet>`,
            { padding: '0', maxWidth: '300px', forcedColors },
          );
        }),
      );
    });
  });
});
