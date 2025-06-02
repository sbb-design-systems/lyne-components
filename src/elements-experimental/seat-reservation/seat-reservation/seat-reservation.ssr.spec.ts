import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { mapRawDataToSeatReservation } from '../common.js';

import { SbbSeatReservationElement } from './seat-reservation.component.js';

const mapedSeatReservation = mapRawDataToSeatReservation('TRAIN');

describe(`sbb-seat-reservation ssr`, () => {
  let root: SbbSeatReservationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-seat-reservation .seatReservation=${mapedSeatReservation}></sbb-seat-reservation>`,
      {
        modules: ['./seat-reservation.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationElement);
  });
});
