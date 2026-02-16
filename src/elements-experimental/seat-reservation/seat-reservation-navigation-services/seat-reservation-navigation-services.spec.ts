import { assert, expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationNavigationServicesElement } from './seat-reservation-navigation-services.component.ts';

let element: SbbSeatReservationNavigationServicesElement;

describe('sbb-seat-reservation-navigation-services', () => {
  beforeEach(async () => {
    element = await fixture(html`
      <sbb-seat-reservation-navigation-services></sbb-seat-reservation-navigation-services>
    `);
    await waitForLitRender(element);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationNavigationServicesElement);
  });

  it('should be accessible', async () => {
    await expect(element).to.be.accessible();
  });

  it('should render no element without any property-ids', async () => {
    const autoWidthElements = element.shadowRoot?.querySelectorAll('.auto-width');
    assert.equal(autoWidthElements?.length, 0);
  });

  it('should render one element with class "auto-width" when property-ids is ["BISTRO"]', async () => {
    element.setAttribute('property-ids', '["BISTRO"]');
    await waitForLitRender(element);
    const autoWidthElements = element.shadowRoot?.querySelectorAll('.auto-width');
    assert.equal(autoWidthElements?.length, 1);
  });

  it('should render 3 elements with class "auto-width when property-ids is ["BISTRO", "WIFI", "BICYCLE"]"', async () => {
    element.setAttribute('property-ids', '["BISTRO", "WIFI", "BICYCLE"]');
    await waitForLitRender(element);
    const autoWidthElements = element.shadowRoot?.querySelectorAll('.auto-width');
    assert.equal(autoWidthElements?.length, 3);
  });

  it('should render the service label description in the sbb-screen-reader-only element', async () => {
    element.setAttribute('property-ids', '["BISTRO"]');
    await waitForLitRender(element);
    const screenReaderOnlyElement = element.shadowRoot?.querySelector('sbb-screen-reader-only');
    expect(screenReaderOnlyElement?.innerHTML).to.include('Bistro');
  });
});
