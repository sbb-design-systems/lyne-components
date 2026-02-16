import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationPlaceControlElement } from './seat-reservation-place-control.component.ts';

describe(`sbb-seat-reservation-place-control ssr`, () => {
  let root: SbbSeatReservationPlaceControlElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-seat-reservation-place-control></sbb-seat-reservation-place-control>`,
      {
        modules: ['./seat-reservation-place-control.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationPlaceControlElement);
  });
});
