import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbSeatReservationNavigationServicesElement } from './seat-reservation-navigation-services.component.js';
import './seat-reservation-navigation-services.component.js';

describe(`sbb-seat-reservation-navigation-services`, () => {
  describe('renders', () => {
    let element: SbbSeatReservationNavigationServicesElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation-navigation-services></sbb-seat-reservation-navigation-services>`,
      );
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
