import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit';

import { SbbSeatReservationNavigationElement } from './seat-reservation-navigation.js';

import { mapRawDataToSeatReservation } from '@sbb-esta/lyne-elements-experimental/seat-reservation/common';

const mappedSeatReservation = mapRawDataToSeatReservation('TRAIN');

describe('sbb-seat-reservation-navigation', () => {
  let element: SbbSeatReservationNavigationElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation-navigation
        .seatReservation=${mappedSeatReservation}
      ></sbb-seat-reservation-navigation>`,
    );
  });

  it('renders navigation', async () => {
    assert.instanceOf(element, SbbSeatReservationNavigationElement);
  });
});
