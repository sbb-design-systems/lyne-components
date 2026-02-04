import { assert, aTimeout, expect } from '@open-wc/testing';
import type { SbbSecondaryButtonElement } from '@sbb-esta/lyne-elements/button/secondary-button/secondary-button.component.js';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover/popover.component.js';
import { html } from 'lit/static-html.js';

import { mapRawDataToSeatReservation, type SeatReservation } from '../common.ts';
import type { SbbSeatReservationAreaElement } from '../seat-reservation-area/seat-reservation-area.component.ts';
import type { SbbSeatReservationPlaceControlElement } from '../seat-reservation-place-control/seat-reservation-place-control.component.ts';

import { SbbSeatReservationElement } from './seat-reservation.component.ts';

let element: SbbSeatReservationElement;
const dataFull: SeatReservation[] = [mapRawDataToSeatReservation('TRAIN')];

describe(`sbb-seat-reservation`, () => {
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
    await waitForLitRender(element);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationElement);
  });

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
    const navigationWrapper = element.shadowRoot!.querySelector<HTMLDivElement>(
      '.sbb-sr-navigation-wrapper',
    );

    expect(navigationWrapper).not.to.be.null;
  });

  it('should not render the navigation-wrapper because hasNavigation is false', async () => {
    element.hasNavigation = false;
    await waitForLitRender(element);

    const navigationWrapper = element.shadowRoot!.querySelector<HTMLDivElement>(
      '.sbb-sr-navigation-wrapper',
    );

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

  it('should have hoverable seat areas which opens a popover element', async () => {
    const areaElement: SbbSeatReservationAreaElement | null =
      element.shadowRoot!.querySelector<SbbSeatReservationAreaElement>('sbb-seat-reservation-area');

    const popover = element.shadowRoot!.querySelector<SbbPopoverElement>(
      'sbb-popover[trigger="' + areaElement?.id + '"]',
    );

    // assert that popover is found corresponding to the area element
    assert.instanceOf(popover, SbbPopoverElement);
    expect(popover).to.have.attribute('data-state', 'closed');

    const openSpy = new EventSpy(SbbPopoverElement.events.open, popover);
    popover?.open();

    await expect(openSpy.count).to.be.equal(1);
    expect(popover).to.have.attribute('data-state', 'opened');
  });
});

/**
 * Helper function to get the number of service icons in a coach.
 * @param coach
 */
const getServiceIconCount = (coach: HTMLElement): number => {
  return (
    coach.shadowRoot
      ?.querySelector('sbb-seat-reservation-navigation-services')
      ?.shadowRoot?.querySelectorAll('sbb-seat-reservation-graphic').length ?? 0
  );
};

describe(`sbb-seat-reservation`, () => {
  let btnRight: SbbSecondaryButtonElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation
        .seatReservations=${dataFull}
        max-seat-reservations="4"
        has-navigation
        base-grid-size="16"
      ></sbb-seat-reservation>`,
    );

    btnRight = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
      '#sbb-sr-navigation__wrapper-button-direction--right',
    ) as SbbSecondaryButtonElement;
  });

  it('should have a first-tab-element btnRight with disabled-interactive attr; no selectable coach in front', async () => {
    expect(btnRight).not.to.be.null;
    console.log('btnRight', btnRight);
    console.log('btnRight attributes', btnRight?.getAttribute('icon-name'));
    expect(btnRight?.hasAttribute('disabled-interactive')).to.be.true;
  });

  it('should have no clickable first-tab-element btnRight; no selectable coach in front', async () => {
    const clickSpy = new EventSpy('click');
    btnRight.click();
    await expect(clickSpy.count).to.be.equal(0);
  });

  it('should stop propagating click if first-tab-element btnRight is not clickable', async () => {
    const clickSpy = new EventSpy('click');
    btnRight.click();
    btnRight.dispatchEvent(new PointerEvent('click'));
    expect(clickSpy.count).not.to.be.greaterThan(0);
  });

  it('should not have more than 3 navigation service icons even if the backend delivered more', async () => {
    const navCoaches = element.shadowRoot?.querySelectorAll<HTMLElement>(
      'sbb-seat-reservation-navigation-coach',
    );

    navCoaches?.forEach((coach) => {
      expect(getServiceIconCount(coach)).to.be.at.most(3);
    });
  });

  describe('sbb-seat-reservation navigation first-tab-element with preselected coach', () => {
    const TIMEOUT_NAVIGATION: number = 1000;
    let btnLeft: SbbSecondaryButtonElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation
          .seatReservations=${dataFull}
          max-seat-reservations="4"
          has-navigation
          base-grid-size="16"
        ></sbb-seat-reservation>`,
      );

      btnLeft = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
        '#sbb-sr-navigation__wrapper-button-direction--left',
      ) as SbbSecondaryButtonElement;

      element.preselectCoachIndex = 2;
      await waitForLitRender(element);
      await aTimeout(TIMEOUT_NAVIGATION); // wait until navigation is re-rendered (takes a lot of time :/)
    });

    it('should not have a first-tab-element btnLeft with disabled-interactive attr; selectable coaches are in front', async () => {
      expect(btnLeft).not.to.be.null;
      expect(btnLeft?.hasAttribute('disabled-interactive')).to.be.false;
    });

    it('should have clickable first-tab-element btnLeft; selectable coaches in front', async () => {
      const clickSpy = new EventSpy('click');
      btnLeft.click();
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should propagate click if first-tab-element btnLeft is clickable; selectable coaches in front', async () => {
      const clickSpy = new EventSpy('click');
      btnLeft.click();
      btnLeft.dispatchEvent(new PointerEvent('click'));
      await aTimeout(0); // wait for event propagation
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

      btn = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
        '#sbb-sr-navigation__wrapper-button-direction--right',
      ) as SbbSecondaryButtonElement;

      element.preselectCoachIndex = maxCoachesInTrain - 1; // preselect second last coach because last one is a driver area
      await waitForLitRender(element);
      await aTimeout(TIMEOUT_NAVIGATION); // wait until navigation is re-rendered (takes a lot of time :/)
    });

    it('should have a clickable last-tab-element btnRight even if there are no selectable coaches behind because last coach is selected', async () => {
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
      const placeControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control',
        );

      expect(placeControls.length).to.be.greaterThan(0);

      placeControls[0].click();
      await waitForLitRender(element);
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      placeControls[1].click();
      await waitForLitRender(element);
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).not.to.be.null;
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).to.be.null;

      expect(
        placeControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        placeControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      // clicks are allowed in spite of max-seat-reservations restriction on all elements
      await expect(clickSpy.count).to.be.equal(2);
    });

    it('should have only one selected bicycle seat-reservation at once', async () => {
      const clickSpy = new EventSpy('click');

      const bicyclePlaceControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control[TYPE="BICYCLE"]',
        );

      bicyclePlaceControls[0].click();
      await waitForLitRender(element);
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      bicyclePlaceControls[1].click();
      await waitForLitRender(element);
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).not.to.be.null;
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).to.be.null;

      expect(
        bicyclePlaceControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        bicyclePlaceControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      // clicks are allowed in spite of max-seat-reservations restriction on all elements
      await expect(clickSpy.count).to.be.equal(2);
    });

    it('should not allow selectplace on restricted or allocated seats', async () => {
      const selectPlaceEvent = new EventSpy(
        (window as any).SbbSeatReservationPlaceControlElement.events.selectplace,
        null,
        {
          capture: true,
        },
      );

      const placeControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control',
        );

      const restrictedPlaceControls: SbbSeatReservationPlaceControlElement[] = Array.from(
        placeControls,
      ).filter(
        (placeControl: SbbSeatReservationPlaceControlElement) =>
          placeControl.shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
            '.sbb-sr-place-ctrl--state-restricted',
          ) !== null,
      );

      const allocatedPlaceControl: SbbSeatReservationPlaceControlElement[] = Array.from(
        placeControls,
      ).filter(
        (placeControl: SbbSeatReservationPlaceControlElement) =>
          placeControl.shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
            '.sbb-sr-place-ctrl--state-allocated',
          ) !== null,
      );

      //neither restricted nor allocated seats should forward the click to the selectplace event
      restrictedPlaceControls.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
        placeControl.click();
      });
      allocatedPlaceControl.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
        placeControl.click();
      });

      await expect(selectPlaceEvent.count).to.be.equal(0);
    });
  });

  describe('sbb-seat-reservation blocks every click action with prevent-place-click', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation
          .seatReservations=${dataFull}
          max-seat-reservations="20"
          max-bicycle-reservations="20"
          has-navigation
          prevent-place-click
          base-grid-size="16"
        ></sbb-seat-reservation>`,
      );

      await waitForLitRender(element);
    });

    it('should not allow selectplace on any seat', async () => {
      const selectPlaceEvent = new EventSpy(
        (window as any).SbbSeatReservationPlaceControlElement.events.selectplace,
        null,
        {
          capture: true,
        },
      );

      const allPlaces: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control',
        );

      //no seat should forward the click to the selectplace event
      allPlaces.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
        placeControl.click();
      });

      await expect(selectPlaceEvent.count).to.be.equal(0);
    });
  });

  describe('sbb-seat-reservation data errors', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-seat-reservation></sbb-seat-reservation>`);
    });

    it('should work without throwing errors if no data is available', async () => {
      const itemCoachContainer =
        element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-sr__item-coach');

      assert.instanceOf(element, SbbSeatReservationElement);
      expect(itemCoachContainer).to.be.null;
      expect(() => element.focus()).to.not.throw();
    });
  });
});
