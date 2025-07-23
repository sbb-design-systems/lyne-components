import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SeatReservation } from '../common.js';

import { SbbSeatReservationElement } from './seat-reservation.component.js';

describe('sbb-seat-reservation', () => {
  let element: SbbSeatReservationElement;

  const data: SeatReservation[] = [
    {
      vehicleType: 'TRAIN',
      deckCoachIndex: 1,
      deckCoachLevel: 'SINGLE_DECK',
      coachItems: [],
    },
  ];

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation .seatReservations="${data}"></sbb-seat-reservation>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationElement);
  });

  // it('emits on click', async () => {
  //   const myEventNameSpy = new EventSpy(SbbSeatReservationElement.events.myEventName);
  //   element.click();
  //   await waitForLitRender(element);
  //   expect(myEventNameSpy.count).to.be.equal(1);
  // });
});
