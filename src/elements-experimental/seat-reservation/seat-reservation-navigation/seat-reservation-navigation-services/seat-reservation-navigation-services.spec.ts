import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationNavigationServicesElement } from './seat-reservation-navigation-services.js';

describe('sbb-seat-reservation-navigation-services', () => {
  let element: SbbSeatReservationNavigationServicesElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation-navigation-services></sbb-seat-reservation-navigation-services>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationNavigationServicesElement);
  });
});
