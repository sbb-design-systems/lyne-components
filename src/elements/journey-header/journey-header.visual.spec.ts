import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './journey-header.js';

describe(`sbb-journey-header`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    roundTrip: [false, true],
  };

  const sizeCases = ['s', 'm', 'l'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative, roundTrip }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-journey-header
            ?round-trip=${roundTrip}
            ?negative=${negative}
            origin="Origin"
            destination="Destination"
          ></sbb-journey-header>`,
          { backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-journey-header
              origin="Origin"
              destination="Destination"
              size=${size}
            ></sbb-journey-header>`,
          );
        }),
      );
    }
  });
});
