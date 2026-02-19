import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import type { CoachItemDetails } from '../common/types.ts';

import type { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach.component.ts';

import './seat-reservation-navigation-coach.component.ts';

describe(`sbb-seat-reservation-navigation-coach`, () => {
  describe('renders a navigation coach', async () => {
    let root: SbbSeatReservationNavigationCoachElement;

    const coachItemDetails: CoachItemDetails = {
      id: '85',
      travelClass: 'FIRST',
      propertyIds: ['BICYCLE', 'SILENCE'],
      isDriverArea: false,
      freePlaces: { seats: 0, bicycles: 0 },
      driverAreaElements: { driverArea: undefined, driverAreaNoVerticalWall: undefined },
    };

    beforeEach(async () => {
      root = await fixture(
        html`<sbb-seat-reservation-navigation-coach
          .coachItemDetails="${coachItemDetails}"
        ></sbb-seat-reservation-navigation-coach>`,
      );

      await waitForLitRender(root);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
