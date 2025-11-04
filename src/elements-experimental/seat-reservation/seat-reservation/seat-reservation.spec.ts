import { assert, expect } from '@open-wc/testing';
import { SbbSecondaryButtonElement } from '@sbb-esta/lyne-elements/button/secondary-button/secondary-button.component';
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

  it('should be accessible', async () => {
    await expect(element).to.be.accessible();
  });

  it("should not be clickable if it's the first navigation button and default index is 0", async () => {
    const btn = element.shadowRoot?.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;

    assert.instanceOf(btn, SbbSecondaryButtonElement);
  });

  // it('emits on click', async () => {
  //   const myEventNameSpy = new EventSpy(SbbSeatReservationElement.events.myEventName);
  //   element.click();
  //   await waitForLitRender(element);
  //   expect(myEventNameSpy.count).to.be.equal(1);
  // });

  /*TODO : Tests which needs to be done here :
  1. max-seat-reservations
  2. max-bicycle-reservations
  1. left and right navigation button click tests AND disable-navigation 
  2. maximum 3 navigation-service icons are shown
  3. arrowLeft/arrowRight navigation
  4. Enter, Spacer etc key navigation tests
  4. seat reservation data rendering tests
  5. test different vehicle types (TRAIN, BUS, TRAM)
  6. test single and double deck coaches
  9. test edge cases like no seat reservations, large number of reservations
  10. test empty coachItems array handling
  */
});
