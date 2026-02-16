import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import {
  cancelledLeg,
  futureLeg,
  longFutureLeg,
  partiallyCancelledLeg,
  pastLeg,
  progressLeg,
  redirectedOnArrivalLeg,
  redirectedOnDepartureLeg,
} from './pearl-chain.sample-data.private.ts';
import './pearl-chain.component.ts';

describe(`sbb-pearl-chain`, () => {
  const cases = [
    { name: 'no stops', legs: [futureLeg] },
    { name: 'many stops', legs: [futureLeg, longFutureLeg, futureLeg, futureLeg] },
    { name: 'cancelled', legs: [cancelledLeg] },
    { name: 'partially cancelled', legs: [partiallyCancelledLeg] },
    { name: 'cancelled many stops', legs: [futureLeg, cancelledLeg, futureLeg, cancelledLeg] },
    { name: 'with position', legs: [progressLeg], now: new Date('2022-12-05T12:11:00') },
    { name: 'past', legs: [pastLeg, pastLeg], now: new Date('2023-11-01T12:11:00') },
    {
      name: 'departure post skipped',
      legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnDepartureLeg, futureLeg],
      now: new Date('2022-12-05T12:11:00'),
    },
    {
      name: 'arrival post skipped',
      legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnArrivalLeg, futureLeg],
      now: new Date('2022-12-05T12:11:00'),
    },
    {
      name: 'first stop skipped',
      legs: [redirectedOnDepartureLeg, futureLeg, longFutureLeg],
      now: new Date('2022-12-05T12:11:00'),
    },
    {
      name: 'last stop skipped',
      legs: [futureLeg, longFutureLeg, redirectedOnArrivalLeg],
      now: new Date('2022-12-05T12:11:00'),
    },
    {
      name: 'mixed',
      legs: [pastLeg, progressLeg, longFutureLeg, cancelledLeg, futureLeg],
      now: new Date('2022-12-05T12:11:00'),
    },
  ];

  describeViewports({ viewports: ['large'] }, () => {
    for (const c of cases) {
      it(
        c.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain
              .legs=${c.legs}
              .now=${c.now ?? new Date('2022-12-01T12:11:00')}
              disable-animation
            ></sbb-pearl-chain>
          `);
        }),
      );
    }
  });
});
