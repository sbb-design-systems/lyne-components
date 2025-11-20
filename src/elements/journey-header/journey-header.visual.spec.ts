import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.ts';

import './journey-header.component.ts';

describe(`sbb-journey-header`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    roundTrip: [false, true],
  };

  const sizeCases = ['s', 'm', 'l'];

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ negative, roundTrip }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-journey-header
            ?round-trip=${roundTrip}
            ?negative=${negative}
            origin="Origin"
            destination="Destination"
          ></sbb-journey-header>`,
          { backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined },
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

    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        it(
          `darkMode=true`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-journey-header
                origin="Origin"
                destination="Destination"
                ?negative=${negative}
              ></sbb-journey-header>`,
              { darkMode: true },
            );
          }),
        );
      });
    }
  });
});
