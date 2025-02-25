import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationElement } from './seat-reservation.js';

describe(`sbb-seat-reservation ssr`, () => {
  let root: SbbSeatReservationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-seat-reservation></sbb-seat-reservation>`, {
      modules: ['./seat-reservation.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationElement);
  });
});
