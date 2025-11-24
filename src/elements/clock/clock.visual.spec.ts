import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './clock.component.ts';

describe(`sbb-clock`, () => {
  const timeCases = [
    { hours: '0', minutes: '0', seconds: '0' },
    { hours: '7', minutes: '32', seconds: '15' },
    { hours: '16', minutes: '15', seconds: '0' },
    { hours: '11', minutes: '60', seconds: '60' },
  ];

  describeViewports({ viewports: ['large'] }, () => {
    for (const time of timeCases) {
      const timeStamp = `${time.hours}:${time.minutes}:${time.seconds}`;

      it(
        `time=${timeStamp.replaceAll(':', '-')}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`<sbb-clock now=${timeStamp}></sbb-clock>`, {
            backgroundColor: 'var(--sbb-background-color-3)',
          });
        }),
      );
    }

    it(
      `darkMode=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-clock now=${'0:0:0'}></sbb-clock>`, {
          darkMode: true,
          backgroundColor: 'var(--sbb-background-color-3)',
        });
      }),
    );
  });
});
