import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import './seat-reservation.component.ts';
import { html } from 'lit';

import { mapRawDataToSeatReservation, type SeatReservation } from '../common.ts';

import type { SbbSeatReservationElement } from './seat-reservation.component.ts';

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

  // Standard visual diff states to be tested;
  // own states array because the visual-regression-snapshot.ts constant "visualDiffStandardStates"
  // includes more than we need
  const seatReservationVisualStates = [visualDiffDefault, visualDiffFocus] as const;

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

        for (const state of seatReservationVisualStates) {
          it(
            `Train ${state.name}`,
            state.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(root.querySelector('sbb-seat-reservation')!);
            }),
          );
        }
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

        for (const state of seatReservationVisualStates) {
          it(
            `Bus ${state.name}`,
            state.with((setup) => {
              setup.withSnapshotElement(root);
              setup.withStateElement(root.querySelector('sbb-seat-reservation')!);
            }),
          );
        }
      },
    );
  });
});
