import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './clock.js';

describe(`sbb-clock`, () => {
  const timeCases = [
    { hours: '0', minutes: '0', seconds: '0' },
    { hours: '7', minutes: '32', seconds: '15' },
    { hours: '16', minutes: '15', seconds: '0' },
    { hours: '11', minutes: '60', seconds: '60' },
  ];

  describeViewports({ viewports: ['medium'] }, () => {
    for (const time of timeCases) {
      const timeStamp = `${time.hours}:${time.minutes}:${time.seconds}`;

      it(
        `time=${timeStamp.replaceAll(':', '-')}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`<sbb-clock now=${timeStamp}></sbb-clock>`);
        }),
      );
    }
  });
});
