import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach.js';

describe('sbb-seat-reservation-navigation-coach', () => {
  let element: SbbSeatReservationNavigationCoachElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation-navigation-coach></sbb-seat-reservation-navigation-coach>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationNavigationCoachElement);
  });
});
