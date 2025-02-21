import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbSeatReservationElement } from './seat-reservation.js';
import './seat-reservation.js';

describe(`sbb-seat-reservation`, () => {
  describe('renders', () => {
    let element: SbbSeatReservationElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-seat-reservation my-prop="Label"></sbb-seat-reservation>`);
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
