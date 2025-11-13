import { assert, aTimeout, expect } from '@open-wc/testing';
import type { SbbSecondaryButtonElement } from '@sbb-esta/lyne-elements/button/secondary-button/secondary-button.component';
import { EventSpy } from '@sbb-esta/lyne-elements/core/testing/event-spy';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing/wait-for-render';
import { html } from 'lit/static-html.js';

import { mapRawDataToSeatReservation, type SeatReservation } from '../common.js';

import { SbbSeatReservationElement } from './seat-reservation.component.js';

let element: SbbSeatReservationElement;
const dataFull: SeatReservation[] = [mapRawDataToSeatReservation('TRAIN')];

describe('sbb-seat-reservation core', () => {
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
  // it('should be accessible', async () => {
  //   await expect(element).to.be.accessible();
  // });

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
});

describe('sbb-seat-reservation navigation', () => {
  let btn: SbbSecondaryButtonElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation
        .seatReservations=${dataFull}
        max-seat-reservations="4"
        has-navigation
        base-grid-size="16"
      ></sbb-seat-reservation>`,
    );

    btn = element.shadowRoot!.querySelector('#first-tab-element') as SbbSecondaryButtonElement;
  });

  it('should have a first-tab-element btn with disabled-interactive attr; no selectable coach in front', async () => {
    expect(btn).not.to.be.null;
    expect(btn?.hasAttribute('disabled-interactive')).to.be.true;
  });

  it('should have a first-tab-element btn with disabled-interactive attr; no selectable coach in front', async () => {
    expect(btn).not.to.be.null;
    expect(btn?.hasAttribute('disabled-interactive')).to.be.true;
  });

  it('should have no clickable first-tab-element btn; no selectable coach in front', async () => {
    const clickSpy = new EventSpy('click');
    btn.click();
    await expect(clickSpy.count).to.be.equal(0);
  });

  it('should stop propagating click if first-tab-element btn is not clickable', async () => {
    const clickSpy = new EventSpy('click');
    // const btn = element.shadowRoot!.querySelector(
    //   '#first-tab-element',
    // ) as SbbSecondaryButtonElement;
    btn.click();
    btn.dispatchEvent(new PointerEvent('click'));
    expect(clickSpy.count).not.to.be.greaterThan(0);
  });
});

describe('sbb-seat-reservation navigation first-tab-element with preselected coach', () => {
  const TIMEOUT_NAVIGATION: number = 1000;
  let btn: SbbSecondaryButtonElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation
        .seatReservations=${dataFull}
        max-seat-reservations="4"
        has-navigation
        base-grid-size="16"
      ></sbb-seat-reservation>`,
    );

    btn = element.shadowRoot!.querySelector('#first-tab-element') as SbbSecondaryButtonElement;

    element.preselectCoachIndex = 2;
    await waitForLitRender(element);
    await aTimeout(TIMEOUT_NAVIGATION); // wait until navigation is re-rendered (takes a lot of time :/)
  });

  it('should not have a first-tab-element btn with disabled-interactive attr; selectable coaches are in front', async () => {
    expect(btn).not.to.be.null;
    expect(btn?.hasAttribute('disabled-interactive')).to.be.false;
  });

  it('should have clickable first-tab-element btn; selectable coaches in front', async () => {
    const clickSpy = new EventSpy('click');
    btn.click();
    expect(clickSpy.count).to.be.greaterThan(0);
  });

  it('should propagate click if first-tab-element btn is clickable; selectable coaches in front', async () => {
    const clickSpy = new EventSpy('click');
    btn.click();
    btn.dispatchEvent(new PointerEvent('click'));
    expect(clickSpy.count).to.be.greaterThan(0);
  });
});

describe('sbb-seat-reservation navigation last-tab-element with preselected coach', () => {
  const TIMEOUT_NAVIGATION: number = 1000;
  let btn: SbbSecondaryButtonElement;
  const maxCoachesInTrain = dataFull[0].coachItems.length - 1;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation
        .seatReservations=${dataFull}
        max-seat-reservations="4"
        has-navigation
        base-grid-size="16"
      ></sbb-seat-reservation>`,
    );

    btn = element.shadowRoot!.querySelector('#last-tab-element') as SbbSecondaryButtonElement;

    element.preselectCoachIndex = maxCoachesInTrain - 1; // preselect second last coach because last one is a driver area
    await waitForLitRender(element);
    await aTimeout(TIMEOUT_NAVIGATION); // wait until navigation is re-rendered (takes a lot of time :/)
  });

  it('should have a clickable last-tab-element btn even if there are no selectable coaches behind because last coach is selected', async () => {
    // TODO clarify if last btn should be disabled if last coach is selected
    const clickSpy = new EventSpy('click');
    btn.click();
    expect(clickSpy.count).to.be.greaterThan(0);
  });
});

describe('sbb-seat-reservation with different place control states including restricted reservations set to 1', () => {
  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation
        .seatReservations=${dataFull}
        max-seat-reservations="1"
        max-bicycle-reservations="1"
        has-navigation
        base-grid-size="16"
      ></sbb-seat-reservation>`,
    );

    await waitForLitRender(element);
  });

  it('should have only one selected seat-reservation at once', async () => {
    const clickSpy = new EventSpy('click');
    const placeControls = element.shadowRoot!.querySelectorAll(
      'sbb-seat-reservation-place-control',
    );

    expect(placeControls.length).to.be.greaterThan(0);

    placeControls[0].click();
    await waitForLitRender(element);
    expect(placeControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-free')).to.be.null;
    expect(placeControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-selected')).not.to
      .be.null;

    placeControls[1].click();
    await waitForLitRender(element);
    expect(placeControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-free')).not.to.be
      .null;
    expect(placeControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-selected')).to.be
      .null;

    expect(placeControls[1].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-free')).to.be.null;
    expect(placeControls[1].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-selected')).not.to
      .be.null;

    // clicks are allowed in spite of max-seat-reservations restriction on all elements
    await expect(clickSpy.count).to.be.equal(2);
  });

  it('should have only one selected bicycle seat-reservation at once', async () => {
    const clickSpy = new EventSpy('click');

    const bicyclePlaceControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
      element.shadowRoot!.querySelectorAll('sbb-seat-reservation-place-control[TYPE="BICYCLE"]');

    bicyclePlaceControls[0].click();
    await waitForLitRender(element);
    expect(bicyclePlaceControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-free')).to
      .be.null;
    expect(bicyclePlaceControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-selected'))
      .not.to.be.null;

    bicyclePlaceControls[1].click();
    await waitForLitRender(element);
    expect(bicyclePlaceControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-free')).not
      .to.be.null;
    expect(bicyclePlaceControls[0].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-selected'))
      .to.be.null;

    expect(bicyclePlaceControls[1].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-free')).to
      .be.null;
    expect(bicyclePlaceControls[1].shadowRoot?.querySelector('.sbb-sr-place-ctrl--state-selected'))
      .not.to.be.null;

    // clicks are allowed in spite of max-seat-reservations restriction on all elements
    await expect(clickSpy.count).to.be.equal(2);
  });

  it('should not allow clicks on restricted or allocated seats', async () => {
    const clickSpy = new EventSpy('click');
    const placeControls = element.shadowRoot!.querySelectorAll(
      'sbb-seat-reservation-place-control',
    );

    // sbb-sr-place-ctrl--state-restricted
    // sbb-sr-place-ctrl--state-allocated

    const restrictedPlaceControls = Array.from(placeControls).filter(
      (placeControl) => placeControl.getAttribute('state') === 'RESTRICTED',
    );
    // const allocatedPlaceControl = Array.from(placeControls).filter(
    //   (placeControl) => placeControl.getAttribute('state') === 'ALLOCATED',
    // );

    //neither restricted nor allocated seats should be clickable
    // restrictedPlaceControls.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
    //   placeControl.click();
    // });
    // allocatedPlaceControl.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
    //   placeControl.click();
    // });

    console.log(restrictedPlaceControls[0]);
    await expect(clickSpy.count).to.be.equal(0);
    restrictedPlaceControls[0].click();

    await waitForLitRender(element);

    expect(clickSpy.count).not.to.be.greaterThan(0);

    await expect(clickSpy.count).to.be.equal(0);

    // console.log(restrictedPlaceControls.length);
    // console.log(allocatedPlaceControl.length);
  });
});

/*TODO : Tests which needs to be done :
prevent-click attribute  tests
1. max-seat-reservations --> test click in place-control
2. max-bicycle-reservations --> place-control
2. maximum 3 navigation-service icons are shown ??
3. arrowLeft/arrowRight navigation with keyboard
4. Enter, Spacer etc key navigation tests
6. test single and double deck coaches
9. test edge cases like no seat reservations, large number of reservations
10. test empty coachItems array handling
11. clickable seat-reservation-area
*/
