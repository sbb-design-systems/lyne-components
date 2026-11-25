import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { mapRawDataToSeatReservation } from '../common/mapper.ts';
import type { SeatReservation } from '../common/types.ts';

import type { SbbSeatReservationElement } from './seat-reservation.component.ts';

import '../../seat-reservation.ts';

describe('sbb-seat-reservation', () => {
  let root: SbbSeatReservationElement;

  const dataFullTRAIN: SeatReservation[] = [mapRawDataToSeatReservation('TRAIN')];
  const dataFullBUS: SeatReservation[] = [mapRawDataToSeatReservation('BUS')];

  const cases = {
    alignVertical: [false, true],
    hasNavigation: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['small', 'large', 'ultra'] }, () => {
    describeEach(
      cases,
      ({ alignVertical, hasNavigation, emulateMedia: { forcedColors, darkMode } }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
              <sbb-seat-reservation
                .seatReservations=${dataFullTRAIN}
                .hasNavigation=${hasNavigation}
                .alignVertical=${alignVertical}
              ></sbb-seat-reservation>
            `,
            {
              darkMode,
              forcedColors,
            },
          );
        });

        it(
          `Train`,
          visualDiffDefault.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      },
    );

    describeEach(
      cases,
      ({ alignVertical, hasNavigation, emulateMedia: { forcedColors, darkMode } }) => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
              <sbb-seat-reservation
                .seatReservations=${dataFullBUS}
                .hasNavigation=${hasNavigation}
                .alignVertical=${alignVertical}
              ></sbb-seat-reservation>
            `,
            {
              darkMode,
              forcedColors,
            },
          );
        });

        it(
          `Bus`,
          visualDiffDefault.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      },
    );
  });
});
