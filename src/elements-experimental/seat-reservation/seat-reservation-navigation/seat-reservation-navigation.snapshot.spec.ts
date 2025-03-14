import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import type { SbbSeatReservationNavigationElement } from './seat-reservation-navigation.js';
import './seat-reservation-navigation.js';

describe(`sbb-seat-reservation-navigation`, () => {
  let element: SbbSeatReservationNavigationElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation-navigation>
          Seat Reservation Navigation
        </sbb-seat-reservation-navigation>`,
      );
    });

    it('DOM', async () => {
      expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
