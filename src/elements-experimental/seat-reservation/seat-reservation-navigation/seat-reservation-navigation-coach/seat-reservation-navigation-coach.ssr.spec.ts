import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach.js';

describe(`sbb-seat-reservation-navigation-coach ssr`, () => {
  let root: SbbSeatReservationNavigationCoachElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-seat-reservation-navigation-coach></sbb-seat-reservation-navigation-coach>`,
      {
        modules: ['./seat-reservation-navigation-coach.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationNavigationCoachElement);
  });
});
