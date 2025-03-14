import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { mapRawDataToSeatReservation } from '../common.js';

import { SbbSeatReservationNavigationElement } from './seat-reservation-navigation.js';

const mappedSeatReservation = mapRawDataToSeatReservation('TRAIN');

describe(`sbb-seat-reservation-navigation ssr`, () => {
  let root: SbbSeatReservationNavigationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-seat-reservation-navigation
        .seatReservation=${mappedSeatReservation}
      ></sbb-seat-reservation-navigation>`,
      {
        modules: ['./seat-reservation-navigation.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationNavigationElement);
  });
});
