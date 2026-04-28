import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.ts';

import '../journey-header.ts';
import type { SbbJourneyHeaderElement } from './journey-header.component.ts';

describe(`sbb-journey-header`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true] satisfies SbbJourneyHeaderElement['negative'][],
    roundTrip: [false, true] satisfies SbbJourneyHeaderElement['roundTrip'][],
  };

  const visualLevelCases = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ] satisfies SbbJourneyHeaderElement['visualLevel'][];

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

    for (const visualLevel of visualLevelCases) {
      it(
        `visualLevel=${visualLevel}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-journey-header
              origin="Origin"
              destination="Destination"
              visual-level=${visualLevel}
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

  describeViewports({ viewports: ['zero'] }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        it(
          `longContent=true`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html` <sbb-journey-header
                style="word-break: break-word"
                ?negative=${negative}
                origin="Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu"
                destination="Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch"
              >
              </sbb-journey-header>`,
              { backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined },
            );
          }),
        );
      });
    }
  });
});
