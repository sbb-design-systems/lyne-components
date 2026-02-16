import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationNavigationServicesElement } from './seat-reservation-navigation-services.component.ts';

describe(`sbb-seat-reservation-navigation-services ssr`, () => {
  let root: SbbSeatReservationNavigationServicesElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-seat-reservation-navigation-services></sbb-seat-reservation-navigation-services>`,
      {
        modules: ['./seat-reservation-navigation-services.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationNavigationServicesElement);
  });
});
