import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import type { SbbSeatReservationNavigationServicesElement } from './seat-reservation-navigation-services.component.ts';

import './seat-reservation-navigation-services.component.ts';

describe(`sbb-seat-reservation-navigation-services`, () => {
  describe('renders', () => {
    let element: SbbSeatReservationNavigationServicesElement;

    const propertyIds: string[] = ['BICYCLE', 'SILENCE'];

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation-navigation-services
          .propertyIds="${propertyIds}"
        ></sbb-seat-reservation-navigation-services>`,
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
