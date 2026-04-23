import { ssrHydratedFixture } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { mapRawDataToSeatReservation } from '../common/mapper/mapper.ts';
import type { SeatReservation } from '../common/types.ts';

import { SbbSeatReservationElement } from './seat-reservation.component.ts';

import '../../seat-reservation.ts';

const data: SeatReservation[] = [mapRawDataToSeatReservation('BUS')];

describe(`sbb-seat-reservation ssr`, () => {
  let root: SbbSeatReservationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-seat-reservation .seatReservations=${data}></sbb-seat-reservation>`,
      {
        modules: ['../../seat-reservation.ts'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationElement);
  });
});
