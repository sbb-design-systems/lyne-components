import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import type { SeatReservation } from '../common.ts';

import type { SbbSeatReservationElement } from './seat-reservation.component.ts';

import './seat-reservation.component.ts';

describe(`sbb-seat-reservation`, () => {
  describe('renders', () => {
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
      await waitForLitRender(element);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
