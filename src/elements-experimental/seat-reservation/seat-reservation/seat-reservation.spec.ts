import { assert, aTimeout, expect } from '@open-wc/testing';
import type { SbbSecondaryButtonElement } from '@sbb-esta/lyne-elements/button/secondary-button/secondary-button.component';
import { EventSpy } from '@sbb-esta/lyne-elements/core/testing/event-spy';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing/wait-for-render';
import { html } from 'lit/static-html.js';

import { mapRawDataToSeatReservation } from '../common.js';

import { SbbSeatReservationElement } from './seat-reservation.component.js';

describe('sbb-seat-reservation', () => {
  let element: SbbSeatReservationElement;
  const dataFull = [mapRawDataToSeatReservation('TRAIN')];

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation
        .seatReservations=${dataFull}
        max-seat-reservations="4"
        has-navigation
        align-vertical
        base-grid-size="16"
      ></sbb-seat-reservation>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationElement);
  });

  // TODO FIX ME: Accessibility test is failing
  it('should be accessible', async () => {
    await expect(element).to.be.accessible();
  });

  it('should correctly set seatReservations from dataFull', async () => {
    assert.deepEqual(element.seatReservations, dataFull);
  });

  it('should have TRAIN as vehicleType in seatReservations', async () => {
    assert.equal(element.seatReservations[0].vehicleType, 'TRAIN');
  });

  it('should not have BUS as vehicleType in seatReservations', async () => {
    await expect(element.seatReservations[0].vehicleType).to.not.equal('BUS');
  });

  it('should have coachItems array in seatReservations', async () => {
    assert.isArray(element.seatReservations[0].coachItems);
    assert.isAbove(element.seatReservations[0].coachItems.length, 0);
  });

  it('should render the navigation-wrapper because hasNavigation is true', async () => {
    const navigationWrapper = element.shadowRoot!.querySelector(
      '.sbb-sr-navigation-wrapper',
    ) as HTMLDivElement;

    expect(navigationWrapper).not.to.be.null;
  });

  it('should not render the navigation-wrapper because hasNavigation is false', async () => {
    element.hasNavigation = false;
    await waitForLitRender(element);

    const navigationWrapper = element.shadowRoot!.querySelector(
      '.sbb-sr-navigation-wrapper',
    ) as HTMLDivElement;

    expect(navigationWrapper).to.be.null;
  });

  it('should have vertical alignment because alignVertical is true', async () => {
    element.alignVertical = true;
    await waitForLitRender(element);
    expect(element.hasAttribute('align-vertical')).to.be.true;
  });

  it('should have no vertical alignment because alignVertical is false', async () => {
    element.alignVertical = false;
    await waitForLitRender(element);
    expect(element.hasAttribute('align-vertical')).to.be.false;
  });

  it('should have a first-tab-element btn with disabled-interactive attr; no selectable coach in front', async () => {
    const btn = element.shadowRoot!.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;
    expect(btn).not.to.be.null;
    expect(btn?.hasAttribute('disabled-interactive')).to.be.true;
  });

  it('should not have a first-tab-element btn with disabled-interactive attr; selectable coaches are in front', async () => {
    element.preselectCoachIndex = 2;
    await waitForLitRender(element);
    await aTimeout(1200); // wait until navigation is re-rendered (takes a lot of time :/)
    const btn = element.shadowRoot!.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;
    expect(btn).not.to.be.null;
    expect(btn?.hasAttribute('disabled-interactive')).to.be.false;
  });

  it('should have a first-tab-element btn with disabled-interactive attr; no selectable coach in front', async () => {
    const btn = element.shadowRoot!.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;
    expect(btn).not.to.be.null;
    expect(btn?.hasAttribute('disabled-interactive')).to.be.true;
  });

  it('should have no clickable first-tab-element btn; no selectable coach in front', async () => {
    const clickSpy = new EventSpy('click');
    const btn = element.shadowRoot!.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;
    btn.click();
    await expect(clickSpy.count).to.be.equal(0);
  });

  it('should stop propagating click if first-tab-element btn is not clickable', async () => {
    const clickSpy = new EventSpy('click');
    const btn = element.shadowRoot!.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;
    btn.click();
    btn.dispatchEvent(new PointerEvent('click'));
    expect(clickSpy.count).not.to.be.greaterThan(0);
  });

  it('should have clickable first-tab-element btn; selectable coaches in front', async () => {
    element.preselectCoachIndex = 2;
    await waitForLitRender(element);
    await aTimeout(1200); // wait until navigation is re-rendered (takes a lot of time :/)

    const clickSpy = new EventSpy('click');
    const btn = element.shadowRoot!.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;
    btn.click();
    expect(clickSpy.count).to.be.greaterThan(0);
  });

  it('should propagating click if first-tab-element btn is clickable; selectable coaches in front', async () => {
    element.preselectCoachIndex = 2;
    await waitForLitRender(element);
    await aTimeout(1200); // wait until navigation is re-rendered (takes a lot of time :/)
    const clickSpy = new EventSpy('click');
    const btn = element.shadowRoot!.querySelector(
      '#first-tab-element',
    ) as SbbSecondaryButtonElement;
    btn.click();
    btn.dispatchEvent(new PointerEvent('click'));
    expect(clickSpy.count).to.be.greaterThan(0);
  });

  /*TODO : Tests which needs to be done :
  1. test click possibilites on first-tab-element and last-tab-element buttons
  1. max-seat-reservations --> test click in place-control
  2. max-bicycle-reservations --> place-control
  1. left and right navigation button click tests AND disable-navigation 
  2. maximum 3 navigation-service icons are shown ??
  3. arrowLeft/arrowRight navigation with keyboard
  4. Enter, Spacer etc key navigation tests
  5. test different vehicle types (TRAIN, BUS, TRAM)
  6. test single and double deck coaches
  9. test edge cases like no seat reservations, large number of reservations
  10. test empty coachItems array handling
  11. clickable seat-reservation-area
  */
});
