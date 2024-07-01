import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './signet.js';

describe(`sbb-signet`, () => {
  const protectiveRooms = ['none', 'minimal', 'ideal'];

  describeViewports({ viewports: ['zero'] }, () => {
    for (const protectiveRoom of protectiveRooms) {
      it(
        `protectiveRoom=${protectiveRoom}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-signet protective-room=${protectiveRoom}></sbb-signet>`,
            { padding: '0', maxWidth: '300px' },
          );
        }),
      );
    }
  });
});
